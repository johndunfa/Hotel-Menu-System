'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import { FaUtensils, FaTags, FaPlus, FaChartBar } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ foods: 0, categories: 0 });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-amber-600">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FaUtensils className="text-3xl text-blue-500" />}
            title="Total Foods"
            value={stats.foods}
            color="bg-blue-50"
          />
          <StatCard
            icon={<FaTags className="text-3xl text-green-500" />}
            title="Categories"
            value={stats.categories}
            color="bg-green-50"
          />
          <StatCard
            icon={<FaChartBar className="text-3xl text-purple-500" />}
            title="Total Items"
            value={stats.foods + stats.categories}
            color="bg-purple-50"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            icon={<FaPlus />}
            title="Add New Food"
            description="Add a new food item to the menu"
            link="/admin/foods/add"
            color="bg-amber-500"
          />
          <ActionCard
            icon={<FaUtensils />}
            title="Manage Foods"
            description="View, edit, or delete food items"
            link="/admin/foods"
            color="bg-blue-500"
          />
          <ActionCard
            icon={<FaTags />}
            title="Manage Categories"
            description="Add or manage food categories"
            link="/admin/categories"
            color="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function ActionCard({ icon, title, description, link, color }) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
        <div className={`${color} text-white w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}