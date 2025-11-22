package com.zomato.service;

import com.zomato.dto.MenuCategoryRequest;
import com.zomato.dto.MenuItemRequest;
import com.zomato.dto.RestaurantRequest;
import com.zomato.entity.MenuCategory;
import com.zomato.entity.MenuItem;
import com.zomato.entity.Restaurant;
import com.zomato.entity.User;
import com.zomato.repository.MenuCategoryRepository;
import com.zomato.repository.MenuItemRepository;
import com.zomato.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuCategoryRepository menuCategoryRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private UserService userService;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findByIsActiveTrue();
    }

    public List<Restaurant> getVerifiedRestaurants() {
        return restaurantRepository.findByIsVerifiedTrueAndIsActiveTrue();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public List<Restaurant> searchRestaurants(String searchTerm) {
        return restaurantRepository.searchRestaurants(searchTerm);
    }

    public Restaurant createRestaurant(RestaurantRequest request) {
        User currentUser = userService.getCurrentUser();

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhoneNumber(request.getPhoneNumber());
        restaurant.setEmail(request.getEmail());
        restaurant.setImageUrl(request.getImageUrl());
        restaurant.setCoverImageUrl(request.getCoverImageUrl());
        restaurant.setCuisineType(request.getCuisineType());
        restaurant.setDeliveryTimeMinutes(request.getDeliveryTimeMinutes());
        restaurant.setMinimumOrderAmount(request.getMinimumOrderAmount());
        restaurant.setDeliveryFee(request.getDeliveryFee());
        restaurant.setCostForTwo(request.getCostForTwo());
        restaurant.setIsPureVegetarian(request.getIsPureVegetarian());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setLatitude(request.getLatitude());
        restaurant.setLongitude(request.getLongitude());
        restaurant.setHasParking(request.getHasParking());
        restaurant.setHasWifi(request.getHasWifi());
        restaurant.setHasAc(request.getHasAc());
        restaurant.setIsEcoFriendly(request.getIsEcoFriendly());
        restaurant.setOwnerId(currentUser.getId());

        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!restaurant.getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to update this restaurant");
        }

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhoneNumber(request.getPhoneNumber());
        restaurant.setEmail(request.getEmail());
        restaurant.setImageUrl(request.getImageUrl());
        restaurant.setCoverImageUrl(request.getCoverImageUrl());
        restaurant.setCuisineType(request.getCuisineType());
        restaurant.setDeliveryTimeMinutes(request.getDeliveryTimeMinutes());
        restaurant.setMinimumOrderAmount(request.getMinimumOrderAmount());
        restaurant.setDeliveryFee(request.getDeliveryFee());
        restaurant.setCostForTwo(request.getCostForTwo());
        restaurant.setIsPureVegetarian(request.getIsPureVegetarian());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setLatitude(request.getLatitude());
        restaurant.setLongitude(request.getLongitude());
        restaurant.setHasParking(request.getHasParking());
        restaurant.setHasWifi(request.getHasWifi());
        restaurant.setHasAc(request.getHasAc());
        restaurant.setIsEcoFriendly(request.getIsEcoFriendly());

        return restaurantRepository.save(restaurant);
    }

    // Menu Category operations
    public List<MenuCategory> getRestaurantCategories(Long restaurantId) {
        return menuCategoryRepository.findByRestaurantIdOrderByDisplayOrder(restaurantId);
    }

    public MenuCategory createCategory(Long restaurantId, MenuCategoryRequest request) {
        Restaurant restaurant = getRestaurantById(restaurantId);

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!restaurant.getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        MenuCategory category = new MenuCategory();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setDisplayOrder(request.getDisplayOrder());
        category.setRestaurant(restaurant);

        return menuCategoryRepository.save(category);
    }

    public MenuCategory updateCategory(Long categoryId, MenuCategoryRequest request) {
        MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!category.getRestaurant().getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setDisplayOrder(request.getDisplayOrder());

        return menuCategoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        MenuCategory category = menuCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!category.getRestaurant().getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        menuCategoryRepository.delete(category);
    }

    // Menu Item operations
    public List<MenuItem> getRestaurantMenuItems(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndIsAvailableTrue(restaurantId);
    }

    public MenuItem createMenuItem(Long restaurantId, MenuItemRequest request) {
        Restaurant restaurant = getRestaurantById(restaurantId);

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!restaurant.getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setIsVegetarian(request.getIsVegetarian());
        menuItem.setIsAvailable(request.getIsAvailable());
        menuItem.setIsFeatured(request.getIsFeatured());
        menuItem.setPreparationTimeMinutes(request.getPreparationTimeMinutes());
        menuItem.setCalories(request.getCalories());
        menuItem.setSpicyLevel(request.getSpicyLevel());
        menuItem.setRestaurant(restaurant);

        if (request.getCategoryId() != null) {
            MenuCategory category = menuCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            menuItem.setCategory(category);
        }

        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long itemId, MenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!menuItem.getRestaurant().getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setIsVegetarian(request.getIsVegetarian());
        menuItem.setIsAvailable(request.getIsAvailable());
        menuItem.setIsFeatured(request.getIsFeatured());
        menuItem.setPreparationTimeMinutes(request.getPreparationTimeMinutes());
        menuItem.setCalories(request.getCalories());
        menuItem.setSpicyLevel(request.getSpicyLevel());

        if (request.getCategoryId() != null) {
            MenuCategory category = menuCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            menuItem.setCategory(category);
        }

        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItem(Long itemId) {
        MenuItem menuItem = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        // Check if current user owns this restaurant
        User currentUser = userService.getCurrentUser();
        if (!menuItem.getRestaurant().getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to manage this restaurant");
        }

        menuItemRepository.delete(menuItem);
    }
}
