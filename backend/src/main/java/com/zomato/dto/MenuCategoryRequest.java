package com.zomato.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuCategoryRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    private String description;

    private Integer displayOrder;
}
