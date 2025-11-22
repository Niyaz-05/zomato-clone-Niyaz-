package com.zomato.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String address;

    private String phoneNumber;

    private String email;

    private String imageUrl;

    private String coverImageUrl;

    private String cuisineType;

    private Integer deliveryTimeMinutes;

    private BigDecimal minimumOrderAmount;

    private BigDecimal deliveryFee;

    private BigDecimal costForTwo;

    private Boolean isPureVegetarian;

    private String openingTime;

    private String closingTime;

    private Double latitude;

    private Double longitude;

    private Boolean hasParking;

    private Boolean hasWifi;

    private Boolean hasAc;

    private Boolean isEcoFriendly;
}
