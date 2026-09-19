import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
import AuthService from '../services/authService';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          <div className="p-8 sm:p-12 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-indigo-400" />
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Welcome back to your secure space</p>
            </div>
            
            <button
              onClick={logOut}
              className="flex items-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>

          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-indigo-500/20 p-3 rounded-full">
                    <UserIcon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                    <p className="text-sm text-gray-400">Your personal details</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Username</label>
                    <p className="mt-1 text-lg text-white font-medium">{currentUser.username}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                    <p className="mt-1 text-lg text-white font-medium">{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Token</label>
                    <p className="mt-1 text-sm text-gray-400 font-mono break-all bg-black/30 p-3 rounded-lg border border-gray-700">
                      {currentUser.accessToken.substring(0, 20)}...{currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/30 flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/50">
                  <span className="text-3xl font-bold text-white">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hello, {currentUser.username}!</h3>
                <p className="text-indigo-200">
                  You are successfully authenticated via JWT.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
