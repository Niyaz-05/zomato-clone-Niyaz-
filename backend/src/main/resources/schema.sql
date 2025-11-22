-- Zomato Clone Database Schema
-- PostgreSQL Database Setup Script

-- Create database (run this manually in PostgreSQL)
-- CREATE DATABASE zomato_db;

-- Enable UUID extension for unique IDs if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    phone_number VARCHAR(20),
    profile_image VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    image_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    cuisine_type VARCHAR(100),
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    delivery_time_minutes INTEGER,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0.00,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    cost_for_two DECIMAL(10,2),
    is_pure_vegetarian BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_open BOOLEAN DEFAULT true,
    opening_time VARCHAR(20),
    closing_time VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    has_parking BOOLEAN DEFAULT false,
    has_wifi BOOLEAN DEFAULT false,
    has_ac BOOLEAN DEFAULT false,
    is_eco_friendly BOOLEAN DEFAULT false,
    owner_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Menu categories table
CREATE TABLE IF NOT EXISTS menu_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    restaurant_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_vegetarian BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    preparation_time_minutes INTEGER,
    calories INTEGER,
    spicy_level VARCHAR(20),
    restaurant_id BIGINT NOT NULL,
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id BIGSERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    landmark VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_default BOOLEAN DEFAULT false,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Delivery partners table
CREATE TABLE IF NOT EXISTS delivery_partners (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_image VARCHAR(500),
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(20),
    license_number VARCHAR(50),
    current_latitude DECIMAL(10,8),
    current_longitude DECIMAL(11,8),
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_deliveries INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    delivery_partner_id BIGINT,
    address_id BIGINT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    special_instructions TEXT,
    estimated_delivery_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT,
    menu_item_id BIGINT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_images TEXT, -- JSON array of image URLs
    is_verified_purchase BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Order status history table
CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Delivery earnings table
CREATE TABLE IF NOT EXISTS delivery_earnings (
    id BIGSERIAL PRIMARY KEY,
    delivery_partner_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    base_amount DECIMAL(10,2) NOT NULL,
    distance_amount DECIMAL(10,2) DEFAULT 0.00,
    incentive_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    distance_km DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_partner_id) REFERENCES delivery_partners(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    amount_paid DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_restaurants_name ON restaurants(name);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON restaurants(average_rating);
CREATE INDEX IF NOT EXISTS idx_restaurants_verified ON restaurants(is_verified, is_active);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_menu_item ON reviews(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_delivery_partners_status ON delivery_partners(status);
CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);

-- Insert some sample data for testing
-- Sample users
INSERT INTO users (name, email, password, role, phone_number) VALUES
('John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye0NOLuLO5kYzH9zWJIRjQkVZFh2jI/XX', 'USER', '+1234567890'),
('Pizza Palace Owner', 'owner@pizzapalace.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye0NOLuLO5kYzH9zWJIRjQkVZFh2jI/XX', 'RESTAURANT', '+1234567891'),
('Delivery Rider', 'rider@delivery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye0NOLuLO5kYzH9zWJIRjQkVZFh2jI/XX', 'DELIVERY_PARTNER', '+1234567892'),
('Admin User', 'admin@zomato.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye0NOLuLO5kYzH9zWJIRjQkVZFh2jI/XX', 'ADMIN', '+1234567893');

-- Sample restaurants
INSERT INTO restaurants (name, description, address, phone_number, email, cuisine_type, delivery_time_minutes, minimum_order_amount, delivery_fee, cost_for_two, owner_id) VALUES
('Pizza Palace', 'Authentic Italian pizza with fresh ingredients', '123 Main St, Downtown', '+1234567891', 'contact@pizzapalace.com', 'Italian, Pizza', 30, 15.00, 3.00, 25.00, 2),
('Burger Bistro', 'Gourmet burgers and fries', '456 Oak Ave, Midtown', '+1234567894', 'info@burgerbistro.com', 'American, Fast Food', 25, 12.00, 2.50, 20.00, 2);

-- Sample menu categories
INSERT INTO menu_categories (name, restaurant_id, display_order) VALUES
('Pizza', 1, 1),
('Pasta', 1, 2),
('Burgers', 2, 1),
('Sides', 2, 2);

-- Sample menu items
INSERT INTO menu_items (name, description, price, is_vegetarian, restaurant_id, category_id) VALUES
('Margherita Pizza', 'Classic cheese pizza with tomato sauce', 12.99, true, 1, 1),
('Pepperoni Pizza', 'Pizza with pepperoni and cheese', 15.99, false, 1, 1),
('Spaghetti Carbonara', 'Pasta with bacon, eggs, and cheese', 14.99, false, 1, 2),
('Classic Burger', 'Beef burger with lettuce, tomato, and pickles', 11.99, false, 2, 3),
('Veggie Burger', 'Plant-based burger with fresh vegetables', 10.99, true, 2, 3),
('French Fries', 'Crispy golden fries', 4.99, true, 2, 4);

-- Sample addresses
INSERT INTO addresses (label, address, city, state, pincode, user_id, is_default) VALUES
('Home', '123 Main St, Downtown', 'New York', 'NY', '10001', 1, true),
('Work', '456 Office Building, Business District', 'New York', 'NY', '10002', 1, false);

-- Sample delivery partner
INSERT INTO delivery_partners (name, email, password, phone_number, vehicle_type, status) VALUES
('Mike Johnson', 'rider@delivery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye0NOLuLO5kYzH9zWJIRjQkVZFh2jI/XX', '+1234567892', 'Motorcycle', 'AVAILABLE');
