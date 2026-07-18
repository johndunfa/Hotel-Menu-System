// add-sample-data.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Food = require('./models/Food');

dotenv.config();

const sampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Breakfast', description: 'Start your day with our delicious breakfast', isActive: true },
      { name: 'Lunch', description: 'Hearty lunch options', isActive: true },
      { name: 'Dinner', description: 'Fine dining dinner selections', isActive: true },
      { name: 'Drinks', description: 'Refreshing beverages', isActive: true },
      { name: 'Traditional Food', description: 'Ethiopian traditional dishes', isActive: true },
      { name: 'Dessert', description: 'Sweet treats', isActive: true },
    ]);
    console.log('Categories created');

    // Get category IDs
    const breakfast = categories.find(c => c.name === 'Breakfast');
    const lunch = categories.find(c => c.name === 'Lunch');
    const dinner = categories.find(c => c.name === 'Dinner');
    const drinks = categories.find(c => c.name === 'Drinks');
    const traditional = categories.find(c => c.name === 'Traditional Food');
    const dessert = categories.find(c => c.name === 'Dessert');

    // Create foods
    const foods = await Food.insertMany([
      {
        name: 'Special Tibs',
        description: 'Tender beef sautéed with onions, peppers, and spices',
        price: 350,
        category: traditional._id,
        ingredients: ['Beef', 'Onions', 'Peppers', 'Spices', 'Butter'],
        available: true,
        preparationTime: 25,
        spicyLevel: 'Medium',
        featured: true,
      },
      {
        name: 'Doro Wat',
        description: 'Traditional Ethiopian chicken stew with boiled eggs',
        price: 400,
        category: traditional._id,
        ingredients: ['Chicken', 'Onions', 'Berbere spice', 'Eggs', 'Butter'],
        available: true,
        preparationTime: 35,
        spicyLevel: 'Hot',
        featured: true,
      },
      {
        name: 'Full Breakfast Platter',
        description: 'Eggs, sausages, bacon, toast, and coffee',
        price: 250,
        category: breakfast._id,
        ingredients: ['Eggs', 'Sausages', 'Bacon', 'Toast', 'Coffee'],
        available: true,
        preparationTime: 15,
        spicyLevel: 'Mild',
        featured: false,
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh salmon grilled to perfection with vegetables',
        price: 450,
        category: dinner._id,
        ingredients: ['Salmon', 'Olive oil', 'Herbs', 'Vegetables'],
        available: true,
        preparationTime: 20,
        spicyLevel: 'Mild',
        featured: true,
      },
      {
        name: 'Fresh Juice',
        description: 'Freshly squeezed seasonal fruit juice',
        price: 80,
        category: drinks._id,
        ingredients: ['Mixed fruits', 'Ice', 'Sugar'],
        available: true,
        preparationTime: 5,
        spicyLevel: 'Mild',
        featured: false,
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with ganache frosting',
        price: 150,
        category: dessert._id,
        ingredients: ['Flour', 'Chocolate', 'Eggs', 'Butter', 'Sugar'],
        available: true,
        preparationTime: 10,
        spicyLevel: 'Mild',
        featured: false,
      },
    ]);
    console.log('Food items created');

    console.log('✅ Sample data added successfully!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

sampleData();