# 🔍 Database Correlation & Backend-Frontend Integration Check

## ✅ Database Relationships - CORRECT

### **User Entity Relationships** ✅
All entities properly linked to User via `user_id` foreign key:

1. **Orders** → `@ManyToOne User` ✅
   - `Order.user` properly set in `OrderService.placeOrder()`
   - User ID extracted from JWT via `UserService.getCurrentUser()`
   - Authorization checks: Users can only see their own orders

2. **Addresses** → `@ManyToOne User` ✅
   - `Address.user` properly set in `UserService.addAddress()`
   - User ID extracted from JWT
   - Authorization checks: Users can only modify their own addresses

3. **Reviews** → `@ManyToOne User` ✅
   - `Review.user` should be set (needs controller)
   - User ID should come from JWT

4. **UserSubscriptions** → `@ManyToOne User` ✅
   - Properly linked

### **Order Relationships** ✅
- `Order.restaurant` → Restaurant ✅
- `Order.deliveryAddress` → Address ✅
- `Order.deliveryPartner` → DeliveryPartner ✅
- `Order.orderItems` → List<OrderItem> ✅
- `Order.statusHistory` → List<OrderStatusHistory> ✅

## ⚠️ Issues Found

### **1. Frontend Not Using Backend APIs** ❌

#### **Payment/Order Placement**
- **Current**: `frontend/src/pages/Payment.tsx` saves orders to `localStorage`
- **Should**: Call `orderAPI.placeOrder()` to save to database
- **Issue**: Orders not persisted in database, not linked to user ID

#### **Reviews**
- **Current**: `frontend/src/components/ReviewSection.tsx` saves reviews to `localStorage`
- **Should**: Call backend API to save reviews
- **Issue**: Reviews not persisted in database, not linked to user ID
- **Missing**: `ReviewController.java` doesn't exist

#### **Cart**
- **Current**: Uses `localStorage` via `CartProvider`
- **Should**: Call `cartAPI` methods
- **Issue**: Cart not synced with backend

### **2. Missing Backend Controllers** ❌

1. **ReviewController** - Missing
   - Need: `POST /api/reviews` - Create review
   - Need: `GET /api/reviews/restaurant/{id}` - Get restaurant reviews
   - Need: `GET /api/reviews/user` - Get user reviews
   - Need: `PUT /api/reviews/{id}` - Update review
   - Need: `DELETE /api/reviews/{id}` - Delete review

2. **CartController** - Missing
   - Need: `GET /api/cart` - Get user cart
   - Need: `POST /api/cart/add` - Add item
   - Need: `PUT /api/cart/update` - Update quantity
   - Need: `DELETE /api/cart/remove/{id}` - Remove item
   - Need: `DELETE /api/cart/clear` - Clear cart

### **3. API Endpoint Mismatches** ⚠️

#### **Order API**
- Frontend calls: `/orders/place`, `/orders/history`, `/orders/{id}`
- Backend has: `/api/orders/place`, `/api/orders/my-orders`, `/api/orders/{orderId}`
- **Mismatch**: Frontend missing `/api` prefix and wrong endpoint names

#### **Review API**
- Frontend: No API calls (uses localStorage)
- Backend: No controller exists
- **Missing**: Complete implementation needed

## 🔧 Required Fixes

### **Fix 1: Create ReviewController**

```java
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Review> createReview(@Valid @RequestBody ReviewRequest request) {
        Review review = reviewService.createReview(request);
        return ResponseEntity.ok(review);
    }
    
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Review>> getRestaurantReviews(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(reviewService.getRestaurantReviews(restaurantId));
    }
    
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Review>> getUserReviews() {
        return ResponseEntity.ok(reviewService.getUserReviews());
    }
}
```

### **Fix 2: Create ReviewService**

```java
@Service
@Transactional
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private UserService userService;
    
    public Review createReview(ReviewRequest request) {
        User user = userService.getCurrentUser(); // Gets user from JWT
        
        Review review = new Review();
        review.setUser(user); // Properly linked to user
        review.setRestaurant(restaurantRepository.findById(request.getRestaurantId()).get());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setReviewImages(request.getImages()); // JSON array
        
        return reviewRepository.save(review);
    }
    
    public List<Review> getRestaurantReviews(Long restaurantId) {
        return reviewRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }
    
    public List<Review> getUserReviews() {
        User user = userService.getCurrentUser();
        return reviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
}
```

### **Fix 3: Update Frontend Payment Page**

Replace localStorage with API call:

```typescript
// In Payment.tsx, replace:
const order = {
  id: orderId,
  // ... order data
}
localStorage.setItem('zomato-orders', JSON.stringify(orders))

// With:
const order = await orderAPI.placeOrder({
  restaurantId: orderData.restaurantId,
  addressId: selectedAddressId, // Need to get from address selection
  items: orderData.items.map(item => ({
    menuItemId: item.id,
    quantity: item.quantity,
    specialInstructions: item.specialInstructions
  })),
  paymentMethod: selectedMethod.toUpperCase(),
  specialInstructions: ''
})
```

### **Fix 4: Update Frontend ReviewSection**

Replace localStorage with API call:

```typescript
// In ReviewSection.tsx, replace:
localStorage.setItem('zomato-reviews', JSON.stringify(updatedReviews))

// With:
await reviewAPI.createReview({
  restaurantId: restaurantId,
  rating: rating,
  comment: comment.trim(),
  images: reviewImages
})
```

### **Fix 5: Fix API Endpoints in Frontend**

Update `frontend/src/lib/api.ts`:

```typescript
export const orderAPI = {
  placeOrder: async (orderData: PlaceOrderRequest): Promise<Order> => {
    const response = await api.post<Order>('/orders/place', orderData);
    return response.data;
  },

  getOrderHistory: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders/my-orders'); // Fixed endpoint
    return response.data;
  },

  getOrderById: async (orderId: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  }
}

export const reviewAPI = {
  createReview: async (reviewData: ReviewRequest): Promise<Review> => {
    const response = await api.post<Review>('/reviews', reviewData);
    return response.data;
  },

  getRestaurantReviews: async (restaurantId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/restaurant/${restaurantId}`);
    return response.data;
  },

  getUserReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>('/reviews/user');
    return response.data;
  }
}
```

## ✅ What's Working Correctly

1. **Authentication** ✅
   - JWT token properly extracted from Authorization header
   - User ID extracted from JWT via `UserService.getCurrentUser()`
   - All protected endpoints use `@PreAuthorize`

2. **User-Order Correlation** ✅
   - `OrderService.placeOrder()` uses `userService.getCurrentUser()`
   - `OrderService.getUserOrders()` filters by user ID
   - Authorization checks prevent users from accessing other users' orders

3. **User-Address Correlation** ✅
   - `UserService.addAddress()` links address to current user
   - `UserService.getUserAddresses()` returns only user's addresses
   - Authorization checks prevent modifying other users' addresses

4. **Database Schema** ✅
   - All foreign keys properly defined
   - Cascade operations configured
   - Relationships properly mapped

## 🎯 Summary

### **Database Correlation**: ✅ CORRECT
- All entities properly linked via `user_id` foreign keys
- User ID extracted from JWT token (secure)
- Authorization checks in place

### **Backend Implementation**: ⚠️ PARTIAL
- ✅ Order endpoints working
- ✅ Address endpoints working
- ✅ User endpoints working
- ❌ Review endpoints missing
- ❌ Cart endpoints missing

### **Frontend Integration**: ❌ NEEDS FIX
- ❌ Payment page uses localStorage instead of API
- ❌ Review section uses localStorage instead of API
- ❌ Cart uses localStorage instead of API
- ⚠️ API endpoint names don't match backend

## 📋 Action Items

1. **Create ReviewController and ReviewService** (Backend)
2. **Create CartController and CartService** (Backend)
3. **Update Payment.tsx to use orderAPI** (Frontend)
4. **Update ReviewSection.tsx to use reviewAPI** (Frontend)
5. **Fix API endpoint names in api.ts** (Frontend)
6. **Add address selection to payment flow** (Frontend)
7. **Test all endpoints with same user ID** (Testing)

---

**Status**: Database relationships are correct, but frontend needs to be connected to backend APIs instead of using localStorage.

