'use client';

import { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';

const Login = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex transition-all duration-500 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          X
        </button>

        {/* Left Side Image Section (Only for larger screens) */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#044236]/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Beauty products"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-8 left-8 z-20 text-white">
            <h3 className="text-2xl font-bold">PureGlow Beauty</h3>
            <p className="mt-2 max-w-xs">Discover natural beauty products for a radiant you</p>
          </div>
        </div>

        {/* Right Side Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          {/* Tabs for Login & Register */}
          <div className="flex space-x-4 border-b border-gray-200 mb-8">
            <button
              className={`pb-2 text-lg font-medium transition-all duration-200 ${
                activeTab === 'login' ? 'text-[#044236] border-b-2 border-[#044236]' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`pb-2 text-lg font-medium transition-all duration-200 ${
                activeTab === 'register' ? 'text-[#044236] border-b-2 border-[#044236]' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {/* Conditional Rendering of Forms */}
          {activeTab === 'login' ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;



