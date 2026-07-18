// add-sample.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Food = require('./models/Food');

dotenv.config();

const sampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Food.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { 
        name: 'Breakfast', 
        description: 'Start your day with our delicious breakfast options',
        isActive: true 
      },
      { 
        name: 'Lunch', 
        description: 'Hearty lunch meals for a productive day',
        isActive: true 
      },
      { 
        name: 'Dinner', 
        description: 'Fine dining dinner selections',
        isActive: true 
      },
      { 
        name: 'Drinks', 
        description: 'Refreshing beverages to complement your meal',
        isActive: true 
      },
      { 
        name: 'Traditional Food', 
        description: 'Authentic Ethiopian traditional dishes',
        isActive: true 
      },
      { 
        name: 'Dessert', 
        description: 'Sweet treats to end your meal',
        isActive: true 
      },
      { 
        name: 'Juice', 
        description: 'Freshly squeezed natural juices',
        isActive: true 
      },
      { 
        name: 'Coffee', 
        description: 'Premium Ethiopian coffee selections',
        isActive: true 
      },
    ]);
    console.log('✅ Categories created');

    // Get category IDs
    const breakfast = categories.find(c => c.name === 'Breakfast');
    const lunch = categories.find(c => c.name === 'Lunch');
    const dinner = categories.find(c => c.name === 'Dinner');
    const drinks = categories.find(c => c.name === 'Drinks');
    const traditional = categories.find(c => c.name === 'Traditional Food');
    const dessert = categories.find(c => c.name === 'Dessert');
    const juice = categories.find(c => c.name === 'Juice');
    const coffee = categories.find(c => c.name === 'Coffee');

    // Create foods
    const foods = await Food.insertMany([
      {
        name: 'Special Tibs',
        description: 'Tender beef sautéed with onions, peppers, and traditional Ethiopian spices. Served with injera.',
        price: 350,
        category: traditional._id,
        ingredients: ['Beef', 'Onions', 'Peppers', 'Spices', 'Butter', 'Injera'],
        available: true,
        preparationTime: 25,
        spicyLevel: 'Medium',
        featured: true,
        isVegan: false,
        isGlutenFree: false,
      },
      {
        name: 'Doro Wat',
        description: 'Traditional Ethiopian chicken stew with boiled eggs, berbere spice, and served with injera.',
        price: 400,
        category: traditional._id,
        ingredients: ['Chicken', 'Onions', 'Berbere spice', 'Eggs', 'Butter', 'Injera'],
        available: true,
        preparationTime: 35,
        spicyLevel: 'Hot',
        featured: true,
        isVegan: false,
        isGlutenFree: false,
      },
      {
        name: 'Full Breakfast Platter',
        description: 'Complete breakfast with eggs, sausages, bacon, toast, fresh fruit, and coffee.',
        price: 250,
        category: breakfast._id,
        ingredients: ['Eggs', 'Sausages', 'Bacon', 'Toast', 'Fruit', 'Coffee'],
        available: true,
        preparationTime: 15,
        spicyLevel: 'Mild',
        featured: false,
        isVegan: false,
        isGlutenFree: false,
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon grilled to perfection with lemon butter sauce and seasonal vegetables.',
        price: 450,
        category: dinner._id,
        ingredients: ['Salmon', 'Olive oil', 'Herbs', 'Vegetables', 'Lemon butter'],
        available: true,
        preparationTime: 20,
        spicyLevel: 'Mild',
        featured: true,
        isVegan: false,
        isGlutenFree: true,
      },
      {
        name: 'Fresh Fruit Juice',
        description: 'Freshly squeezed seasonal fruit juice - choose from mango, passion fruit, or orange.',
        price: 80,
        category: juice._id,
        ingredients: ['Mixed fruits', 'Ice', 'Sugar', 'Water'],
        available: true,
        preparationTime: 5,
        spicyLevel: 'Mild',
        featured: false,
        isVegan: true,
        isGlutenFree: true,
      },
      {
        name: 'Ethiopian Coffee',
        description: 'Traditional Ethiopian coffee ceremony style - freshly roasted and brewed.',
        price: 120,
        category: coffee._id,
        ingredients: ['Coffee beans', 'Water'],
        available: true,
        preparationTime: 15,
        spicyLevel: 'Mild',
        featured: true,
        isVegan: true,
        isGlutenFree: true,
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich and moist chocolate cake with ganache frosting and chocolate shavings.',
        price: 150,
        category: dessert._id,
        ingredients: ['Flour', 'Chocolate', 'Eggs', 'Butter', 'Sugar', 'Cocoa'],
        available: true,
        preparationTime: 10,
        spicyLevel: 'Mild',
        featured: false,
        isVegan: false,
        isGlutenFree: false,
      },
      {
        name: 'Lunch Special - Pasta',
        description: 'Penne pasta with your choice of sauce - tomato basil or creamy alfredo.',
        price: 280,
        category: lunch._id,
        ingredients: ['Pasta', 'Tomato sauce', 'Basil', 'Parmesan', 'Olive oil'],
        available: true,
        preparationTime: 20,
        spicyLevel: 'Mild',
        featured: false,
        isVegan: false,
        isGlutenFree: false,
      },
      {
        name: 'Fresh Smoothie',
        description: 'Healthy smoothie with yogurt, fresh fruits, and honey.',
        price: 90,
        category: drinks._id,
        ingredients: ['Yogurt', 'Fruits', 'Honey', 'Ice'],
        available: true,
        preparationTime: 5,
        spicyLevel: 'Mild',
        featured: false,
        isVegan: false,
        isGlutenFree: true,
      },
      {
        name: 'Kitfo',
        description: 'Minced raw beef mixed with spices and served with cottage cheese and injera.',
        price: 380,
        category: traditional._id,
        ingredients: ['Beef', 'Spices', 'Cottage cheese', 'Injera'],
        available: true,
        preparationTime: 20,
        spicyLevel: 'Hot',
        featured: true,
        isVegan: false,
        isGlutenFree: false,
      },
    ]);
    console.log('✅ Food items created');

    console.log('\n📊 Summary:');
    console.log(`   - ${categories.length} categories created`);
    console.log(`   - ${foods.length} food items created`);
    console.log('\n✨ Sample data added successfully!');
    console.log('\n🔗 Test your API:');
    console.log('   http://localhost:5000/api/categories');
    console.log('   http://localhost:5000/api/foods');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

sampleData();