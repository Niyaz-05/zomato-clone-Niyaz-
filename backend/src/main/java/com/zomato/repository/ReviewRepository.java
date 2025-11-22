package com.zomato.repository;

import com.zomato.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);
    List<Review> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Review> findByMenuItemIdOrderByCreatedAtDesc(Long menuItemId);
    boolean existsByUserIdAndRestaurantId(Long userId, Long restaurantId);
}

