package com.zomato.service;

import com.zomato.dto.ReviewRequest;
import com.zomato.entity.Review;
import com.zomato.entity.Restaurant;
import com.zomato.entity.User;
import com.zomato.repository.MenuItemRepository;
import com.zomato.repository.RestaurantRepository;
import com.zomato.repository.ReviewRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public Review createReview(ReviewRequest request) {
        User user = userService.getCurrentUser(); // Gets user from JWT token

        // Check if user already reviewed this restaurant
        if (request.getMenuItemId() == null && 
            reviewRepository.existsByUserIdAndRestaurantId(user.getId(), request.getRestaurantId())) {
            throw new RuntimeException("You have already reviewed this restaurant");
        }

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        Review review = new Review();
        review.setUser(user); // Properly linked to user ID from JWT
        review.setRestaurant(restaurant);
        
        if (request.getMenuItemId() != null) {
            review.setMenuItem(menuItemRepository.findById(request.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found")));
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        // Convert images list to JSON string
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            try {
                review.setReviewImages(objectMapper.writeValueAsString(request.getImages()));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Failed to process review images", e);
            }
        }

        // Check if user has ordered from this restaurant (for verified purchase badge)
        // This would require checking order history
        review.setIsVerifiedPurchase(false); // Can be enhanced later

        return reviewRepository.save(review);
    }

    public List<Review> getRestaurantReviews(Long restaurantId) {
        return reviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }

    public List<Review> getUserReviews() {
        User user = userService.getCurrentUser();
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Review updateReview(Long reviewId, ReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        User user = userService.getCurrentUser();
        
        // Check if user owns this review
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        if (request.getImages() != null) {
            try {
                review.setReviewImages(objectMapper.writeValueAsString(request.getImages()));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Failed to process review images", e);
            }
        }

        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        User user = userService.getCurrentUser();
        
        // Check if user owns this review
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this review");
        }

        reviewRepository.delete(review);
    }
}

