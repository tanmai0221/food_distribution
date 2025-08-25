import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Clock, CheckCircle, TrendingUp, Users, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DonorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Donations', value: '24', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'People Served', value: '156', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Food Saved (kg)', value: '89', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const recentDonations = [
    {
      id: '1',
      foodType: 'Fresh Vegetables',
      quantity: '15 kg',
      status: 'delivered',
      claimedBy: 'Hope Foundation',
      date: '2025-01-01',
      rating: 5
    },
    {
      id: '2',
      foodType: 'Cooked Rice & Curry',
      quantity: '25 portions',
      status: 'picked_up',
      claimedBy: 'Community Kitchen',
      date: '2025-01-02',
      rating: 4
    },
    {
      id: '3',
      foodType: 'Bread & Pastries',
      quantity: '30 items',
      status: 'claimed',
      claimedBy: 'Street Angels',
      date: '2025-01-03',
      rating: null
    },
    {
      id: '4',
      foodType: 'Fruit Platter',
      quantity: '8 kg',
      status: 'available',
      claimedBy: null,
      date: '2025-01-03',
      rating: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'claimed': return 'bg-yellow-100 text-yellow-800';
      case 'picked_up': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'claimed': return 'Claimed';
      case 'picked_up': return 'Picked Up';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Track your donations and make a difference in your community.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/post-food"
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <Plus className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Post New Donation</h3>
              <p className="text-green-100">Share your surplus food with those in need</p>
            </div>
          </div>
        </Link>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <Clock className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Active Donations</h3>
              <p className="text-blue-100">3 donations waiting for pickup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className={`${stat.bg} p-3 rounded-lg mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Donations</h2>
            <Link to="/profile" className="text-green-600 hover:text-green-700 font-medium text-sm">
              View All
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{donation.foodType}</h3>
                  <p className="text-gray-600 text-sm mt-1">Quantity: {donation.quantity}</p>
                  {donation.claimedBy && (
                    <p className="text-gray-600 text-sm">Claimed by: {donation.claimedBy}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                      {getStatusText(donation.status)}
                    </span>
                    <p className="text-gray-500 text-sm mt-1">{new Date(donation.date).toLocaleDateString()}</p>
                  </div>
                  
                  {donation.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{donation.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Impact This Month</h3>
            <p className="text-gray-600 mt-1">
              You've helped serve <span className="font-bold text-green-600">156 people</span> and saved <span className="font-bold text-green-600">89 kg</span> of food from going to waste. Thank you for making a difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;