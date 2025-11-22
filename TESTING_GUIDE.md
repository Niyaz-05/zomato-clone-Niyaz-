# 🧪 Testing Guide - New Features

## Quick Testing Checklist

### 1. ⭐ Favorites System

**Test Steps:**
1. Navigate to `/restaurants`
2. Click the **heart icon** on any restaurant card
3. Toast notification should appear: "Restaurant added to favorites!"
4. Click heart again to remove - Toast: "Removed from favorites"
5. Navigate to `/favorites`
6. Verify restaurant appears in "Restaurants" tab
7. Switch to "Dishes" tab (empty for now)
8. Click on a restaurant card - should navigate to detail page

**Expected Behavior:**
- Heart icon fills with red when favorited
- Favorites persist after page refresh
- Empty state shows when no favorites

---

### 2. 📦 Order History

**Test Steps:**
1. First, place an order:
   - Add items to cart
   - Go to `/cart`
   - Click "Place Order"
2. Navigate to `/order-history`
3. Verify order appears in the list
4. Test filter tabs: All, Active, Completed
5. Click "View Details" - should navigate to tracking page
6. Click "Reorder" button
7. Verify items added to cart
8. Navigate to `/cart` to confirm

**Expected Behavior:**
- Orders display with correct details
- Status badges show correct colors
- Reorder clears cart and adds order items
- Empty state for users with no orders

---

### 3. 📍 Address Management

**Test Steps:**
1. Navigate to `/addresses`
2. Click "Add New Address"
3. Fill form:
   - Type: Home/Work/Other
   - Label: "My Home"
   - Address Line 1: "123 Main Street"
   - City: "Delhi"
   - State: "Delhi"
   - Pincode: "110001"
   - Check "Set as default"
4. Click "Save Address"
5. Verify address appears in list
6. Click **Edit** icon
7. Modify address and save
8. Click **Delete** icon
9. Add another address
10. Click "Set as Default" on non-default address

**Expected Behavior:**
- Form validation works
- Addresses persist after refresh
- Default badge shows on default address
- Icons display correctly (Home/Work/Other)

---

### 4. ⭐ Reviews & Ratings

**Test Steps:**
1. Navigate to any restaurant detail page
2. Click "Reviews" tab
3. Click "Write a Review" button
4. Select star rating (1-5)
5. Write comment: "Great food and service!"
6. Click "Submit Review"
7. Verify review appears in list
8. Click "Helpful" button on any review
9. Verify helpful count increases

**Expected Behavior:**
- Star rating displays correctly
- Review saves and appears immediately
- Average rating updates
- Review count updates
- Helpful votes increment

---

### 5. 🎫 Coupons & Tips in Cart

**Test Coupons:**
1. Add items to cart (total > ₹200)
2. Navigate to `/cart`
3. In "Apply Coupon" section:
   - Enter "FIRST50" and click Apply
   - Verify ₹50 discount applied
   - Verify total updated
   - Click X to remove coupon
4. Click "View available coupons"
5. Click on any coupon card to apply
6. Try applying coupon with insufficient order value

**Available Coupons:**
- `FIRST50` - ₹50 off on orders above ₹200
- `SAVE100` - ₹100 off on orders above ₹500
- `FLAT20` - ₹20 off on all orders

**Test Tips:**
1. In cart, scroll to "Tip Delivery Partner"
2. Click ₹10 button
3. Verify tip added to total
4. Click ₹20 button
5. Verify tip updated
6. Click "No Tip" to remove

**Expected Behavior:**
- Coupon validation works
- Discount calculates correctly
- Tip updates total
- Order summary shows all charges

---

### 6. 🔍 Search (Already Working)

**Test Steps:**
1. In navbar search bar, type "Pizza"
2. Press Enter or click search
3. Verify results show restaurants and dishes
4. Clear search
5. Try searching "Biryani"

---

### 7. 🎛️ Filters (Already Working)

**Test Steps:**
1. Navigate to `/restaurants`
2. Click cuisine filters (Indian, Chinese, etc.)
3. Click rating filters (4.0★ & above)
4. Verify results update
5. Click "Clear All"

---

## 🧪 Integration Testing

### Complete User Flow Test:

1. **Browse & Favorite:**
   - Browse restaurants
   - Add 2-3 restaurants to favorites
   - Visit favorites page

2. **Order Flow:**
   - Select a restaurant
   - Add items to cart
   - Apply coupon "FIRST50"
   - Add ₹20 tip
   - Place order
   - Track order

3. **Post-Order:**
   - Visit order history
   - Reorder from history
   - Add new delivery address
   - Write review for restaurant

4. **Navigation:**
   - Test all navbar links
   - Test mobile menu
   - Test back buttons

---

## 📱 Mobile Testing

**Test on Mobile View:**
1. Toggle mobile menu (hamburger icon)
2. Verify all links appear
3. Test search in mobile
4. Test favorites on mobile
5. Test cart on mobile
6. Test address form on mobile

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🐛 Edge Cases to Test

### Favorites:
- [ ] Add same restaurant twice (should toggle)
- [ ] Favorite with empty cart
- [ ] Remove favorite from detail page

### Order History:
- [ ] Reorder with items from different restaurant in cart
- [ ] View order details for non-existent order
- [ ] Filter with no matching orders

### Addresses:
- [ ] Submit form with missing required fields
- [ ] Add address with very long text
- [ ] Delete default address
- [ ] Set new default when one exists

### Reviews:
- [ ] Submit review without rating
- [ ] Submit review without comment
- [ ] Submit review when not logged in
- [ ] Multiple reviews from same user

### Coupons:
- [ ] Apply invalid coupon code
- [ ] Apply coupon with insufficient order value
- [ ] Apply multiple coupons (should replace)
- [ ] Remove coupon and reapply

### Cart:
- [ ] Add items from different restaurants
- [ ] Apply tip without items in cart
- [ ] Place order with empty cart

---

## ✅ Success Criteria

All features should:
- ✅ Work without errors
- ✅ Show appropriate toast notifications
- ✅ Persist data after page refresh
- ✅ Display empty states correctly
- ✅ Be responsive on all screen sizes
- ✅ Have smooth animations
- ✅ Handle edge cases gracefully

---

## 🚀 Quick Start Testing

**Fastest way to test everything:**

```bash
# 1. Start the frontend
cd frontend
npm run dev

# 2. Open browser to http://localhost:5173

# 3. Follow this sequence:
# - Browse restaurants → Add to favorites
# - Open restaurant → Add items to cart
# - Go to cart → Apply coupon "FIRST50" → Add ₹20 tip
# - Place order
# - Go to order history → Reorder
# - Go to addresses → Add new address
# - Go to restaurant → Write review
# - Go to favorites → Verify saved items
```

---

## 📊 Test Coverage

| Feature | Components | Routes | Functionality |
|---------|-----------|--------|---------------|
| Favorites | ✅ | ✅ | ✅ |
| Order History | ✅ | ✅ | ✅ |
| Addresses | ✅ | ✅ | ✅ |
| Reviews | ✅ | ✅ | ✅ |
| Coupons | ✅ | N/A | ✅ |
| Tips | ✅ | N/A | ✅ |
| Search | ✅ | ✅ | ✅ |
| Filters | ✅ | ✅ | ✅ |

---

## 🎯 Performance Testing

**Check for:**
- [ ] Page load times < 2 seconds
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] LocalStorage size < 5MB
- [ ] No console errors

---

## 🔒 Security Testing

**Verify:**
- [ ] No sensitive data in localStorage
- [ ] XSS protection (input sanitization)
- [ ] CSRF protection (when backend integrated)
- [ ] Proper authentication checks

---

## 📝 Notes

- All data is stored in localStorage (mock data)
- No backend integration yet
- Authentication is simulated
- Order tracking is simulated with timeouts

---

**Happy Testing! 🎉**

*Last Updated: October 11, 2025*
