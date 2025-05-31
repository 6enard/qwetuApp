import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Truck, CreditCard } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, categories } from '../data/products';
import Cookie from '../components/Cookie';
import Coffee from '../components/Coffee';
import SprayCan from '../components/SprayCan';
import Pencil from '../components/Pencil';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 to-orange-500 text-white py-16" >
        <div className="container mx-auto px-4" >
          <div className="max-w-3xl mx-auto text-center" >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Everyday Supplies Delivered to Your Door
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Get all your essentials delivered directly to your hostel room in minutes.
            </p>
            <Link
              to="/products"
              className="btn bg-white text-blue-700 hover:text-orange-600 hover:bg-fuchsia-200 px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-all hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 ">
            Why Choose QWETUHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                From snacks to toiletries, we've got all your hostel needs covered.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Get your items delivered to your room in minutes, not hours.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
              <p className="text-gray-600">
                Pay with Safaricom M-Pesa STK push for secure and convenient transactions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Room Delivery</h3>
              <p className="text-gray-600">
                No need to leave your room - we'll bring everything right to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Browse By Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Use the category icons defined in CategoryFilter component */}
                  <span className="text-orange-600">
                    {category.icon === 'shopping-basket' && <ShoppingBag size={24} />}
                    {category.icon === 'cookie' && <Cookie size={24} />}
                    {category.icon === 'coffee' && <Coffee size={24} />}
                    {category.icon === 'spray-can' && <SprayCan size={24} />}
                    {category.icon === 'pencil' && <Pencil size={24} />}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to make hostel life easier?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Start ordering your essentials today and experience the convenience of room delivery.
          </p>
          <Link
            to="/products"
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;