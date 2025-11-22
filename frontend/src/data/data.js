// Zomato Clone Dataset (Restaurants, Food Items, Offers, Delivery Agents)
// Images from Unsplash with crop params for performance

export const CUISINES = [
  'Indian',
  'Chinese',
  'Italian',
  'Desserts',
  'Beverages',
  'Street Food',
  'Fast Food',
  'Mexican',
  'Japanese'
]

export const RESTAURANTS = [
  // Indian Restaurants
  { id: 1, name: 'Biryani House', cuisine: 'Indian', location: 'Connaught Place, New Delhi', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop&auto=format', rating: 4.5, deliveryTime: '25-30 min', costForTwo: '₹400 for two', isEcoFriendly: true, offer: 'Flat 20% OFF' },
  { id: 5, name: 'Tandoori Treats', cuisine: 'Indian', location: 'Dwarka, New Delhi', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=600&fit=crop&auto=format', rating: 4.2, deliveryTime: '30-35 min', costForTwo: '₹600 for two', isEcoFriendly: true },
  { id: 11, name: 'Veggie Delight', cuisine: 'Indian', location: 'South Extension, New Delhi', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&auto=format', rating: 4.3, deliveryTime: '20-30 min', costForTwo: '₹300 for two' },
  { id: 16, name: 'Curry Palace', cuisine: 'Indian', location: 'Janakpuri, New Delhi', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop&auto=format', rating: 4.4, deliveryTime: '25-30 min', costForTwo: '₹500 for two' },
  { id: 21, name: 'Masala Kitchen', cuisine: 'Indian', location: 'Khan Market, New Delhi', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&auto=format', rating: 4.6, deliveryTime: '25-35 min', costForTwo: '₹600 for two' },
  
  // Italian Restaurants
  { id: 2, name: 'Pizza Mania', cuisine: 'Italian', location: 'Saket, New Delhi', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&auto=format', rating: 4.4, deliveryTime: '20-25 min', costForTwo: '₹500 for two', isEcoFriendly: true, offer: 'Buy 1 Get 1 Free' },
  { id: 9, name: 'Pasta Corner', cuisine: 'Italian', location: 'Gurugram Cyber Hub', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop&auto=format', rating: 4.4, deliveryTime: '25-30 min', costForTwo: '₹450 for two', isEcoFriendly: true },
  { id: 15, name: 'Oven Story', cuisine: 'Italian', location: 'Indirapuram, Ghaziabad', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format', rating: 4.3, deliveryTime: '20-25 min', costForTwo: '₹500 for two' },
  
  // Chinese Restaurants
  { id: 6, name: 'Dragon Wok', cuisine: 'Chinese', location: 'Lajpat Nagar, New Delhi', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop&auto=format', rating: 4.1, deliveryTime: '25-30 min', costForTwo: '₹450 for two', isEcoFriendly: false },
  { id: 13, name: 'Noodle House', cuisine: 'Chinese', location: 'Vasant Kunj, New Delhi', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop&auto=format', rating: 4.1, deliveryTime: '25-30 min', costForTwo: '₹400 for two' },
  { id: 20, name: 'Dim Sum Place', cuisine: 'Chinese', location: 'Pitampura, New Delhi', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=600&fit=crop&auto=format', rating: 4.2, deliveryTime: '25-30 min', costForTwo: '₹450 for two' },
  
  // Japanese Restaurants
  { id: 7, name: 'Sushi Master', cuisine: 'Japanese', location: 'Hauz Khas, New Delhi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop&auto=format', rating: 4.6, deliveryTime: '35-40 min', costForTwo: '₹800 for two', isEcoFriendly: false },
  { id: 17, name: 'Ramen Shop', cuisine: 'Japanese', location: 'Gurugram Sector 29', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&h=600&fit=crop&auto=format', rating: 4.5, deliveryTime: '35-40 min', costForTwo: '₹700 for two' },
  
  // Mexican Restaurants
  { id: 8, name: 'Taco Fiesta', cuisine: 'Mexican', location: 'Noida Sector 18', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop&auto=format', rating: 4.2, deliveryTime: '20-25 min', costForTwo: '₹350 for two', isEcoFriendly: false },
  { id: 18, name: 'Burrito Bar', cuisine: 'Mexican', location: 'Noida Sector 62', image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&h=600&fit=crop&auto=format', rating: 4.1, deliveryTime: '20-25 min', costForTwo: '₹350 for two' },
  
  // Fast Food Restaurants
  { id: 4, name: 'Burger Hub', cuisine: 'Fast Food', location: 'Rajouri Garden, New Delhi', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop&auto=format', rating: 4.3, deliveryTime: '20-25 min', costForTwo: '₹350 for two', isEcoFriendly: false, offer: 'Free Fries with Large Burger' },
  { id: 14, name: 'Grill & Chill', cuisine: 'Fast Food', location: 'Rohini, New Delhi', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop&auto=format', rating: 4.2, deliveryTime: '20-30 min', costForTwo: '₹350 for two' },
  
  // Desserts
  { id: 3, name: 'Sweet Cravings', cuisine: 'Desserts', location: 'Karol Bagh, New Delhi', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&auto=format', rating: 4.6, deliveryTime: '20-30 min', costForTwo: '₹300 for two', isEcoFriendly: false, offer: '30% OFF on desserts' },
  
  // Beverages
  { id: 12, name: 'The Coffee Lounge', cuisine: 'Beverages', location: 'CP, New Delhi', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop&auto=format', rating: 4.5, deliveryTime: '15-20 min', costForTwo: '₹250 for two' },
  { id: 19, name: 'Corner Cafe', cuisine: 'Beverages', location: 'Malviya Nagar, New Delhi', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop&auto=format', rating: 4.4, deliveryTime: '15-20 min', costForTwo: '₹300 for two' },
  
  // Street Food
  { id: 10, name: 'Chaat Street', cuisine: 'Street Food', location: 'Chandni Chowk, Delhi', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&auto=format', rating: 4.0, deliveryTime: '15-20 min', costForTwo: '₹200 for two', isEcoFriendly: true }
]

export const FOOD_ITEMS = [
  // Indian
  { id: 1001, name: 'Hyderabadi Biryani', description: 'Aromatic basmati rice with spices', price: 249, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 1, isVegetarian: false },
  { id: 1002, name: 'Paneer Tikka', description: 'Smoky grilled paneer with spices', price: 199, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 5, isVegetarian: true },
  { id: 1003, name: 'Butter Chicken', description: 'Creamy tomato gravy with chicken', price: 279, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 16, isVegetarian: false },
  { id: 1004, name: 'Masala Dosa', description: 'Crispy dosa with spiced potatoes', price: 159, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 11, isVegetarian: true },
  { id: 1005, name: 'Dal Makhani', description: 'Slow cooked black lentils', price: 219, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 21, isVegetarian: true },
  { id: 1006, name: 'Chicken Tikka', description: 'Marinated grilled chicken', price: 259, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&auto=format', category: 'Indian', restaurantId: 5, isVegetarian: false },

  // Chinese
  { id: 2001, name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with veggies', price: 179, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop&auto=format', category: 'Chinese', restaurantId: 6, isVegetarian: true },
  { id: 2002, name: 'Chicken Momos', description: 'Steamed dumplings with chicken', price: 149, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop&auto=format', category: 'Chinese', restaurantId: 20, isVegetarian: false },
  { id: 2003, name: 'Chilli Paneer', description: 'Cottage cheese tossed in chilli sauce', price: 199, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&auto=format', category: 'Chinese', restaurantId: 13, isVegetarian: true },
  { id: 2004, name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken', price: 289, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&auto=format', category: 'Chinese', restaurantId: 6, isVegetarian: false },

  // Italian
  { id: 3001, name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil', price: 299, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 2, isVegetarian: true },
  { id: 3002, name: 'Pepperoni Pizza', description: 'Cheesy pizza with pepperoni', price: 399, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 2, isVegetarian: false },
  { id: 3003, name: 'Pasta Alfredo', description: 'Creamy white sauce pasta', price: 279, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 9, isVegetarian: true },
  { id: 3004, name: 'Pasta Arrabbiata', description: 'Spicy red sauce pasta', price: 259, image: 'https://images.unsplash.com/photo-1551892374-ecf889568ee8?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 15, isVegetarian: true },
  { id: 3005, name: 'Four Cheese Pizza', description: 'Mozzarella, cheddar, parmesan, gorgonzola', price: 449, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 15, isVegetarian: true },
  { id: 3006, name: 'Farmhouse Pizza', description: 'Veggies loaded farmhouse', price: 349, image: 'https://images.unsplash.com/photo-1571407974884-0e6a2d20b4d8?w=400&h=300&fit=crop&auto=format', category: 'Italian', restaurantId: 2, isVegetarian: true },

  // Desserts
  { id: 4001, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake', price: 149, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format', category: 'Desserts', restaurantId: 3, isVegetarian: true },
  { id: 4002, name: 'Gulab Jamun', description: 'Soft fried dumplings in syrup', price: 99, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format', category: 'Desserts', restaurantId: 3, isVegetarian: true },
  { id: 4003, name: 'Tiramisu', description: 'Italian coffee-flavoured dessert', price: 179, image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop&auto=format', category: 'Desserts', restaurantId: 3, isVegetarian: true },
  { id: 4004, name: 'Ice Cream Sundae', description: 'Vanilla, nuts, and chocolate', price: 129, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&auto=format', category: 'Desserts', restaurantId: 3, isVegetarian: true },

  // Beverages
  { id: 5001, name: 'Cold Coffee', description: 'Iced coffee with cream', price: 129, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&auto=format', category: 'Beverages', restaurantId: 12, isVegetarian: true },
  { id: 5002, name: 'Fresh Lime Soda', description: 'Refreshing lemon soda', price: 79, image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop&auto=format', category: 'Beverages', restaurantId: 19, isVegetarian: true },
  { id: 5003, name: 'Bubble Tea', description: 'Chewy boba with milk tea', price: 149, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format', category: 'Beverages', restaurantId: 12, isVegetarian: true },
  { id: 5004, name: 'Mango Smoothie', description: 'Fresh mango and yogurt', price: 139, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&auto=format', category: 'Beverages', restaurantId: 12, isVegetarian: true },

  // Street Food
  { id: 6001, name: 'Pani Puri', description: 'Crispy puris with spicy water', price: 79, image: 'https://images.unsplash.com/photo-1625944525960-68e6ef555a5b?w=400&h=300&fit=crop&auto=format', category: 'Street Food', restaurantId: 10, isVegetarian: true },
  { id: 6002, name: 'Aloo Tikki', description: 'Spiced potato patties', price: 89, image: 'https://images.unsplash.com/photo-1625944525960-68e6ef555a5b?w=400&h=300&fit=crop&auto=format', category: 'Street Food', restaurantId: 10, isVegetarian: true },
  { id: 6003, name: 'Vada Pav', description: 'Mumbai style vada pav', price: 79, image: 'https://images.unsplash.com/photo-1625944525960-68e6ef555a5b?w=400&h=300&fit=crop&auto=format', category: 'Street Food', restaurantId: 10, isVegetarian: true },

  // Fast Food
  { id: 7001, name: 'Classic Burger', description: 'Chicken patty with cheese', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format', category: 'Fast Food', restaurantId: 4, isVegetarian: false },
  { id: 7002, name: 'Veggie Burger', description: 'Crispy veg patty with sauces', price: 169, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format', category: 'Fast Food', restaurantId: 4, isVegetarian: true },
  { id: 7003, name: 'Chicken Nuggets', description: 'Crispy chicken bites', price: 159, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&auto=format', category: 'Fast Food', restaurantId: 14, isVegetarian: false },
  { id: 7004, name: 'French Fries', description: 'Crispy golden fries', price: 99, image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=300&fit=crop&auto=format', category: 'Fast Food', restaurantId: 4, isVegetarian: true },

  // Mexican
  { id: 8001, name: 'Chicken Tacos', description: 'Soft tacos with chicken', price: 229, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&auto=format', category: 'Mexican', restaurantId: 8, isVegetarian: false },
  { id: 8002, name: 'Veg Burrito', description: 'Loaded veg burrito', price: 199, image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&auto=format', category: 'Mexican', restaurantId: 18, isVegetarian: true },
  { id: 8003, name: 'Loaded Nachos', description: 'Cheese, beans, salsa', price: 199, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&auto=format', category: 'Mexican', restaurantId: 8, isVegetarian: true },

  // Japanese
  { id: 9001, name: 'Sushi Platter', description: 'Assorted sushi rolls', price: 499, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop&auto=format', category: 'Japanese', restaurantId: 7, isVegetarian: false },
  { id: 9002, name: 'Chicken Ramen', description: 'Chicken broth with noodles', price: 349, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format', category: 'Japanese', restaurantId: 17, isVegetarian: false },
  { id: 9003, name: 'Veg Sushi Roll', description: 'Avocado and cucumber roll', price: 299, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format', category: 'Japanese', restaurantId: 7, isVegetarian: true },
]

export const OFFERS = [
  { 
    id: 1, 
    title: 'Weekend Special', 
    description: '50% OFF on all orders above ₹299. Valid on weekends only!', 
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&h=400&fit=crop&auto=format', 
    discount: '50% OFF', 
    validUntil: '2025-12-31', 
    minOrder: '₹299',
    code: 'WEEKEND50',
    maxDiscount: '₹150',
    terms: 'Valid on Saturdays and Sundays only. Cannot be combined with other offers.',
    isNew: false
  },
  { 
    id: 2, 
    title: 'New User Offer', 
    description: '₹200 OFF on your first order. Welcome to Zomato!', 
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop&auto=format', 
    discount: '₹200 OFF', 
    validUntil: '2025-12-31', 
    minOrder: '₹0',
    code: 'NEWUSER200',
    maxDiscount: '₹200',
    terms: 'Valid for new users only. One time use per account.',
    isNew: true
  },
  { 
    id: 3, 
    title: 'Happy Hours', 
    description: '20% OFF from 4-7 PM daily on all food orders', 
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=400&fit=crop&auto=format', 
    discount: '20% OFF', 
    validUntil: '2025-12-31', 
    minOrder: '₹199',
    code: 'HAPPY20',
    maxDiscount: '₹100',
    terms: 'Valid between 4 PM to 7 PM only. Applicable on all restaurants.',
    isNew: false
  },
  { 
    id: 4, 
    title: 'Pizza Mania', 
    description: 'Buy 1 Get 1 Free on all pizzas from selected restaurants', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop&auto=format', 
    discount: 'BOGO', 
    validUntil: '2025-12-31', 
    minOrder: '₹399',
    code: 'PIZZABOGO',
    terms: 'Applicable on pizzas only. Lower priced pizza will be free.',
    isNew: false
  },
  { 
    id: 5, 
    title: 'Dessert Delight', 
    description: '30% OFF on all desserts. Satisfy your sweet cravings!', 
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=400&fit=crop&auto=format', 
    discount: '30% OFF', 
    validUntil: '2025-12-31', 
    minOrder: '₹149',
    code: 'SWEET30',
    maxDiscount: '₹80',
    terms: 'Valid on desserts category only. Check participating restaurants.',
    isNew: true
  },
  { 
    id: 6, 
    title: 'Midnight Munchies', 
    description: '15% OFF on orders after 10 PM. Late night hunger sorted!', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop&auto=format', 
    discount: '15% OFF', 
    validUntil: '2025-12-31', 
    minOrder: '₹249',
    code: 'NIGHT15',
    maxDiscount: '₹75',
    terms: 'Valid after 10 PM only. Limited restaurants available.',
    isNew: false
  }
]

export const DELIVERY_AGENTS = [
  { id: 1, name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' },
  { id: 2, name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  { id: 3, name: 'Amit Singh', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face' }
]

export const getMenuByRestaurantId = (restaurantId) => FOOD_ITEMS.filter(i => i.restaurantId === restaurantId)
export const searchRestaurants = (q) => RESTAURANTS.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))
export const searchFoods = (q) => FOOD_ITEMS.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
