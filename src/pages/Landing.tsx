import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, TrendingUp, Award, Shield, Clock, Utensils } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Heart,
      title: 'Reduce Food Waste',
      description: 'Connect surplus food from restaurants, events, and homes with those who need it most.'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Build a network of donors, NGOs, and volunteers working together for a better tomorrow.'
    },
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Smart location matching ensures food reaches nearby NGOs quickly and efficiently.'
    },
    {
      icon: TrendingUp,
      title: 'Track Impact',
      description: 'Monitor your donations and see the real-time impact you\'re making in your community.'
    }
  ];

  const stats = [
    { label: 'Meals Distributed', value: '50,000+' },
    { label: 'Partner NGOs', value: '200+' },
    { label: 'Food Donors', value: '1,500+' },
    { label: 'Cities Covered', value: '25+' }
  ];

  const roles = [
    {
      icon: Utensils,
      title: 'Food Donors',
      description: 'Restaurants, event organizers, and individuals with surplus food',
      features: ['Post surplus food', 'Track donations', 'Rate pickup services', 'Analytics dashboard'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'NGOs & Volunteers',
      description: 'Organizations and individuals helping distribute food to those in need',
      features: ['Browse available food', 'Claim donations', 'Track deliveries', 'Manage team'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Administrators',
      description: 'Platform managers ensuring smooth operations and user verification',
      features: ['User management', 'Analytics & reports', 'Verify organizations', 'Monitor system'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Share Food,
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Share Hope
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect surplus food with those who need it most. Join our platform to reduce food waste 
              and make a meaningful impact in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How FoodShare Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect food donors with NGOs and volunteers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a donor, NGO, or volunteer, there's a place for you in our mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
                <div className={`bg-gradient-to-r ${role.color} p-3 rounded-lg w-fit mb-6`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                <ul className="space-y-3">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors and NGOs who are already making an impact. 
            Start sharing food and hope today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;