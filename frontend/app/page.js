import Link from 'next/link';
import { FaUtensils, FaCoffee, FaSearch, FaPhone } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Boku Grand Hotel
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Welcome to Our Digital Menu
          </p>
          <p className="text-lg max-w-2xl mb-8">
            Scan the QR code on your table to explore our delicious offerings
          </p>
          <Link
            href="/menu"
            className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition duration-300 text-lg"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaUtensils className="text-4xl text-amber-600" />}
            title="Delicious Food"
            description="Prepared with fresh ingredients by our expert chefs"
          />
          <FeatureCard
            icon={<FaCoffee className="text-4xl text-amber-600" />}
            title="Beverages"
            description="Wide selection of drinks to complement your meal"
          />
          <FeatureCard
            icon={<FaSearch className="text-4xl text-amber-600" />}
            title="Easy Search"
            description="Quickly find your favorite dishes"
          />
          <FeatureCard
            icon={<FaPhone className="text-4xl text-amber-600" />}
            title="Contact Us"
            description="Reach out to us anytime for assistance"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}