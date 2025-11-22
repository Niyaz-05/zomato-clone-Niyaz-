# ⚡ Backend Quick Reference Guide

## 📁 Folder Structure

```
backend/
├── src/main/java/com/zomato/
│   ├── controller/      → REST API endpoints
│   ├── service/         → Business logic
│   ├── repository/       → Database access
│   ├── entity/          → Database tables (JPA)
│   ├── dto/             → Request/Response objects
│   └── security/        → JWT & Security config
└── src/main/resources/
    └── application.properties  → Configuration
```

---

## 🔄 Request Flow (Quick)

```
HTTP Request
    ↓
Security Filter (JWT validation)
    ↓
Controller (@RestController)
    ↓
Service (@Service) - Business logic
    ↓
Repository (@Repository) - Database
    ↓
MySQL Database
    ↓
Response (JSON)
```

---

## 📋 Key Annotations

| Annotation | Purpose | Example |
|------------|---------|---------|
| `@RestController` | REST API controller | `@RestController @RequestMapping("/api/orders")` |
| `@Service` | Business logic layer | `@Service public class OrderService` |
| `@Repository` | Data access layer | `@Repository public interface OrderRepository` |
| `@Entity` | Database table mapping | `@Entity @Table(name = "orders")` |
| `@Autowired` | Dependency injection | `@Autowired private OrderService orderService` |
| `@PreAuthorize` | Authorization check | `@PreAuthorize("hasRole('USER')")` |
| `@Transactional` | Database transaction | `@Transactional public void placeOrder()` |
| `@ManyToOne` | Foreign key relationship | `@ManyToOne User user` |
| `@OneToMany` | One-to-many relationship | `@OneToMany List<Order> orders` |

---

## 🔐 Security Flow (Quick)

```
1. User logs in → JWT token created
2. Frontend stores JWT
3. All requests include: Authorization: Bearer <JWT>
4. AuthTokenFilter validates JWT
5. Sets Authentication in SecurityContext
6. Controller can access current user
```

---

## 🗄️ Database Relationships (Quick)

| Entity | Relationship | Example |
|--------|----------|---------|
| `User` | 1 → Many | `User` has many `Order`s |
| `Order` | Many → 1 | `Order` belongs to one `User` |
| `Order` | Many → 1 | `Order` belongs to one `Restaurant` |
| `OrderItem` | Many → 1 | `OrderItem` belongs to one `Order` |
| `Review` | Many → 1 | `Review` belongs to one `User` |

**All linked by foreign keys! ✅**

---

## 📊 Service Pattern

```java
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserService userService;
    
    public Order placeOrder(PlaceOrderRequest request) {
        // 1. Get current user (from JWT)
        User user = userService.getCurrentUser();
        
        // 2. Validate & process
        // ...
        
        // 3. Create entity
        Order order = new Order();
        order.setUser(user);  // Links to user ID ✅
        
        // 4. Save to database
        return orderRepository.save(order);
    }
}
```

---

## 🔑 Getting Current User

```java
// In Service class
@Autowired
private UserService userService;

public void someMethod() {
    User user = userService.getCurrentUser();
    // User ID automatically extracted from JWT ✅
}
```

---

## 📝 Repository Pattern

```java
// Repository Interface
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Spring provides: save(), findById(), findAll(), delete()
    
    // Custom queries (Spring generates SQL)
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    // → SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
}
```

---

## 🎯 API Endpoints (Quick)

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Signup
- `POST /api/auth/logout` - Logout

### Orders
- `POST /api/orders/place` - Place order [Protected]
- `GET /api/orders/my-orders` - Get user orders [Protected]
- `GET /api/orders/{id}` - Get order by ID [Protected]

### Users
- `GET /api/users/profile` - Get profile [Protected]
- `PUT /api/users/profile` - Update profile [Protected]
- `GET /api/users/addresses` - Get addresses [Protected]

### Restaurants
- `GET /api/restaurants/public/all` - Get all restaurants
- `GET /api/restaurants/public/{id}` - Get restaurant by ID
- `GET /api/restaurants/{id}/menu` - Get menu

### Reviews
- `POST /api/reviews` - Create review [Protected]
- `GET /api/reviews/restaurant/{id}` - Get restaurant reviews

---

## 🔄 User ID Correlation (Quick)

```
1. User logs in → JWT contains user ID
2. Request arrives → JWT validated
3. User ID extracted from JWT
4. User loaded from database
5. All operations use this user ID:
   - order.setUser(user) → order.user_id = user.id ✅
   - review.setUser(user) → review.user_id = user.id ✅
   - address.setUser(user) → address.user_id = user.id ✅
```

**All data properly linked! ✅**

---

## 🗄️ Database Tables (Quick)

| Table | Primary Key | Foreign Keys |
|-------|-------------|--------------|
| `users` | `id` | - |
| `orders` | `id` | `user_id`, `restaurant_id`, `address_id` |
| `order_items` | `id` | `order_id`, `menu_item_id` |
| `reviews` | `id` | `user_id`, `restaurant_id` |
| `addresses` | `id` | `user_id` |
| `restaurants` | `id` | `owner_id` (→ users.id) |
| `menu_items` | `id` | `restaurant_id` |

**All foreign keys properly set! ✅**

---

## 🔐 Security Configuration (Quick)

```java
@Configuration
public class WebSecurityConfig {
    // Public endpoints (no auth required)
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/api/restaurants/public/**").permitAll()
    
    // Protected endpoints (auth required)
    .anyRequest().authenticated()
    
    // JWT filter
    .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class)
}
```

---

## 📊 Entity Relationships (Quick)

```
User (1) ──< (Many) Orders
User (1) ──< (Many) Addresses
User (1) ──< (Many) Reviews

Order (1) ──< (Many) OrderItems
Order (Many) ──> (1) User
Order (Many) ──> (1) Restaurant

Restaurant (1) ──< (Many) MenuItems
Restaurant (1) ──< (Many) Orders
Restaurant (1) ──< (Many) Reviews
```

---

## 🚀 Common Patterns

### 1. Controller Pattern
```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    
    @PostMapping("/place")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        Order order = orderService.placeOrder(request);
        return ResponseEntity.ok(order);
    }
}
```

### 2. Service Pattern
```java
@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserService userService;
    
    public Order placeOrder(PlaceOrderRequest request) {
        User user = userService.getCurrentUser();  // Get from JWT
        // ... business logic
        return orderRepository.save(order);
    }
}
```

### 3. Repository Pattern
```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
}
```

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `ZomatoCloneApplication.java` | Spring Boot entry point |
| `WebSecurityConfig.java` | Security configuration |
| `AuthTokenFilter.java` | JWT validation filter |
| `JwtUtils.java` | JWT token utilities |
| `UserService.java` | Gets current user from JWT |
| `application.properties` | Database & app configuration |

---

## 🎯 Quick Tips

1. **Get Current User**: Always use `userService.getCurrentUser()` in services
2. **Link to User**: Always set `entity.setUser(user)` when creating entities
3. **Foreign Keys**: Hibernate automatically sets foreign keys when you set relationships
4. **Transactions**: Use `@Transactional` on service methods
5. **Authorization**: Use `@PreAuthorize` on controller methods

---

## 📝 Configuration (Quick)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/zomato_db
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
app.jwt.secret=mySecretKey...
app.jwt.expiration=86400000
```

---

*Quick reference for backend development!* ⚡

