# 🎯 Backend Complete Flow & Architecture Documentation

## 📁 Backend Folder Structure Overview

```
backend/
├── src/main/java/com/zomato/
│   │
│   ├── ZomatoCloneApplication.java  # Spring Boot Entry Point
│   │
│   ├── controller/                   # REST Controllers (API Endpoints)
│   │   ├── AuthController.java      # Authentication endpoints
│   │   ├── UserController.java      # User management endpoints
│   │   ├── RestaurantController.java # Restaurant endpoints
│   │   ├── OrderController.java     # Order endpoints
│   │   ├── ReviewController.java    # Review endpoints
│   │   └── TestController.java      # Testing endpoints
│   │
│   ├── service/                      # Business Logic Layer
│   │   ├── UserService.java         # User business logic
│   │   ├── RestaurantService.java   # Restaurant business logic
│   │   ├── OrderService.java        # Order business logic
│   │   └── ReviewService.java       # Review business logic
│   │
│   ├── repository/                   # Data Access Layer (JPA)
│   │   ├── UserRepository.java      # User database operations
│   │   ├── RestaurantRepository.java # Restaurant database operations
│   │   ├── OrderRepository.java     # Order database operations
│   │   ├── ReviewRepository.java    # Review database operations
│   │   ├── AddressRepository.java   # Address database operations
│   │   ├── MenuItemRepository.java  # Menu item database operations
│   │   └── ... (other repositories)
│   │
│   ├── entity/                       # Database Entities (JPA)
│   │   ├── User.java                # User table mapping
│   │   ├── Restaurant.java          # Restaurant table mapping
│   │   ├── Order.java               # Order table mapping
│   │   ├── OrderItem.java           # OrderItem table mapping
│   │   ├── MenuItem.java            # MenuItem table mapping
│   │   ├── MenuCategory.java        # MenuCategory table mapping
│   │   ├── Review.java              # Review table mapping
│   │   ├── Address.java             # Address table mapping
│   │   └── ... (other entities)
│   │
│   ├── dto/                          # Data Transfer Objects
│   │   ├── SignupRequest.java      # Signup request DTO
│   │   ├── LoginRequest.java        # Login request DTO
│   │   ├── PlaceOrderRequest.java   # Order request DTO
│   │   ├── ReviewRequest.java       # Review request DTO
│   │   ├── AddressRequest.java      # Address request DTO
│   │   └── ... (other DTOs)
│   │
│   └── security/                     # Security Configuration
│       ├── WebSecurityConfig.java   # Spring Security config
│       ├── JwtUtils.java            # JWT token utilities
│       ├── AuthTokenFilter.java     # JWT authentication filter
│       ├── UserDetailsServiceImpl.java # User details service
│       └── UserPrincipal.java       # User principal (Spring Security)
│
├── src/main/resources/
│   ├── application.properties        # Application configuration
│   └── schema.sql                    # Database schema (optional)
│
└── pom.xml                           # Maven dependencies
```

---

## 🚀 Application Initialization Flow

```
1. Spring Boot Starts
   ↓
2. ZomatoCloneApplication.main() executes
   ↓
3. Spring Boot Auto-Configuration:
   - Scans @SpringBootApplication
   - Finds all @Component, @Service, @Repository, @Controller
   - Configures DataSource (MySQL)
   - Configures JPA/Hibernate
   - Configures Spring Security
   ↓
4. WebSecurityConfig loads:
   - Configures authentication
   - Sets up JWT filter
   - Configures CORS
   - Sets public/private endpoints
   ↓
5. Hibernate initializes:
   - Reads entity classes
   - Creates/updates database tables (ddl-auto=update)
   - Sets up relationships
   ↓
6. Application ready on port 8080
```

---

## 🔄 Complete Request Flow

### **Example: User Places Order**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Request                         │
│  POST /api/orders/place                                     │
│  Headers: Authorization: Bearer <JWT_TOKEN>                 │
│  Body: { restaurantId, addressId, items, paymentMethod }   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Security Filter Chain                   │
│  1. CORS Filter                                             │
│  2. AuthTokenFilter (JWT validation)                        │
│  3. SecurityContextHolder (sets authentication)             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              AuthTokenFilter.doFilterInternal()              │
│  • Extracts JWT from Authorization header                   │
│  • Validates token (JwtUtils.validateJwtToken())            │
│  • Extracts username from token                              │
│  • Loads UserDetails (UserDetailsServiceImpl)               │
│  • Sets Authentication in SecurityContext                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              WebSecurityConfig                              │
│  • Checks @PreAuthorize("hasRole('USER')")                  │
│  • Verifies user has USER role                              │
│  • Allows request to proceed                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              OrderController.placeOrder()                    │
│  • Receives PlaceOrderRequest DTO                           │
│  • Validates request (@Valid annotation)                    │
│  • Calls OrderService.placeOrder()                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              OrderService.placeOrder()                       │
│  1. Gets current user:                                      │
│     UserService.getCurrentUser()                            │
│     → SecurityContextHolder.getContext()                    │
│     → Gets email from Authentication                        │
│     → UserRepository.findByEmail()                          │
│     → Returns User entity                                   │
│                                                              │
│  2. Validates restaurant:                                   │
│     RestaurantRepository.findById()                         │
│                                                              │
│  3. Validates address:                                      │
│     AddressRepository.findById()                            │
│     → Checks if address belongs to user                     │
│                                                              │
│  4. Validates menu items:                                   │
│     MenuItemRepository.findById() (for each item)          │
│     → Checks availability                                    │
│     → Calculates total price                                │
│                                                              │
│  5. Creates Order entity:                                   │
│     • Sets user (from step 1)                               │
│     • Sets restaurant                                       │
│     • Sets delivery address                                 │
│     • Sets total price, fees, taxes                         │
│     • Sets payment method                                   │
│     • Sets status = PENDING                                 │
│                                                              │
│  6. Saves order:                                            │
│     OrderRepository.save(order)                             │
│     → Hibernate generates SQL                               │
│     → INSERT INTO orders (...)                              │
│     → Database creates order with user_id                   │
│                                                              │
│  7. Creates OrderItems:                                     │
│     For each item in request:                               │
│     • Creates OrderItem entity                               │
│     • Links to Order                                        │
│     • Links to MenuItem                                     │
│     • Saves via OrderItemRepository                         │
│                                                              │
│  8. Creates OrderStatusHistory:                              │
│     • Records initial status (PENDING)                       │
│     • Saves to order_status_history table                   │
│                                                              │
│  9. Returns Order entity                                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              OrderController                                │
│  • Wraps Order in ResponseEntity                           │
│  • Returns HTTP 200 OK with Order JSON                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Frontend Receives Response                     │
│  • Order object with ID, status, etc.                      │
│  • Updates UI                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Architecture & Relationships

### **Entity Relationship Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                        USER                                  │
│  ┌────────────┐                                             │
│  │ id (PK)    │                                             │
│  │ name       │                                             │
│  │ email      │                                             │
│  │ password   │                                             │
│  │ role       │                                             │
│  │ phone      │                                             │
│  └────────────┘                                             │
│         │                                                    │
│         │ 1                                                 │
│         │                                                    │
│         │ *                                                 │
│    ┌────┴────┬──────────┬──────────┬──────────┐            │
│    │         │          │          │          │            │
│    ▼         ▼          ▼          ▼          ▼            │
│  ORDERS   ADDRESSES  REVIEWS  SUBSCRIPTIONS  ...           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      RESTAURANT                              │
│  ┌────────────┐                                             │
│  │ id (PK)    │                                             │
│  │ name       │                                             │
│  │ owner_id   │ ────► References USER.id                   │
│  │ ...        │                                             │
│  └────────────┘                                             │
│         │                                                    │
│         │ 1                                                 │
│         │                                                    │
│         │ *                                                 │
│    ┌────┴────┬──────────┬──────────┐                      │
│    │         │          │          │                        │
│    ▼         ▼          ▼          ▼                        │
│  MENU_ITEMS  ORDERS   REVIEWS   ...                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        ORDER                                 │
│  ┌────────────┐                                             │
│  │ id (PK)    │                                             │
│  │ user_id    │ ────► References USER.id (FK)              │
│  │ restaurant_id│ ────► References RESTAURANT.id (FK)       │
│  │ address_id │ ────► References ADDRESS.id (FK)            │
│  │ status     │                                             │
│  │ total_price│                                             │
│  └────────────┘                                             │
│         │                                                    │
│         │ 1                                                 │
│         │                                                    │
│         │ *                                                 │
│    ┌────┴────┬──────────────┐                             │
│    │         │              │                             │
│    ▼         ▼              ▼                              │
│ ORDER_ITEMS  ORDER_STATUS_HISTORY  ...                     │
└─────────────────────────────────────────────────────────────┘
```

### **Complete Database Schema Relationships**

#### **User Entity Relationships**
```
User (1) ──< (Many) Orders
User (1) ──< (Many) Addresses
User (1) ──< (Many) Reviews
User (1) ──< (Many) UserSubscriptions
```

#### **Restaurant Entity Relationships**
```
Restaurant (1) ──< (Many) MenuItems
Restaurant (1) ──< (Many) Orders
Restaurant (1) ──< (Many) Reviews
Restaurant.ownerId ──> User.id (Many-to-One)
```

#### **Order Entity Relationships**
```
Order (1) ──< (Many) OrderItems
Order (1) ──< (Many) OrderStatusHistory
Order.user ──> User (Many-to-One)
Order.restaurant ──> Restaurant (Many-to-One)
Order.deliveryAddress ──> Address (Many-to-One)
Order.deliveryPartner ──> DeliveryPartner (Many-to-One, optional)
```

#### **MenuItem Entity Relationships**
```
MenuItem.restaurant ──> Restaurant (Many-to-One)
MenuItem.category ──> MenuCategory (Many-to-One, optional)
MenuItem (1) ──< (Many) OrderItems
MenuItem (1) ──< (Many) Reviews
```

#### **Review Entity Relationships**
```
Review.user ──> User (Many-to-One)
Review.restaurant ──> Restaurant (Many-to-One, optional)
Review.menuItem ──> MenuItem (Many-to-One, optional)
```

#### **Address Entity Relationships**
```
Address.user ──> User (Many-to-One)
Address (1) ──< (Many) Orders (as deliveryAddress)
```

---

## 🔐 Security & Authentication Flow

### **JWT Authentication Flow**

```
1. User Login Request
   POST /api/auth/login
   Body: { email, password }
   ↓
2. AuthController.login()
   ↓
3. AuthenticationManager.authenticate()
   • Validates credentials
   • Uses UserDetailsServiceImpl
   • Checks password (BCrypt)
   ↓
4. If valid → JwtUtils.generateJwtToken()
   • Creates JWT with:
     - Subject: user email
     - Claim: user ID
     - Claim: user role
     - Expiration: 24 hours
   ↓
5. Returns JWT token to frontend
   ↓
6. Frontend stores token in localStorage
   ↓
7. All subsequent requests include:
   Authorization: Bearer <JWT_TOKEN>
   ↓
8. AuthTokenFilter intercepts request
   • Extracts token from header
   • Validates token (JwtUtils.validateJwtToken())
   • Extracts username from token
   • Loads UserDetails
   • Sets Authentication in SecurityContext
   ↓
9. Controller method executes
   • Can access current user via SecurityContext
   • UserService.getCurrentUser() extracts user
```

### **Authorization Flow**

```
Request arrives at Controller
    ↓
@PreAuthorize("hasRole('USER')") annotation
    ↓
Spring Security checks:
    • Is user authenticated? (from SecurityContext)
    • Does user have required role?
    ↓
If authorized → Method executes
If not authorized → 403 Forbidden
```

---

## 📄 File-by-File Explanation

### **Entry Point**

#### **ZomatoCloneApplication.java**
```java
Purpose: Spring Boot application entry point
Responsibilities:
- @SpringBootApplication annotation
- Scans all packages for components
- Starts embedded Tomcat server
- Initializes Spring context
- Auto-configures everything
```

### **Controllers (REST API Endpoints)**

#### **AuthController.java**
```java
Purpose: Handle authentication requests
Endpoints:
- POST /api/auth/login - User login
- POST /api/auth/signup - User registration
- POST /api/auth/logout - User logout
Dependencies:
- AuthenticationManager (validates credentials)
- UserRepository (saves/finds users)
- JwtUtils (generates tokens)
- AddressRepository (saves addresses during signup)
Flow:
Request → Validate → Authenticate → Generate JWT → Return token + user
```

#### **UserController.java**
```java
Purpose: Handle user profile and address management
Endpoints:
- GET /api/users/profile - Get current user profile
- PUT /api/users/profile - Update profile
- GET /api/users/addresses - Get user addresses
- POST /api/users/addresses - Add address
- PUT /api/users/addresses/{id} - Update address
- DELETE /api/users/addresses/{id} - Delete address
Dependencies:
- UserService (business logic)
Flow:
Request → UserService.getCurrentUser() → Process → Return
```

#### **OrderController.java**
```java
Purpose: Handle order operations
Endpoints:
- POST /api/orders/place - Place new order
- GET /api/orders/my-orders - Get user's orders
- GET /api/orders/{id} - Get order by ID
- PUT /api/orders/{id}/status - Update order status
Dependencies:
- OrderService (business logic)
Flow:
Request → OrderService → Validates → Creates order → Saves to DB → Returns
```

#### **RestaurantController.java**
```java
Purpose: Handle restaurant operations
Endpoints:
- GET /api/restaurants/public/all - Get all restaurants
- GET /api/restaurants/public/{id} - Get restaurant by ID
- GET /api/restaurants/{id}/menu - Get restaurant menu
- POST /api/restaurants - Create restaurant (protected)
Dependencies:
- RestaurantService (business logic)
```

#### **ReviewController.java**
```java
Purpose: Handle review operations
Endpoints:
- POST /api/reviews - Create review
- GET /api/reviews/restaurant/{id} - Get restaurant reviews
- GET /api/reviews/user - Get user's reviews
Dependencies:
- ReviewService (business logic)
Flow:
Request → ReviewService → Gets user from JWT → Creates review → Saves to DB
```

### **Services (Business Logic Layer)**

#### **UserService.java**
```java
Purpose: User-related business logic
Key Methods:
- getCurrentUser() - Gets user from SecurityContext
- updateProfile() - Updates user profile
- addAddress() - Adds address (linked to current user)
- getUserAddresses() - Gets addresses for current user
- updateAddress() - Updates address (with ownership check)
- deleteAddress() - Deletes address (with ownership check)
Dependencies:
- UserRepository (database access)
- AddressRepository (database access)
- SecurityContextHolder (gets current user)
```

#### **OrderService.java**
```java
Purpose: Order-related business logic
Key Methods:
- placeOrder() - Creates new order
  • Gets current user (from JWT)
  • Validates restaurant
  • Validates address (belongs to user)
  • Validates menu items
  • Calculates totals
  • Creates Order entity
  • Creates OrderItems
  • Creates OrderStatusHistory
  • Saves to database
- getUserOrders() - Gets orders for current user
- getOrderById() - Gets order (with authorization check)
Dependencies:
- OrderRepository
- OrderItemRepository
- UserService (gets current user)
- RestaurantRepository
- AddressRepository
- MenuItemRepository
```

#### **RestaurantService.java**
```java
Purpose: Restaurant-related business logic
Key Methods:
- getAllRestaurants() - Gets all active restaurants
- getRestaurantById() - Gets restaurant by ID
- createRestaurant() - Creates restaurant (checks owner)
- getRestaurantMenuItems() - Gets menu for restaurant
Dependencies:
- RestaurantRepository
- MenuItemRepository
- UserService (for ownership checks)
```

#### **ReviewService.java**
```java
Purpose: Review-related business logic
Key Methods:
- createReview() - Creates review
  • Gets current user (from JWT)
  • Validates restaurant
  • Creates Review entity
  • Links to user (review.setUser(user))
  • Saves to database
- getRestaurantReviews() - Gets reviews for restaurant
- getUserReviews() - Gets reviews by current user
Dependencies:
- ReviewRepository
- UserService (gets current user)
- RestaurantRepository
```

### **Repositories (Data Access Layer)**

#### **UserRepository.java**
```java
Purpose: User database operations
Extends: JpaRepository<User, Long>
Methods:
- findByEmail(String email) - Find user by email
- existsByEmail(String email) - Check if email exists
- findByRoleAndIsActiveTrue(Role role) - Find users by role
Custom Queries:
- @Query for complex searches
```

#### **OrderRepository.java**
```java
Purpose: Order database operations
Extends: JpaRepository<Order, Long>
Methods:
- findByUserIdOrderByCreatedAtDesc(Long userId) - Get user's orders
- findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId) - Get restaurant orders
- findByDeliveryPartnerIdOrderByCreatedAtDesc(Long partnerId) - Get partner orders
- findByStatusOrderByCreatedAtDesc(OrderStatus status) - Get orders by status
```

#### **ReviewRepository.java**
```java
Purpose: Review database operations
Extends: JpaRepository<Review, Long>
Methods:
- findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId)
- findByUserIdOrderByCreatedAtDesc(Long userId)
- existsByUserIdAndRestaurantId(Long userId, Long restaurantId)
```

### **Entities (Database Tables)**

#### **User.java**
```java
Purpose: Represents users table
Table: users
Fields:
- id (Primary Key, Auto-generated)
- name, email, password, role, phoneNumber
Relationships:
- @OneToMany List<Order> orders
- @OneToMany List<Address> addresses
- @OneToMany List<Review> reviews
- @OneToMany List<UserSubscription> subscriptions
Database: All related tables have user_id foreign key
```

#### **Order.java**
```java
Purpose: Represents orders table
Table: orders
Fields:
- id (Primary Key)
- orderNumber (Unique)
- user_id (Foreign Key → users.id)
- restaurant_id (Foreign Key → restaurants.id)
- address_id (Foreign Key → addresses.id)
- delivery_partner_id (Foreign Key → delivery_partners.id, optional)
- totalPrice, deliveryFee, taxAmount, finalAmount
- status (OrderStatus enum)
- paymentMethod, paymentStatus
Relationships:
- @ManyToOne User user
- @ManyToOne Restaurant restaurant
- @ManyToOne Address deliveryAddress
- @ManyToOne DeliveryPartner deliveryPartner (optional)
- @OneToMany List<OrderItem> orderItems
- @OneToMany List<OrderStatusHistory> statusHistory
```

#### **OrderItem.java**
```java
Purpose: Represents order_items table
Table: order_items
Fields:
- id (Primary Key)
- order_id (Foreign Key → orders.id)
- menu_item_id (Foreign Key → menu_items.id)
- quantity, unitPrice, totalPrice
Relationships:
- @ManyToOne Order order
- @ManyToOne MenuItem menuItem
```

#### **Review.java**
```java
Purpose: Represents reviews table
Table: reviews
Fields:
- id (Primary Key)
- user_id (Foreign Key → users.id)
- restaurant_id (Foreign Key → restaurants.id, optional)
- menu_item_id (Foreign Key → menu_items.id, optional)
- rating (1-5)
- comment
- review_images (JSON string)
Relationships:
- @ManyToOne User user
- @ManyToOne Restaurant restaurant (optional)
- @ManyToOne MenuItem menuItem (optional)
```

### **DTOs (Data Transfer Objects)**

#### **SignupRequest.java**
```java
Purpose: Data structure for signup request
Fields:
- name, email, password, phoneNumber
- addresses (List<AddressRequest>)
Used by: AuthController.signup()
```

#### **PlaceOrderRequest.java**
```java
Purpose: Data structure for order placement
Fields:
- restaurantId
- addressId
- items (List<OrderItemRequest>)
- paymentMethod
- specialInstructions
Used by: OrderController.placeOrder()
```

### **Security**

#### **WebSecurityConfig.java**
```java
Purpose: Spring Security configuration
Responsibilities:
- Configures authentication provider
- Sets up JWT filter
- Configures CORS
- Defines public/private endpoints
- Sets session management (STATELESS)
```

#### **AuthTokenFilter.java**
```java
Purpose: JWT authentication filter
Responsibilities:
- Intercepts all requests
- Extracts JWT from Authorization header
- Validates JWT token
- Loads user details
- Sets authentication in SecurityContext
Runs: Before every request (except public endpoints)
```

#### **JwtUtils.java**
```java
Purpose: JWT token utilities
Methods:
- generateJwtToken() - Creates JWT
- validateJwtToken() - Validates JWT
- getUserNameFromJwtToken() - Extracts email
- getUserIdFromJwtToken() - Extracts user ID
- getUserRoleFromJwtToken() - Extracts role
```

---

## 🔄 Complete Request-Response Cycle

### **Detailed Flow: Place Order**

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend: Payment.tsx                                       │
│  const order = await orderAPI.placeOrder(orderData)         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  HTTP Request                                                │
│  POST http://localhost:8080/api/orders/place                │
│  Headers:                                                    │
│    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...   │
│    Content-Type: application/json                           │
│  Body:                                                       │
│    {                                                         │
│      "restaurantId": 1,                                     │
│      "addressId": 5,                                        │
│      "items": [                                             │
│        { "menuItemId": 10, "quantity": 2 }                 │
│      ],                                                     │
│      "paymentMethod": "COD"                                 │
│    }                                                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Spring Security Filter Chain                                │
│  1. CORS Filter - Allows cross-origin requests              │
│  2. AuthTokenFilter - Validates JWT                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  AuthTokenFilter.doFilterInternal()                          │
│  1. parseJwt(request)                                       │
│     → Extracts "Bearer eyJhbGc..."                          │
│     → Returns "eyJhbGc..." (token)                          │
│                                                              │
│  2. jwtUtils.validateJwtToken(token)                         │
│     → Checks signature                                       │
│     → Checks expiration                                      │
│     → Returns true                                           │
│                                                              │
│  3. jwtUtils.getUserNameFromJwtToken(token)                  │
│     → Extracts email: "user@example.com"                    │
│                                                              │
│  4. userDetailsService.loadUserByUsername(email)            │
│     → UserRepository.findByEmail(email)                     │
│     → Returns UserPrincipal                                 │
│                                                              │
│  5. Sets Authentication in SecurityContext                  │
│     SecurityContextHolder.getContext()                      │
│       .setAuthentication(authentication)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  WebSecurityConfig                                           │
│  Checks @PreAuthorize("hasRole('USER')")                    │
│  • Gets Authentication from SecurityContext                  │
│  • Checks if user has ROLE_USER                             │
│  • Allows request                                            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  OrderController.placeOrder()                                │
│  @PostMapping("/place")                                      │
│  @PreAuthorize("hasRole('USER')")                           │
│  public ResponseEntity<Order> placeOrder(                   │
│      @Valid @RequestBody PlaceOrderRequest request          │
│  )                                                           │
│                                                              │
│  1. @Valid validates request fields                          │
│  2. Calls orderService.placeOrder(request)                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  OrderService.placeOrder()                                   │
│                                                              │
│  Step 1: Get Current User                                    │
│  ────────────────────────────────                           │
│  User user = userService.getCurrentUser()                   │
│    → SecurityContextHolder.getContext()                     │
│        .getAuthentication()                                 │
│    → Gets email: "user@example.com"                         │
│    → UserRepository.findByEmail(email)                      │
│    → Returns User entity (id=5, name="John", ...)           │
│                                                              │
│  Step 2: Validate Restaurant                                 │
│  ────────────────────────────────                           │
│  Restaurant restaurant =                                     │
│    restaurantRepository.findById(request.getRestaurantId())  │
│    → SELECT * FROM restaurants WHERE id = 1                  │
│    → Returns Restaurant entity                              │
│                                                              │
│  Step 3: Validate Address                                    │
│  ────────────────────────────────                           │
│  Address address =                                          │
│    addressRepository.findById(request.getAddressId())       │
│    → SELECT * FROM addresses WHERE id = 5                   │
│    → Checks: address.getUser().getId() == user.getId()      │
│    → Returns Address entity                                 │
│                                                              │
│  Step 4: Validate Menu Items                                 │
│  ────────────────────────────────                           │
│  For each item in request.getItems():                       │
│    MenuItem menuItem =                                      │
│      menuItemRepository.findById(item.getMenuItemId())      │
│    → SELECT * FROM menu_items WHERE id = 10                │
│    → Checks: menuItem.getIsAvailable() == true              │
│    → Calculates: totalPrice += price * quantity             │
│                                                              │
│  Step 5: Create Order Entity                                 │
│  ────────────────────────────────                           │
│  Order order = new Order()                                  │
│  order.setUser(user)              // Links to user ID       │
│  order.setRestaurant(restaurant)                            │
│  order.setDeliveryAddress(address)                          │
│  order.setTotalPrice(totalPrice)                            │
│  order.setStatus(OrderStatus.PENDING)                       │
│  order.setPaymentMethod(PaymentMethod.COD)                  │
│                                                              │
│  Step 6: Save Order to Database                             │
│  ────────────────────────────────                           │
│  order = orderRepository.save(order)                        │
│    → Hibernate generates SQL:                               │
│      INSERT INTO orders (                                   │
│        user_id, restaurant_id, address_id,                  │
│        total_price, status, ...                             │
│      ) VALUES (                                             │
│        5, 1, 5, 500.00, 'PENDING', ...                     │
│      )                                                       │
│    → Database creates order with id = 100                  │
│    → Foreign keys properly set:                             │
│      • orders.user_id = 5 (links to users.id)              │
│      • orders.restaurant_id = 1                             │
│      • orders.address_id = 5                                │
│                                                              │
│  Step 7: Create Order Items                                 │
│  ────────────────────────────────                           │
│  For each item in request.getItems():                       │
│    OrderItem orderItem = new OrderItem()                    │
│    orderItem.setOrder(order)        // Links to order      │
│    orderItem.setMenuItem(menuItem)                          │
│    orderItem.setQuantity(2)                                 │
│    orderItemRepository.save(orderItem)                      │
│      → INSERT INTO order_items (                            │
│          order_id, menu_item_id, quantity, ...              │
│        ) VALUES (                                            │
│          100, 10, 2, ...                                    │
│        )                                                     │
│                                                              │
│  Step 8: Create Status History                              │
│  ────────────────────────────────                           │
│  OrderStatusHistory history = new OrderStatusHistory()     │
│  history.setOrder(order)                                    │
│  history.setStatus(OrderStatus.PENDING)                    │
│  historyRepository.save(history)                            │
│                                                              │
│  Step 9: Return Order                                       │
│  ────────────────────────────────                           │
│  return order (with all relationships loaded)               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  OrderController                                             │
│  return ResponseEntity.ok(order)                             │
│  → Converts Order entity to JSON                             │
│  → Returns HTTP 200 OK with Order JSON                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Frontend Receives Response                                  │
│  {                                                           │
│    "id": 100,                                                │
│    "orderNumber": "ORD-ABC123",                              │
│    "status": "PENDING",                                      │
│    "totalPrice": 500.00,                                     │
│    "user": { "id": 5, "name": "John" },                     │
│    "restaurant": { "id": 1, "name": "Pizza Place" },        │
│    ...                                                       │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema & Relationships

### **Complete Entity Relationship Map**

```
USER (users table)
├── id (PK)
├── email (UNIQUE)
├── name, password, role, phoneNumber
│
├──► ORDERS (orders table)
│   ├── user_id (FK → users.id) ✅
│   ├── restaurant_id (FK → restaurants.id)
│   ├── address_id (FK → addresses.id)
│   ├── delivery_partner_id (FK → delivery_partners.id)
│   │
│   └──► ORDER_ITEMS (order_items table)
│       ├── order_id (FK → orders.id) ✅
│       └── menu_item_id (FK → menu_items.id)
│
├──► ADDRESSES (addresses table)
│   ├── user_id (FK → users.id) ✅
│   └── Used by orders as delivery_address
│
├──► REVIEWS (reviews table)
│   ├── user_id (FK → users.id) ✅
│   ├── restaurant_id (FK → restaurants.id)
│   └── menu_item_id (FK → menu_items.id)
│
└──► USER_SUBSCRIPTIONS (user_subscriptions table)
    └── user_id (FK → users.id) ✅

RESTAURANT (restaurants table)
├── id (PK)
├── owner_id (FK → users.id) ✅
│
├──► MENU_ITEMS (menu_items table)
│   ├── restaurant_id (FK → restaurants.id) ✅
│   └── category_id (FK → menu_categories.id)
│
├──► ORDERS (orders table)
│   └── restaurant_id (FK → restaurants.id) ✅
│
└──► REVIEWS (reviews table)
    └── restaurant_id (FK → restaurants.id) ✅
```

### **Foreign Key Relationships**

| Child Table | Foreign Key Column | References | Relationship |
|------------|-------------------|------------|--------------|
| `orders` | `user_id` | `users.id` | Many-to-One ✅ |
| `orders` | `restaurant_id` | `restaurants.id` | Many-to-One ✅ |
| `orders` | `address_id` | `addresses.id` | Many-to-One ✅ |
| `order_items` | `order_id` | `orders.id` | Many-to-One ✅ |
| `order_items` | `menu_item_id` | `menu_items.id` | Many-to-One ✅ |
| `addresses` | `user_id` | `users.id` | Many-to-One ✅ |
| `reviews` | `user_id` | `users.id` | Many-to-One ✅ |
| `reviews` | `restaurant_id` | `restaurants.id` | Many-to-One ✅ |
| `menu_items` | `restaurant_id` | `restaurants.id` | Many-to-One ✅ |
| `restaurants` | `owner_id` | `users.id` | Many-to-One ✅ |

**All relationships properly linked! ✅**

---

## 🔐 User ID Correlation Flow

### **How User ID is Extracted and Used**

```
1. User logs in
   ↓
2. AuthController.login() generates JWT
   ↓
3. JWT contains:
   - Subject: user email
   - Claim: user ID (from UserPrincipal.getId())
   - Claim: user role
   ↓
4. Frontend stores JWT
   ↓
5. Frontend sends request with JWT
   ↓
6. AuthTokenFilter extracts JWT
   ↓
7. JwtUtils.getUserNameFromJwtToken() → Gets email
   ↓
8. UserDetailsServiceImpl.loadUserByUsername(email)
   ↓
9. UserRepository.findByEmail(email) → Gets User entity
   ↓
10. UserPrincipal created with User ID
   ↓
11. Authentication set in SecurityContext
   ↓
12. Service method calls UserService.getCurrentUser()
   ↓
13. Gets email from SecurityContext
   ↓
14. UserRepository.findByEmail(email) → Gets User with ID
   ↓
15. User ID used to:
    - Link order: order.setUser(user) → order.user_id = user.id
    - Link review: review.setUser(user) → review.user_id = user.id
    - Link address: address.setUser(user) → address.user_id = user.id
    - Filter queries: findByUserId(user.getId())
```

**Result: All data properly correlated by user ID! ✅**

---

## 📊 Service Layer Pattern

### **Service Layer Responsibilities**

```
Controller (API Layer)
    ↓ Receives HTTP request
    ↓ Validates DTO (@Valid)
    ↓
Service (Business Logic Layer)
    ↓ Gets current user (from JWT)
    ↓ Validates business rules
    ↓ Processes data
    ↓ Calls repositories
    ↓
Repository (Data Access Layer)
    ↓ Executes database queries
    ↓ Returns entities
    ↓
Database (MySQL)
    ↓ Stores data
    ↓ Returns results
```

### **Service Method Pattern**

```java
public Order placeOrder(PlaceOrderRequest request) {
    // 1. Get current user (from JWT)
    User user = userService.getCurrentUser();
    
    // 2. Validate inputs
    Restaurant restaurant = restaurantRepository.findById(...)
    Address address = addressRepository.findById(...)
    
    // 3. Business logic
    // Calculate totals, validate rules, etc.
    
    // 4. Create entity
    Order order = new Order();
    order.setUser(user);  // Links to user ID
    
    // 5. Save to database
    order = orderRepository.save(order);
    
    // 6. Return entity
    return order;
}
```

---

## 🔄 Repository Pattern

### **JPA Repository Pattern**

```java
// Repository Interface
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Spring Data JPA provides:
    // - save(), findById(), findAll(), delete(), etc.
    
    // Custom queries
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    // Spring generates: SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
}
```

### **How Repositories Work**

```
Service calls: orderRepository.findByUserIdOrderByCreatedAtDesc(userId)
    ↓
Spring Data JPA:
    • Parses method name
    • Generates SQL query
    • Executes query
    • Maps results to Order entities
    • Returns List<Order>
```

---

## 🗄️ Database Operations Flow

### **Hibernate/JPA Flow**

```
1. Entity Class (e.g., Order.java)
   • @Entity annotation
   • @Table(name = "orders")
   • Fields with @Column
   • Relationships with @ManyToOne, @OneToMany
   ↓
2. Hibernate reads entity
   • Creates table if not exists (ddl-auto=update)
   • Creates foreign keys
   • Sets up relationships
   ↓
3. Service calls repository.save(entity)
   ↓
4. Hibernate:
   • Generates SQL INSERT/UPDATE
   • Sets foreign key values
   • Executes query
   • Returns entity with ID
   ↓
5. Entity saved to database
   • All relationships preserved
   • Foreign keys set correctly
```

---

## 🔗 How Files Are Linked Together

### **Dependency Graph**

```
ZomatoCloneApplication
    │
    ├──► Scans all packages
    │
    ├──► Controllers
    │    ├── AuthController
    │    │   ├──► UserRepository
    │    │   ├──► AddressRepository
    │    │   ├──► AuthenticationManager
    │    │   └──► JwtUtils
    │    │
    │    ├── UserController
    │    │   └──► UserService
    │    │
    │    ├── OrderController
    │    │   └──► OrderService
    │    │
    │    ├── RestaurantController
    │    │   └──► RestaurantService
    │    │
    │    └── ReviewController
    │        └──► ReviewService
    │
    ├──► Services
    │    ├── UserService
    │    │   ├──► UserRepository
    │    │   ├──► AddressRepository
    │    │   └──► SecurityContextHolder
    │    │
    │    ├── OrderService
    │    │   ├──► OrderRepository
    │    │   ├──► OrderItemRepository
    │    │   ├──► UserService (gets current user)
    │    │   ├──► RestaurantRepository
    │    │   ├──► AddressRepository
    │    │   └──► MenuItemRepository
    │    │
    │    ├── RestaurantService
    │    │   ├──► RestaurantRepository
    │    │   ├──► MenuItemRepository
    │    │   └──► UserService
    │    │
    │    └── ReviewService
    │        ├──► ReviewRepository
    │        ├──► UserService
    │        └──► RestaurantRepository
    │
    ├──► Repositories
    │    ├── UserRepository extends JpaRepository<User, Long>
    │    ├── OrderRepository extends JpaRepository<Order, Long>
    │    ├── RestaurantRepository extends JpaRepository<Restaurant, Long>
    │    └── ... (all extend JpaRepository)
    │
    ├──► Entities
    │    ├── User (maps to users table)
    │    ├── Order (maps to orders table)
    │    ├── Restaurant (maps to restaurants table)
    │    └── ... (all map to database tables)
    │
    └──► Security
         ├── WebSecurityConfig
         │   ├──► UserDetailsServiceImpl
         │   └──► AuthTokenFilter
         │
         ├── AuthTokenFilter
         │   ├──► JwtUtils
         │   └──► UserDetailsServiceImpl
         │
         └── JwtUtils (standalone utility)
```

---

## 📋 Complete API Endpoint Map

### **Authentication Endpoints** (`/api/auth`)
```
POST   /api/auth/login          → AuthController.login()
POST   /api/auth/signup         → AuthController.signup()
POST   /api/auth/logout         → AuthController.logout()
```

### **User Endpoints** (`/api/users`)
```
GET    /api/users/profile                    → UserController.getCurrentUserProfile()
PUT    /api/users/profile                    → UserController.updateProfile()
GET    /api/users/addresses                  → UserController.getUserAddresses()
POST   /api/users/addresses                  → UserController.addAddress()
PUT    /api/users/addresses/{id}             → UserController.updateAddress()
DELETE /api/users/addresses/{id}             → UserController.deleteAddress()
PUT    /api/users/addresses/{id}/set-default → UserController.setDefaultAddress()
```

### **Restaurant Endpoints** (`/api/restaurants`)
```
GET    /api/restaurants/public/all           → RestaurantController.getAllRestaurants()
GET    /api/restaurants/public/{id}          → RestaurantController.getRestaurantById()
GET    /api/restaurants/public/search        → RestaurantController.searchRestaurants()
GET    /api/restaurants/{id}/menu            → RestaurantController.getRestaurantMenu()
POST   /api/restaurants                      → RestaurantController.createRestaurant() [Protected]
```

### **Order Endpoints** (`/api/orders`)
```
POST   /api/orders/place                     → OrderController.placeOrder() [Protected]
GET    /api/orders/my-orders                 → OrderController.getUserOrders() [Protected]
GET    /api/orders/{id}                      → OrderController.getOrderById() [Protected]
PUT    /api/orders/{id}/status               → OrderController.updateOrderStatus() [Protected]
```

### **Review Endpoints** (`/api/reviews`)
```
POST   /api/reviews                          → ReviewController.createReview() [Protected]
GET    /api/reviews/restaurant/{id}          → ReviewController.getRestaurantReviews()
GET    /api/reviews/user                     → ReviewController.getUserReviews() [Protected]
PUT    /api/reviews/{id}                     → ReviewController.updateReview() [Protected]
DELETE /api/reviews/{id}                     → ReviewController.deleteReview() [Protected]
```

---

## 🎯 Key Design Patterns

### **1. Layered Architecture**
```
Controller Layer (API)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Entity Layer (Database Mapping)
    ↓
Database (MySQL)
```

### **2. Dependency Injection**
- Spring automatically injects dependencies
- `@Autowired` annotation
- Constructor injection (preferred)

### **3. Repository Pattern**
- JPA Repository interfaces
- Spring Data JPA generates implementations
- Custom query methods

### **4. DTO Pattern**
- Separate request/response objects
- Validates input data
- Prevents entity exposure

### **5. JWT Authentication**
- Stateless authentication
- Token-based security
- Filter-based validation

---

## 🔐 Security Architecture

### **Security Filter Chain**

```
Request arrives
    ↓
1. CORS Filter
   • Allows cross-origin requests
   ↓
2. AuthTokenFilter
   • Extracts JWT
   • Validates token
   • Sets authentication
   ↓
3. Authorization Check
   • @PreAuthorize checks role
   ↓
4. Controller Method
   • Executes if authorized
```

### **Public vs Protected Endpoints**

**Public (No Authentication Required):**
- `/api/auth/**` - Login, signup
- `/api/restaurants/public/**` - Browse restaurants
- `/api/menu-items/public/**` - View menu
- `/api/reviews/public/**` - View reviews

**Protected (Authentication Required):**
- `/api/orders/**` - Order operations
- `/api/users/**` - User operations
- `/api/reviews` (POST, PUT, DELETE) - Create/update reviews
- `/api/restaurants` (POST, PUT, DELETE) - Restaurant management

---

## 📊 Database Transaction Flow

### **Order Placement Transaction**

```
@Transactional (OrderService.placeOrder)
    ↓
1. Begin Transaction
    ↓
2. Save Order
   INSERT INTO orders (...)
    ↓
3. Save OrderItems (multiple)
   INSERT INTO order_items (...)
   INSERT INTO order_items (...)
    ↓
4. Save OrderStatusHistory
   INSERT INTO order_status_history (...)
    ↓
5. Commit Transaction
   • All or nothing
   • If any step fails → Rollback
```

---

## 🔄 Complete Data Correlation Example

### **User Places Order - Database State**

```
1. User (id=5) logs in
   → JWT token created with user ID

2. User places order
   → Order created:
     orders.id = 100
     orders.user_id = 5 ✅ (linked to users.id=5)
     orders.restaurant_id = 1
     orders.address_id = 10

3. OrderItems created:
   order_items.id = 200
   order_items.order_id = 100 ✅ (linked to orders.id=100)
   order_items.menu_item_id = 50

4. User writes review
   → Review created:
     reviews.id = 300
     reviews.user_id = 5 ✅ (linked to users.id=5)
     reviews.restaurant_id = 1

5. Database Queries:
   SELECT * FROM orders WHERE user_id = 5
   → Returns all orders for user 5 ✅
   
   SELECT * FROM reviews WHERE user_id = 5
   → Returns all reviews by user 5 ✅
   
   SELECT * FROM addresses WHERE user_id = 5
   → Returns all addresses for user 5 ✅
```

**All data properly correlated by user_id! ✅**

---

## 🎓 Key Concepts

### **1. Spring Boot Auto-Configuration**
- Automatically configures based on dependencies
- Scans for components
- Sets up database connection
- Configures security

### **2. JPA/Hibernate**
- Object-Relational Mapping (ORM)
- Maps Java classes to database tables
- Manages relationships
- Generates SQL queries

### **3. Spring Security**
- Authentication (who you are)
- Authorization (what you can do)
- JWT-based stateless security

### **4. Dependency Injection**
- Spring manages object creation
- Injects dependencies automatically
- Promotes loose coupling

### **5. Repository Pattern**
- Abstracts database access
- Provides common CRUD operations
- Custom query methods

---

## 📝 Summary

**Backend Architecture:**
- ✅ Spring Boot 3.2.0
- ✅ MySQL Database
- ✅ JPA/Hibernate ORM
- ✅ Spring Security + JWT
- ✅ RESTful API
- ✅ Layered Architecture

**Data Flow:**
- Request → Security Filter → Controller → Service → Repository → Database

**User ID Correlation:**
- ✅ JWT contains user ID
- ✅ Extracted in every request
- ✅ Used to link all user data
- ✅ Foreign keys properly set

**All data is properly correlated by user ID! ✅**

---

*This is the complete backend architecture and flow documentation!* 🎉

