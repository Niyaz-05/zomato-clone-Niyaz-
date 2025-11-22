package com.zomato.repository;

import com.zomato.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByIsActiveTrue();

    List<Restaurant> findByIsVerifiedTrueAndIsActiveTrue();

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND " +
           "(LOWER(r.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.cuisineType) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.address) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Restaurant> searchRestaurants(@Param("searchTerm") String searchTerm);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.cuisineType LIKE %:cuisine%")
    List<Restaurant> findByCuisineType(@Param("cuisine") String cuisine);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.isPureVegetarian = :isVegetarian")
    List<Restaurant> findByIsPureVegetarian(@Param("isVegetarian") Boolean isVegetarian);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.averageRating >= :minRating")
    List<Restaurant> findByMinRating(@Param("minRating") BigDecimal minRating);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.deliveryFee <= :maxDeliveryFee")
    List<Restaurant> findByMaxDeliveryFee(@Param("maxDeliveryFee") BigDecimal maxDeliveryFee);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.minimumOrderAmount <= :maxOrderAmount")
    List<Restaurant> findByMaxOrderAmount(@Param("maxOrderAmount") BigDecimal maxOrderAmount);

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true ORDER BY r.averageRating DESC")
    List<Restaurant> findTopRatedRestaurants();

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true ORDER BY r.createdAt DESC")
    List<Restaurant> findNewRestaurants();

    @Query("SELECT r FROM Restaurant r WHERE r.isActive = true AND r.isEcoFriendly = true")
    List<Restaurant> findEcoFriendlyRestaurants();

    List<Restaurant> findByOwnerId(Long ownerId);
}
