package com.zomato.controller;

import com.zomato.dto.MenuCategoryRequest;
import com.zomato.dto.MenuItemRequest;
import com.zomato.dto.RestaurantRequest;
import com.zomato.entity.MenuCategory;
import com.zomato.entity.MenuItem;
import com.zomato.entity.Restaurant;
import com.zomato.service.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/public/all")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/public/verified")
    public ResponseEntity<List<Restaurant>> getVerifiedRestaurants() {
        List<Restaurant> restaurants = restaurantService.getVerifiedRestaurants();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(restaurant);
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String q) {
        List<Restaurant> restaurants = restaurantService.searchRestaurants(q);
        return ResponseEntity.ok(restaurants);
    }

    @PostMapping
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody RestaurantRequest request) {
        Restaurant restaurant = restaurantService.createRestaurant(request);
        return ResponseEntity.ok(restaurant);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @Valid @RequestBody RestaurantRequest request) {
        Restaurant restaurant = restaurantService.updateRestaurant(id, request);
        return ResponseEntity.ok(restaurant);
    }

    // Menu Category endpoints
    @GetMapping("/{restaurantId}/categories")
    public ResponseEntity<List<MenuCategory>> getRestaurantCategories(@PathVariable Long restaurantId) {
        List<MenuCategory> categories = restaurantService.getRestaurantCategories(restaurantId);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/{restaurantId}/categories")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<MenuCategory> createCategory(@PathVariable Long restaurantId, @Valid @RequestBody MenuCategoryRequest request) {
        MenuCategory category = restaurantService.createCategory(restaurantId, request);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/categories/{categoryId}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<MenuCategory> updateCategory(@PathVariable Long categoryId, @Valid @RequestBody MenuCategoryRequest request) {
        MenuCategory category = restaurantService.updateCategory(categoryId, request);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/categories/{categoryId}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        restaurantService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category deleted successfully");
    }

    // Menu Item endpoints
    @GetMapping("/{restaurantId}/menu")
    public ResponseEntity<List<MenuItem>> getRestaurantMenu(@PathVariable Long restaurantId) {
        List<MenuItem> menuItems = restaurantService.getRestaurantMenuItems(restaurantId);
        return ResponseEntity.ok(menuItems);
    }

    @PostMapping("/{restaurantId}/menu")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<MenuItem> createMenuItem(@PathVariable Long restaurantId, @Valid @RequestBody MenuItemRequest request) {
        MenuItem menuItem = restaurantService.createMenuItem(restaurantId, request);
        return ResponseEntity.ok(menuItem);
    }

    @PutMapping("/menu/{itemId}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long itemId, @Valid @RequestBody MenuItemRequest request) {
        MenuItem menuItem = restaurantService.updateMenuItem(itemId, request);
        return ResponseEntity.ok(menuItem);
    }

    @DeleteMapping("/menu/{itemId}")
    @PreAuthorize("hasRole('RESTAURANT') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long itemId) {
        restaurantService.deleteMenuItem(itemId);
        return ResponseEntity.ok("Menu item deleted successfully");
    }
}
