import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Star, Package, Users, TrendingUp, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    organization: user?.organization || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would update the user in the backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      organization: user?.organization || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value
    });
  };

  // Mock data for user statistics
  const userStats = user?.role === 'donor' 
    ? [
        { label: 'Total Donations', value: '24', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'People Served', value: '156', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Food Saved (kg)', value: '89', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' }
      ]
    : [
        { label: 'Food Claimed', value: '18', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'People Served', value: '142', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Successful Pickups', value: '16', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Average Rating', value: '4.9', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' }
      ];

  // Mock recent activity
  const recentActivity = user?.role === 'donor'
    ? [
        {
          type: 'donation',
          title: 'Fresh Vegetables donated',
          description: 'Claimed by Hope Foundation',
          date: '2025-01-03',
          status: 'completed'
        },
        {
          type: 'donation',
          title: 'Cooked Meals posted',
          description: 'Claimed by Community Kitchen',
          date: '2025-01-02',
          status: 'picked_up'
        },
        {
          type: 'rating',
          title: 'Received 5-star rating',
          description: 'From Street Angels NGO',
          date: '2025-01-01',
          status: 'completed'
        }
      ]
    : [
        {
          type: 'pickup',
          title: 'Picked up from Green Restaurant',
          description: 'Served 25 people',
          date: '2025-01-03',
          status: 'completed'
        },
        {
          type: 'pickup',
          title: 'Claimed food from Wedding Hall',
          description: 'Scheduled for pickup',
          date: '2025-01-03',
          status: 'pending'
        },
        {
          type: 'rating',
          title: 'Gave 5-star rating',
          description: 'To Corner Bakery',
          date: '2025-01-02',
          status: 'completed'
        }
      ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={user?.name}
                className="w-20 h-20 rounded-full mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600 capitalize">{user?.role}</p>
                {user?.organization && (
                  <p className="text-sm text-gray-500">{user.organization}</p>
                )}
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editedUser.location}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.location}</p>
                  )}
                </div>
              </div>

              {(user?.role === 'ngo' || user?.role === 'admin') && (
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Organization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="organization"
                        value={editedUser.organization}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user?.organization}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-4 ${
                    activity.type === 'donation' ? 'bg-green-50' :
                    activity.type === 'pickup' ? 'bg-blue-50' : 'bg-yellow-50'
                  }`}>
                    {activity.type === 'donation' && <Package className="h-5 w-5 text-green-600" />}
                    {activity.type === 'pickup' && <Package className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'rating' && <Star className="h-5 w-5 text-yellow-600" />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Impact</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">This Month</h3>
                <div className="space-y-2 text-sm">
                  {user?.role === 'donor' ? (
                    <>
                      <p>• Posted <span className="font-bold text-green-700">8 donations</span></p>
                      <p>• Helped serve <span className="font-bold text-green-700">67 people</span></p>
                      <p>• Prevented <span className="font-bold text-green-700">34 kg</span> food waste</p>
                    </>
                  ) : (
                    <>
                      <p>• Claimed <span className="font-bold text-green-700">6 donations</span></p>
                      <p>• Served <span className="font-bold text-green-700">89 people</span></p>
                      <p>• Distributed <span className="font-bold text-green-700">45 kg</span> of food</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">All Time</h3>
                <div className="space-y-2 text-sm">
                  {user?.role === 'donor' ? (
                    <>
                      <p>• <span className="font-bold text-blue-700">24 successful</span> donations</p>
                      <p>• <span className="font-bold text-blue-700">156 people</span> helped</p>
                      <p>• <span className="font-bold text-blue-700">4.8 ⭐</span> average rating</p>
                    </>
                  ) : (
                    <>
                      <p>• <span className="font-bold text-blue-700">18 successful</span> pickups</p>
                      <p>• <span className="font-bold text-blue-700">142 people</span> served</p>
                      <p>• <span className="font-bold text-blue-700">4.9 ⭐</span> average rating</p>
                    </>
                  )}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Thank you for being part of the solution to food waste and hunger in our community!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;