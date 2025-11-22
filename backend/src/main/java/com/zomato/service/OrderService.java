package com.zomato.service;

import com.zomato.dto.OrderItemRequest;
import com.zomato.dto.PlaceOrderRequest;
import com.zomato.entity.*;
import com.zomato.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserService userService;

    public Order placeOrder(PlaceOrderRequest request) {
        User user = userService.getCurrentUser();

        // Get restaurant
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Get delivery address
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Validate menu items and calculate total
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            if (!menuItem.getIsAvailable()) {
                throw new RuntimeException("Menu item " + menuItem.getName() + " is not available");
            }

            totalPrice = totalPrice.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        // Check minimum order amount
        if (totalPrice.compareTo(restaurant.getMinimumOrderAmount()) < 0) {
            throw new RuntimeException("Order amount is below minimum order requirement");
        }

        // Create order
        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setDeliveryAddress(address);
        order.setTotalPrice(totalPrice);
        order.setDeliveryFee(restaurant.getDeliveryFee());
        order.setTaxAmount(totalPrice.multiply(BigDecimal.valueOf(0.18))); // 18% GST
        order.setDiscountAmount(BigDecimal.ZERO);
        order.setFinalAmount(totalPrice.add(restaurant.getDeliveryFee()).add(order.getTaxAmount()));
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()));
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setSpecialInstructions(request.getSpecialInstructions());
        order.setEstimatedDeliveryTime(LocalDateTime.now().plusMinutes(restaurant.getDeliveryTimeMinutes()));

        order = orderRepository.save(order);

        // Create order items
        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId()).get();

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            orderItem.setTotalPrice(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
            orderItem.setSpecialInstructions(itemRequest.getSpecialInstructions());

            orderItemRepository.save(orderItem);
        }

        // Create initial status history
        OrderStatusHistory statusHistory = new OrderStatusHistory();
        statusHistory.setOrder(order);
        statusHistory.setStatus(OrderStatus.PENDING);
        statusHistory.setChangedBy("SYSTEM");
        statusHistory.setNotes("Order placed successfully");

        return order;
    }

    public List<Order> getUserOrders() {
        User user = userService.getCurrentUser();
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Order getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check if user owns this order or is restaurant owner or delivery partner
        User user = userService.getCurrentUser();
        if (!order.getUser().getId().equals(user.getId()) &&
            !order.getRestaurant().getOwnerId().equals(user.getId()) &&
            (order.getDeliveryPartner() == null || !order.getDeliveryPartner().getId().equals(user.getId()))) {
            throw new RuntimeException("Unauthorized to access this order");
        }

        return order;
    }

    public Order updateOrderStatus(Long orderId, OrderStatus newStatus, String notes) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check if user is restaurant owner
        User user = userService.getCurrentUser();
        if (!order.getRestaurant().getOwnerId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update order status");
        }

        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        // Create status history
        OrderStatusHistory statusHistory = new OrderStatusHistory();
        statusHistory.setOrder(order);
        statusHistory.setStatus(newStatus);
        statusHistory.setChangedBy("RESTAURANT");
        statusHistory.setNotes(notes);

        return order;
    }

    public List<Order> getRestaurantOrders(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Check if user owns this restaurant
        User user = userService.getCurrentUser();
        if (!restaurant.getOwnerId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to access restaurant orders");
        }

        return orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }

    public Order acceptOrder(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.CONFIRMED, "Order accepted by restaurant");
    }

    public Order rejectOrder(Long orderId, String reason) {
        return updateOrderStatus(orderId, OrderStatus.CANCELLED, "Order rejected: " + reason);
    }

    public Order markPreparing(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.PREPARING, "Order is being prepared");
    }

    public Order markReadyForPickup(Long orderId) {
        return updateOrderStatus(orderId, OrderStatus.READY_FOR_PICKUP, "Order ready for pickup");
    }
}
