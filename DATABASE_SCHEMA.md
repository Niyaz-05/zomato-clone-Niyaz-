# 🗄️ Complete Database Schema Documentation

## 📊 Database Overview

**Database Name:** `zomato_db`  
**Database Type:** MySQL  
**ORM:** Hibernate/JPA  
**Schema Management:** `ddl-auto=update` (auto-creates/updates tables)

---

## 📋 Complete Table Structure

### **1. users** - User Accounts

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    profile_image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Relationships:**
- One user has many orders (`orders.user_id` → `users.id`)
- One user has many addresses (`addresses.user_id` → `users.id`)
- One user has many reviews (`reviews.user_id` → `users.id`)
- One user has many subscriptions (`user_subscriptions.user_id` → `users.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY (email)`

---

### **2. restaurants** - Restaurant Information

```sql
CREATE TABLE restaurants (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    image_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    cuisine_type VARCHAR(50),
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    delivery_time_minutes INT,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0.00,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    cost_for_two DECIMAL(10,2),
    is_pure_vegetarian BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_open BOOLEAN DEFAULT TRUE,
    opening_time VARCHAR(10),
    closing_time VARCHAR(10),
    latitude DOUBLE,
    longitude DOUBLE,
    has_parking BOOLEAN DEFAULT FALSE,
    has_wifi BOOLEAN DEFAULT FALSE,
    has_ac BOOLEAN DEFAULT FALSE,
    is_eco_friendly BOOLEAN DEFAULT FALSE,
    owner_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

**Relationships:**
- Many restaurants belong to one owner (`restaurants.owner_id` → `users.id`)
- One restaurant has many menu items (`menu_items.restaurant_id` → `restaurants.id`)
- One restaurant has many orders (`orders.restaurant_id` → `restaurants.id`)
- One restaurant has many reviews (`reviews.restaurant_id` → `restaurants.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (owner_id) REFERENCES users(id)`

---

### **3. menu_categories** - Menu Categories

```sql
CREATE TABLE menu_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    restaurant_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
```

**Relationships:**
- Many categories belong to one restaurant (`menu_categories.restaurant_id` → `restaurants.id`)
- One category has many menu items (`menu_items.category_id` → `menu_categories.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)`

---

### **4. menu_items** - Menu Items

```sql
CREATE TABLE menu_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    preparation_time_minutes INT,
    calories INT,
    spicy_level VARCHAR(20),
    restaurant_id BIGINT NOT NULL,
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE SET NULL
);
```

**Relationships:**
- Many menu items belong to one restaurant (`menu_items.restaurant_id` → `restaurants.id`)
- Many menu items belong to one category (`menu_items.category_id` → `menu_categories.id`)
- One menu item has many order items (`order_items.menu_item_id` → `menu_items.id`)
- One menu item has many reviews (`reviews.menu_item_id` → `menu_items.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)`
- `FOREIGN KEY (category_id) REFERENCES menu_categories(id)`

---

### **5. addresses** - User Addresses

```sql
CREATE TABLE addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    label VARCHAR(50) NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Relationships:**
- Many addresses belong to one user (`addresses.user_id` → `users.id`)
- One address can be used by many orders (`orders.address_id` → `addresses.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (user_id) REFERENCES users(id)`

---

### **6. orders** - Orders

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    address_id BIGINT NOT NULL,
    delivery_partner_id BIGINT,
    total_price DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    special_instructions TEXT,
    estimated_delivery_time TIMESTAMP,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id)
);
```

**Relationships:**
- Many orders belong to one user (`orders.user_id` → `users.id`) ✅
- Many orders belong to one restaurant (`orders.restaurant_id` → `restaurants.id`)
- Many orders use one address (`orders.address_id` → `addresses.id`)
- Many orders can have one delivery partner (`orders.delivery_partner_id` → `delivery_partners.id`)
- One order has many order items (`order_items.order_id` → `orders.id`)
- One order has many status history entries (`order_status_history.order_id` → `orders.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY (order_number)`
- `FOREIGN KEY (user_id) REFERENCES users(id)` ✅
- `FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)`
- `FOREIGN KEY (address_id) REFERENCES addresses(id)`

---

### **7. order_items** - Order Items

```sql
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);
```

**Relationships:**
- Many order items belong to one order (`order_items.order_id` → `orders.id`) ✅
- Many order items reference one menu item (`order_items.menu_item_id` → `menu_items.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (order_id) REFERENCES orders(id)` ✅
- `FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)`

---

### **8. order_status_history** - Order Status History

```sql
CREATE TABLE order_status_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    changed_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
```

**Relationships:**
- Many status history entries belong to one order (`order_status_history.order_id` → `orders.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (order_id) REFERENCES orders(id)`

---

### **9. reviews** - Reviews

```sql
CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT,
    menu_item_id BIGINT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_images TEXT,  -- JSON array of image URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
```

**Relationships:**
- Many reviews belong to one user (`reviews.user_id` → `users.id`) ✅
- Many reviews belong to one restaurant (`reviews.restaurant_id` → `restaurants.id`)
- Many reviews belong to one menu item (`reviews.menu_item_id` → `menu_items.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (user_id) REFERENCES users(id)` ✅
- `FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)`
- `FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)`

---

### **10. user_subscriptions** - User Subscriptions

```sql
CREATE TABLE user_subscriptions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    subscription_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Relationships:**
- Many subscriptions belong to one user (`user_subscriptions.user_id` → `users.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (user_id) REFERENCES users(id)`

---

### **11. delivery_partners** - Delivery Partners

```sql
CREATE TABLE delivery_partners (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(20),
    is_available BOOLEAN DEFAULT TRUE,
    current_latitude DOUBLE,
    current_longitude DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Relationships:**
- One delivery partner can deliver many orders (`orders.delivery_partner_id` → `delivery_partners.id`)

**Indexes:**
- `PRIMARY KEY (id)`

---

### **12. delivery_earnings** - Delivery Earnings

```sql
CREATE TABLE delivery_earnings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    delivery_partner_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    earnings DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

**Relationships:**
- Many earnings belong to one delivery partner (`delivery_earnings.delivery_partner_id` → `delivery_partners.id`)
- One earning belongs to one order (`delivery_earnings.order_id` → `orders.id`)

**Indexes:**
- `PRIMARY KEY (id)`
- `FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id)`
- `FOREIGN KEY (order_id) REFERENCES orders(id)`

---

## 🔗 Complete Relationship Map

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER                                    │
│  ┌────────────┐                                                 │
│  │ id (PK)    │                                                 │
│  └─────┬──────┘                                                 │
│        │                                                        │
│        │ 1                                                      │
│        │                                                        │
│        │ *                                                      │
│   ┌────┴────┬──────────┬──────────┬──────────┐                 │
│   │         │          │          │          │                 │
│   ▼         ▼          ▼          ▼          ▼                 │
│ ORDERS  ADDRESSES  REVIEWS  SUBSCRIPTIONS  ...                │
│                                                                    │
│  Foreign Keys:                                                    │
│  • orders.user_id → users.id ✅                                  │
│  • addresses.user_id → users.id ✅                                │
│  • reviews.user_id → users.id ✅                                  │
│  • user_subscriptions.user_id → users.id ✅                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       RESTAURANT                                │
│  ┌────────────┐                                                 │
│  │ id (PK)    │                                                 │
│  │ owner_id   │ ────► users.id                                 │
│  └─────┬──────┘                                                 │
│        │                                                        │
│        │ 1                                                      │
│        │                                                        │
│        │ *                                                      │
│   ┌────┴────┬──────────┬──────────┐                          │
│   │         │          │          │                          │
│   ▼         ▼          ▼          ▼                          │
│ MENU_ITEMS  ORDERS   REVIEWS   CATEGORIES                     │
│                                                                    │
│  Foreign Keys:                                                    │
│  • restaurants.owner_id → users.id                              │
│  • menu_items.restaurant_id → restaurants.id                    │
│  • orders.restaurant_id → restaurants.id                         │
│  • reviews.restaurant_id → restaurants.id                        │
│  • menu_categories.restaurant_id → restaurants.id                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          ORDER                                   │
│  ┌────────────┐                                                 │
│  │ id (PK)    │                                                 │
│  │ user_id    │ ────► users.id ✅                              │
│  │ restaurant_id│ ────► restaurants.id                        │
│  │ address_id │ ────► addresses.id                             │
│  └─────┬──────┘                                                 │
│        │                                                        │
│        │ 1                                                      │
│        │                                                        │
│        │ *                                                      │
│   ┌────┴────┬──────────────┐                                 │
│   │         │              │                                 │
│   ▼         ▼              ▼                                  │
│ ORDER_ITEMS  ORDER_STATUS_HISTORY  DELIVERY_EARNINGS          │
│                                                                    │
│  Foreign Keys:                                                    │
│  • orders.user_id → users.id ✅                                  │
│  • orders.restaurant_id → restaurants.id                         │
│  • orders.address_id → addresses.id                              │
│  • order_items.order_id → orders.id ✅                           │
│  • order_status_history.order_id → orders.id                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ User ID Correlation Verification

### **All User-Related Tables**

| Table | Foreign Key Column | References | Status |
|-------|-------------------|------------|--------|
| `orders` | `user_id` | `users.id` | ✅ Linked |
| `addresses` | `user_id` | `users.id` | ✅ Linked |
| `reviews` | `user_id` | `users.id` | ✅ Linked |
| `user_subscriptions` | `user_id` | `users.id` | ✅ Linked |

### **Query Examples**

```sql
-- Get all orders for user ID 5
SELECT * FROM orders WHERE user_id = 5;

-- Get all addresses for user ID 5
SELECT * FROM addresses WHERE user_id = 5;

-- Get all reviews by user ID 5
SELECT * FROM reviews WHERE user_id = 5;

-- Get all subscriptions for user ID 5
SELECT * FROM user_subscriptions WHERE user_id = 5;
```

**All queries properly filter by user_id! ✅**

---

## 🔑 Primary Keys & Foreign Keys Summary

### **Primary Keys**
- `users.id`
- `restaurants.id`
- `menu_categories.id`
- `menu_items.id`
- `addresses.id`
- `orders.id`
- `order_items.id`
- `order_status_history.id`
- `reviews.id`
- `user_subscriptions.id`
- `delivery_partners.id`
- `delivery_earnings.id`

### **Foreign Keys (User Correlation)**
- `orders.user_id` → `users.id` ✅
- `addresses.user_id` → `users.id` ✅
- `reviews.user_id` → `users.id` ✅
- `user_subscriptions.user_id` → `users.id` ✅

### **Foreign Keys (Other Relationships)**
- `restaurants.owner_id` → `users.id`
- `orders.restaurant_id` → `restaurants.id`
- `orders.address_id` → `addresses.id`
- `order_items.order_id` → `orders.id` ✅
- `order_items.menu_item_id` → `menu_items.id`
- `menu_items.restaurant_id` → `restaurants.id`
- `menu_items.category_id` → `menu_categories.id`
- `menu_categories.restaurant_id` → `restaurants.id`
- `reviews.restaurant_id` → `restaurants.id`
- `reviews.menu_item_id` → `menu_items.id`
- `order_status_history.order_id` → `orders.id`
- `orders.delivery_partner_id` → `delivery_partners.id`
- `delivery_earnings.delivery_partner_id` → `delivery_partners.id`
- `delivery_earnings.order_id` → `orders.id`

---

## 📊 Database Indexes

### **Primary Key Indexes**
All tables have a primary key index on `id`.

### **Foreign Key Indexes**
All foreign key columns have indexes for faster joins.

### **Unique Indexes**
- `users.email` - UNIQUE
- `orders.order_number` - UNIQUE

---

## 🔄 Hibernate Auto-Table Creation

**Configuration:**
```properties
spring.jpa.hibernate.ddl-auto=update
```

**Behavior:**
- On application start, Hibernate:
  1. Reads all `@Entity` classes
  2. Compares with existing database tables
  3. Creates missing tables
  4. Updates existing tables (adds missing columns)
  5. Creates foreign key relationships
  6. Sets up indexes

**Result:**
- Tables automatically created/updated
- Foreign keys properly set
- Relationships maintained
- No manual SQL needed

---

## 🎯 Data Integrity Rules

### **Cascade Deletes**
- Deleting a user → Deletes all addresses, reviews, subscriptions (CASCADE)
- Deleting an order → Deletes all order items, status history (CASCADE)
- Deleting a restaurant → Deletes all menu items, categories (CASCADE)

### **Referential Integrity**
- Cannot delete a user if they have orders (unless CASCADE)
- Cannot delete a restaurant if it has orders
- Cannot delete a menu item if it's in an order

### **Constraints**
- `reviews.rating` must be between 1 and 5
- `users.email` must be unique
- `orders.order_number` must be unique

---

## 📝 Sample Data Queries

### **Get User's Complete Data**
```sql
-- User profile
SELECT * FROM users WHERE id = 5;

-- User's orders
SELECT * FROM orders WHERE user_id = 5 ORDER BY created_at DESC;

-- User's addresses
SELECT * FROM addresses WHERE user_id = 5;

-- User's reviews
SELECT * FROM reviews WHERE user_id = 5 ORDER BY created_at DESC;

-- User's subscriptions
SELECT * FROM user_subscriptions WHERE user_id = 5;
```

### **Get Order Details**
```sql
-- Order with items
SELECT 
    o.*,
    oi.*,
    mi.name as menu_item_name
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN menu_items mi ON oi.menu_item_id = mi.id
WHERE o.id = 100;
```

### **Get Restaurant with Menu**
```sql
-- Restaurant with menu items
SELECT 
    r.*,
    mi.*
FROM restaurants r
LEFT JOIN menu_items mi ON r.id = mi.restaurant_id
WHERE r.id = 1;
```

---

## ✅ Database Schema Verification

**All tables created:** ✅  
**All foreign keys set:** ✅  
**All user data linked:** ✅  
**All relationships maintained:** ✅  
**Indexes created:** ✅  
**Constraints enforced:** ✅  

**Database schema is complete and properly structured! ✅**

---

*Complete database schema documentation!* 🗄️

