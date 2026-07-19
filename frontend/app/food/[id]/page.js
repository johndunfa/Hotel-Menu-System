'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../../services/api';
import { FaArrowLeft, FaClock, FaFire, FaCheckCircle } from 'react-icons/fa';

export default function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      const response = await api.get(`/foods/${id}`);
      setFood(response.data.data);
    } catch (error) {
      console.error('Error fetching food:', error);
      setError('Food not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Food not found'}
        </div>
        <Link href="/menu" className="mt-4 inline-block text-amber-600 hover:text-amber-700">
          ← Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/menu" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Menu
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200">
            {food.image ? (
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
              {food.available ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <FaCheckCircle className="mr-1" /> Available
                </span>
              ) : (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Unavailable
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-4">{food.description}</p>

            <div className="text-3xl font-bold text-amber-600 mb-4">
              ${food.price?.toFixed(2) || '0.00'}
            </div>

            <div className="space-y-2 mb-6">
              {food.preparationTime && (
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Preparation Time: {food.preparationTime} minutes</span>
                </div>
              )}
              {food.spicyLevel && (
                <div className="flex items-center text-gray-600">
                  <FaFire className="mr-2" />
                  <span>Spicy Level: {food.spicyLevel}</span>
                </div>
              )}
              {food.category && (
                <div className="text-gray-600">
                  Category: <span className="font-semibold">{food.category.name}</span>
                </div>
              )}
            </div>

            {food.ingredients && food.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}