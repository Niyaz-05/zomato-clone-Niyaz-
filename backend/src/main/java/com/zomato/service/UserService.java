package com.zomato.service;

import com.zomato.dto.AddressRequest;
import com.zomato.dto.UserProfileUpdateRequest;
import com.zomato.entity.Address;
import com.zomato.entity.User;
import com.zomato.repository.AddressRepository;
import com.zomato.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(UserProfileUpdateRequest request) {
        User user = getCurrentUser();

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getProfileImage() != null) {
            user.setProfileImage(request.getProfileImage());
        }

        return userRepository.save(user);
    }

    public List<Address> getUserAddresses() {
        User user = getCurrentUser();
        return addressRepository.findByUserId(user.getId());
    }

    public Address addAddress(AddressRequest request) {
        User user = getCurrentUser();

        Address address = new Address();
        address.setLabel(request.getLabel());
        address.setAddress(request.getAddress());
        address.setLandmark(request.getLandmark());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());
        address.setUser(user);

        // If this is set as default, unset other defaults
        if (request.getIsDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                    .forEach(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
        }

        return addressRepository.save(address);
    }

    public Address updateAddress(Long addressId, AddressRequest request) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Check if user owns this address
        if (!address.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized to update this address");
        }

        address.setLabel(request.getLabel());
        address.setAddress(request.getAddress());
        address.setLandmark(request.getLandmark());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());

        // If this is set as default, unset other defaults
        if (request.getIsDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(address.getUser().getId())
                    .forEach(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
            address.setIsDefault(true);
        }

        return addressRepository.save(address);
    }

    public void deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Check if user owns this address
        if (!address.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Unauthorized to delete this address");
        }

        addressRepository.delete(address);
    }

    public Address setDefaultAddress(Long addressId) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Check if user owns this address
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this address");
        }

        // Unset all other defaults
        addressRepository.findByUserIdAndIsDefaultTrue(user.getId())
                .forEach(addr -> {
                    addr.setIsDefault(false);
                    addressRepository.save(addr);
                });

        // Set this as default
        address.setIsDefault(true);
        return addressRepository.save(address);
    }
}
