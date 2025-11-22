package com.zomato.repository;

import com.zomato.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

    List<MenuCategory> findByRestaurantIdOrderByDisplayOrder(Long restaurantId);

    List<MenuCategory> findByRestaurantId(Long restaurantId);
}
