package com.zomato.repository;

import com.zomato.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByRestaurantIdAndIsAvailableTrue(Long restaurantId);

    List<MenuItem> findByRestaurantIdAndCategoryId(Long restaurantId, Long categoryId);

    List<MenuItem> findByRestaurantIdAndIsAvailableTrueOrderByIsFeaturedDesc(Long restaurantId);

    List<MenuItem> findByIsFeaturedTrueAndIsAvailableTrue();
}
