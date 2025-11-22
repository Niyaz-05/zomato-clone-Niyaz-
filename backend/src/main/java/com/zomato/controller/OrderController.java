package com.zomato.controller;

import com.zomato.dto.PlaceOrderRequest;
import com.zomato.entity.Order;
import com.zomato.entity.OrderStatus;
import com.zomato.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        Order order = orderService.placeOrder(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Order>> getUserOrders() {
        List<Order> orders = orderService.getUserOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('RESTAURANT') or hasRole('DELIVERY_PARTNER')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/restaurant/{restaurantId}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getRestaurantOrders(@PathVariable Long restaurantId) {
        List<Order> orders = orderService.getRestaurantOrders(restaurantId);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{orderId}/accept")
    @PreAuthorize("hasRole('RESTAURANT')")
    public ResponseEntity<Order> acceptOrder(@PathVariable Long orderId) {
        Order order = orderService.acceptOrder(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/reject")
    @PreAuthorize("hasRole('RESTAURANT')")
    public ResponseEntity<Order> rejectOrder(@PathVariable Long orderId, @RequestParam String reason) {
        Order order = orderService.rejectOrder(orderId, reason);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/preparing")
    @PreAuthorize("hasRole('RESTAURANT')")
    public ResponseEntity<Order> markPreparing(@PathVariable Long orderId) {
        Order order = orderService.markPreparing(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/ready")
    @PreAuthorize("hasRole('RESTAURANT')")
    public ResponseEntity<Order> markReadyForPickup(@PathVariable Long orderId) {
        Order order = orderService.markReadyForPickup(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('DELIVERY_PARTNER')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                 @RequestParam OrderStatus status,
                                                 @RequestParam(required = false) String notes) {
        Order order = orderService.updateOrderStatus(orderId, status, notes);
        return ResponseEntity.ok(order);
    }
}
