'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../services/api';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError('');
      const [categoriesRes, foodsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/foods'),
      ]);
      
      setCategories(categoriesRes.data.data || []);
      setFoods(foodsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load menu. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selectedCategory
      ? food.category?._id === selectedCategory
      : true;
    const matchesSearch = food.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={fetchData}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-amber-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category._id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredFoods.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No foods found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}

function FoodCard({ food }) {
  return (
    <Link href={`/food/${food._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          {!food.available && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Unavailable
            </div>
          )}
          {food.featured && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-sm">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {food.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-amber-600">
              ${food.price?.toFixed(2) || '0.00'}
            </span>
            <span className="text-sm text-gray-500">
              {food.category?.name || 'No category'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}