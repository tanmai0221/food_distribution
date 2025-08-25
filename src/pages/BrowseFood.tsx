import React, { useState } from 'react';
import { Search, MapPin, Clock, Package, Star, Filter, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BrowseFood = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const availableFood = [
    {
      id: '1',
      donor: 'Green Garden Restaurant',
      donorType: 'Restaurant',
      foodType: 'Mixed Vegetables & Salads',
      category: 'cooked',
      quantity: '20 kg',
      description: 'Fresh mixed vegetables curry, garden salad, and steamed rice. Prepared this afternoon with organic ingredients.',
      expiryTime: '2025-01-03 18:00',
      distance: 1.2,
      address: '123 Main St, Downtown',
      contactPhone: '+1 (555) 123-4567',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '2 hours ago',
      rating: 4.8,
      pickupInstructions: 'Please ring the back entrance doorbell. Ask for Sarah.',
      dietaryInfo: {
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        nutFree: true,
        halal: false,
        kosher: false
      }
    },
    {
      id: '2',
      donor: 'Wedding Event Hall',
      donorType: 'Event',
      foodType: 'Indian Wedding Feast',
      category: 'cooked',
      quantity: '50 portions',
      description: 'Complete Indian wedding meal including biryani, dal, paneer curry, naan, and desserts. High quality catering food.',
      expiryTime: '2025-01-03 20:00',
      distance: 0.8,
      address: '456 Oak Ave, City Center',
      contactPhone: '+1 (555) 987-6543',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '30 minutes ago',
      rating: 4.9,
      pickupInstructions: 'Use main entrance. Contact event coordinator.',
      dietaryInfo: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        nutFree: false,
        halal: true,
        kosher: false
      }
    },
    {
      id: '3',
      donor: 'Smith Family',
      donorType: 'Individual',
      foodType: 'Homemade Sandwiches & Snacks',
      category: 'packaged',
      quantity: '15 pieces',
      description: 'Freshly made sandwiches, cookies, and fruit juice boxes. Perfect for lunch distribution.',
      expiryTime: '2025-01-03 22:00',
      distance: 2.1,
      address: '789 Elm St, Suburbs',
      contactPhone: '+1 (555) 456-7890',
      image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '1 hour ago',
      rating: 4.7,
      pickupInstructions: 'Knock on front door. We have kids, so please be gentle.',
      dietaryInfo: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        nutFree: false,
        halal: false,
        kosher: false
      }
    },
    {
      id: '4',
      donor: 'Corner Bakery',
      donorType: 'Business',
      foodType: 'Fresh Bread & Pastries',
      category: 'baked',
      quantity: '25 items',
      description: 'End of day fresh bread, croissants, muffins, and pastries. All baked this morning.',
      expiryTime: '2025-01-04 08:00',
      distance: 1.5,
      address: '321 Pine St, Market District',
      contactPhone: '+1 (555) 321-9876',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      postedTime: '45 minutes ago',
      rating: 4.6,
      pickupInstructions: 'Come to front counter. Ask for the manager.',
      dietaryInfo: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        nutFree: false,
        halal: false,
        kosher: false
      }
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

  const getUrgencyColor = (expiryTime: string) => {
    const now = new Date();
    const expiry = new Date(expiryTime);
    const hoursLeft = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursLeft <= 2) return 'text-red-600 bg-red-50';
    if (hoursLeft <= 4) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const filteredFood = availableFood.filter(food => {
    const matchesSearch = food.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.donor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'nearby') return matchesSearch && food.distance <= 2;
    if (selectedFilter === 'urgent') {
      const now = new Date();
      const expiry = new Date(food.expiryTime);
      const hoursLeft = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
      return matchesSearch && hoursLeft <= 4;
    }
    if (selectedFilter === 'vegetarian') return matchesSearch && food.dietaryInfo.vegetarian;
    
    return matchesSearch;
  });

  const sortedFood = [...filteredFood].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'time') {
      const timeA = new Date(a.expiryTime).getTime();
      const timeB = new Date(b.expiryTime).getTime();
      return timeA - timeB;
    }
    if (sortBy === 'quantity') return parseInt(b.quantity) - parseInt(a.quantity);
    return 0;
  });

  const handleClaimFood = (foodId: string) => {
    setSelectedFood(foodId);
    // In a real app, this would open a confirmation modal
    setTimeout(() => {
      alert('Food claimed successfully! You will receive pickup details shortly.');
      setSelectedFood(null);
    }, 1000);
  };

  const getDietaryTags = (dietaryInfo: any) => {
    return Object.entries(dietaryInfo)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        const labels: { [key: string]: string } = {
          vegetarian: 'Vegetarian',
          vegan: 'Vegan',
          glutenFree: 'Gluten Free',
          nutFree: 'Nut Free',
          halal: 'Halal',
          kosher: 'Kosher'
        };
        return labels[key];
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Available Food</h1>
        <p className="text-gray-600 mt-2">Find and claim food donations in your area to help serve your community.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food or donor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Food</option>
                <option value="nearby">Nearby (&lt; 2km)</option>
                <option value="urgent">Urgent (&lt; 4hrs)</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="distance">Sort by Distance</option>
              <option value="time">Sort by Expiry Time</option>
              <option value="quantity">Sort by Quantity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{sortedFood.length}</span> available food donations
        </p>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedFood.map((food) => (
          <div key={food.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="flex">
              <img
                src={food.image}
                alt={food.foodType}
                className="w-32 h-32 object-cover"
              />
              
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{food.foodType}</h3>
                    <p className="text-sm text-gray-600">{food.donor} • {food.donorType}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{food.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{food.description}</p>

                {/* Dietary Tags */}
                {getDietaryTags(food.dietaryInfo).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {getDietaryTags(food.dietaryInfo).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    <span>Quantity: {food.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{food.distance} km away</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(food.expiryTime)}`}>
                      {getTimeRemaining(food.expiryTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Posted {food.postedTime}</span>
                  </div>
                  
                  <button
                    onClick={() => handleClaimFood(food.id)}
                    disabled={selectedFood === food.id}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selectedFood === food.id ? 'Claiming...' : 'Claim Food'}
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Pickup Address</p>
                      <p className="text-gray-600">{food.address}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p className="text-gray-600">{food.contactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {food.pickupInstructions && (
                <div className="mt-4 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-1 text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900">Pickup Instructions</p>
                    <p className="text-gray-600">{food.pickupInstructions}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedFood.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No food donations found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later for new donations.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseFood;