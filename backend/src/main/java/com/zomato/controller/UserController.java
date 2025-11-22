package com.zomato.controller;

import com.zomato.dto.AddressRequest;
import com.zomato.dto.UserProfileUpdateRequest;
import com.zomato.entity.Address;
import com.zomato.entity.User;
import com.zomato.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('RESTAURANT') or hasRole('DELIVERY_PARTNER') or hasRole('ADMIN')")
    public ResponseEntity<User> getCurrentUserProfile() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('RESTAURANT') or hasRole('DELIVERY_PARTNER') or hasRole('ADMIN')")
    public ResponseEntity<User> updateProfile(@Valid @RequestBody UserProfileUpdateRequest request) {
        User user = userService.updateProfile(request);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/addresses")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Address>> getUserAddresses() {
        List<Address> addresses = userService.getUserAddresses();
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/addresses")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Address> addAddress(@Valid @RequestBody AddressRequest request) {
        Address address = userService.addAddress(request);
        return ResponseEntity.ok(address);
    }

    @PutMapping("/addresses/{addressId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Address> updateAddress(@PathVariable Long addressId, @Valid @RequestBody AddressRequest request) {
        Address address = userService.updateAddress(addressId, request);
        return ResponseEntity.ok(address);
    }

    @DeleteMapping("/addresses/{addressId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteAddress(@PathVariable Long addressId) {
        userService.deleteAddress(addressId);
        return ResponseEntity.ok("Address deleted successfully");
    }

    @PutMapping("/addresses/{addressId}/set-default")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Address> setDefaultAddress(@PathVariable Long addressId) {
        Address address = userService.setDefaultAddress(addressId);
        return ResponseEntity.ok(address);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
