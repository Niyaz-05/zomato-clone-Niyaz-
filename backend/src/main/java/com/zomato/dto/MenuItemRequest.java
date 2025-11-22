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
public class MenuItemRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    private String description;

    private BigDecimal price;

    private String imageUrl;

    private Boolean isVegetarian;

    private Boolean isAvailable;

    private Boolean isFeatured;

    private Integer preparationTimeMinutes;

    private Integer calories;

    private com.zomato.entity.SpicyLevel spicyLevel;

    private Long categoryId;
}
