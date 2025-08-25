import React, { useState } from 'react';
import { Search, MapPin, Clock, Package, Users, Star, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NGODashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stats = [
    { label: 'Food Claimed', value: '18', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'People Served', value: '142', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg. Rating', value: '4.9', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Active Claims', value: '3', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const availableFood = [
    {
      id: '1',
      donor: 'Green Garden Restaurant',
      foodType: 'Fresh Vegetables & Salads',
      quantity: '20 kg',
      expiryTime: '2025-01-03 18:00',
      distance: '1.2 km',
      address: '123 Main St, Downtown',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '2 hours ago',
      rating: 4.8
    },
    {
      id: '2',
      donor: 'Wedding Event Hall',
      foodType: 'Cooked Meals (Indian)',
      quantity: '50 portions',
      expiryTime: '2025-01-03 20:00',
      distance: '0.8 km',
      address: '456 Oak Ave, City Center',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '30 minutes ago',
      rating: 4.9
    },
    {
      id: '3',
      donor: 'Smith Family',
      foodType: 'Homemade Sandwiches',
      quantity: '15 pieces',
      expiryTime: '2025-01-03 22:00',
      distance: '2.1 km',
      address: '789 Elm St, Suburbs',
      image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '1 hour ago',
      rating: 4.7
    },
    {
      id: '4',
      donor: 'Corner Bakery',
      foodType: 'Fresh Bread & Pastries',
      quantity: '25 items',
      expiryTime: '2025-01-04 08:00',
      distance: '1.5 km',
      address: '321 Pine St, Market District',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '45 minutes ago',
      rating: 4.6
    }
  ];

  const myPickups = [
    {
      id: '1',
      donor: 'Metro Restaurant',
      foodType: 'Cooked Rice & Curry',
      quantity: '30 portions',
      status: 'ready_for_pickup',
      pickupTime: '2025-01-03 17:30',
      address: '567 Broadway, Downtown'
    },
    {
      id: '2',
      donor: 'Conference Center',
      foodType: 'Snacks & Beverages',
      quantity: '40 items',
      status: 'picked_up',
      pickupTime: '2025-01-03 14:00',
      address: '890 Conference Dr, Business District'
    }
  ];

  const getTimeRemaining = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diffMs = expiry.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m left`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m left`;
    } else {
      return 'Expired';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_pickup': return 'bg-green-100 text-green-800';
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFood = availableFood.filter(food => {
    const matchesSearch = food.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.donor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'nearby') return matchesSearch && parseFloat(food.distance) <= 2;
    if (selectedFilter === 'urgent') {
      const now = new Date();
      const expiry = new Date(food.expiryTime);
      const hoursLeft = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
      return matchesSearch && hoursLeft <= 4;
    }
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, {user?.organization || user?.name}!</h1>
        <p className="text-gray-600 mt-2">Find and claim food donations to help serve your community.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Food Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Food Donations</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search food or donor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Food</option>
                    <option value="nearby">Nearby (&lt; 2km)</option>
                    <option value="urgent">Urgent (&lt; 4hrs)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {filteredFood.map((food) => (
                <div key={food.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={food.image}
                      alt={food.foodType}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{food.foodType}</h3>
                          <p className="text-sm text-gray-600">{food.donor}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{food.distance} away</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{food.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Qty: {food.quantity}</span>
                          <span>•</span>
                          <span className="text-orange-600 font-medium">
                            {getTimeRemaining(food.expiryTime)}
                          </span>
                        </div>
                        
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Claim Food
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Pickups Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">My Pickups</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {myPickups.map((pickup) => (
                <div key={pickup.id} className="p-6">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900">{pickup.foodType}</h3>
                    <p className="text-sm text-gray-600">{pickup.donor}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      <span>{pickup.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{new Date(pickup.pickupTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-xs">{pickup.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                      {pickup.status === 'ready_for_pickup' ? 'Ready for Pickup' : 'Picked Up'}
                    </span>
                    
                    {pickup.status === 'ready_for_pickup' && (
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">This Week's Impact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Claimed <span className="font-bold text-green-600">5 donations</span></p>
              <p>• Served <span className="font-bold text-green-600">78 people</span></p>
              <p>• Saved <span className="font-bold text-green-600">45 kg</span> of food</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;