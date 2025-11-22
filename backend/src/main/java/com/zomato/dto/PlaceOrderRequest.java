package com.zomato.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequest {

    @NotNull
    private Long restaurantId;

    @NotNull
    private Long addressId;

    private List<OrderItemRequest> items;

    private String specialInstructions;

    private String paymentMethod;

    private String couponCode;
}
