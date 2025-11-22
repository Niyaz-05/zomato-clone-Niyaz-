package com.zomato.controller;

import com.zomato.dto.AddressRequest;
import com.zomato.dto.LoginRequest;
import com.zomato.dto.SignupRequest;
import com.zomato.entity.Address;
import com.zomato.entity.Role;
import com.zomato.entity.User;
import com.zomato.repository.AddressRepository;
import com.zomato.repository.UserRepository;
import com.zomato.security.JwtUtils;
import com.zomato.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AddressRepository addressRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        
        // Get full user from database to include phoneNumber
        Long userId = userDetails.getId();
        if (userId == null) {
            return ResponseEntity.badRequest().body("Error: User ID is missing!");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Return response matching frontend expectations: { token, user: { id, name, email, phoneNumber, role } }
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("token", jwt);
        
        java.util.Map<String, Object> userMap = new java.util.HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("phoneNumber", user.getPhoneNumber());
        userMap.put("role", user.getRole().name());
        response.put("user", userMap);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER);

        user = userRepository.save(user);

        // Create addresses if provided during signup
        if (signUpRequest.getAddresses() != null && !signUpRequest.getAddresses().isEmpty()) {
            boolean isFirstAddress = true;
            for (AddressRequest addressRequest : signUpRequest.getAddresses()) {
                Address address = new Address();
                address.setLabel(addressRequest.getLabel());
                address.setAddress(addressRequest.getAddress());
                address.setLandmark(addressRequest.getLandmark());
                address.setCity(addressRequest.getCity());
                address.setState(addressRequest.getState());
                address.setPincode(addressRequest.getPincode());
                address.setLatitude(addressRequest.getLatitude());
                address.setLongitude(addressRequest.getLongitude());
                address.setUser(user);
                
                // Set first address as default if not specified
                if (isFirstAddress && addressRequest.getIsDefault() == null) {
                    address.setIsDefault(true);
                } else {
                    address.setIsDefault(Boolean.TRUE.equals(addressRequest.getIsDefault()));
                }
                
                // If this is set as default, unset other defaults
                if (address.getIsDefault()) {
                    addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                            .forEach(addr -> {
                                addr.setIsDefault(false);
                                addressRepository.save(addr);
                            });
                }
                
                addressRepository.save(address);
                isFirstAddress = false;
            }
        }

        // Generate JWT token for the new user
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        signUpRequest.getEmail(),
                        signUpRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Return response matching frontend expectations: { token, user: { id, name, email, phoneNumber, role } }
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("token", jwt);
        
        java.util.Map<String, Object> userMap = new java.util.HashMap<>();
        userMap.put("id", user.getId() != null ? user.getId() : 0L);
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("phoneNumber", user.getPhoneNumber());
        userMap.put("role", user.getRole().name());
        response.put("user", userMap);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("User logged out successfully!");
    }
}
