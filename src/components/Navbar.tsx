import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, LogOut, Plus, Search, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              FoodShare
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link
                  to="/"
                  className={`text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-green-600 bg-green-50' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') ? 'text-green-600 bg-green-50' : ''
                  }`}
                >
                  <BarChart3 className="inline w-4 h-4 mr-1" />
                  Dashboard
                </Link>
                
                {user.role === 'donor' && (
                  <Link
                    to="/post-food"
                    className={`text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/post-food') ? 'text-green-600 bg-green-50' : ''
                    }`}
                  >
                    <Plus className="inline w-4 h-4 mr-1" />
                    Post Food
                  </Link>
                )}
                
                {user.role === 'ngo' && (
                  <Link
                    to="/browse-food"
                    className={`text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/browse-food') ? 'text-green-600 bg-green-50' : ''
                    }`}
                  >
                    <Search className="inline w-4 h-4 mr-1" />
                    Browse Food
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{user.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-green-600 p-2 rounded-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;