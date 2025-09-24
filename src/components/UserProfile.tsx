import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award,
  Edit3,
  Save,
  LogOut,
  Star,
  Medal,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLanding: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { userProfile, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      await updateUserProfile({ displayName });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getRankTitle = (score: number) => {
    if (score >= 45) return { title: 'Globe Master', icon: Crown, color: 'text-yellow-600' };
    if (score >= 35) return { title: 'World Explorer', icon: Medal, color: 'text-purple-600' };
    if (score >= 25) return { title: 'Geography Expert', icon: Star, color: 'text-blue-600' };
    if (score >= 15) return { title: 'Country Hunter', icon: Target, color: 'text-green-600' };
    return { title: 'New Explorer', icon: User, color: 'text-gray-600' };
  };

  const rankInfo = getRankTitle(userProfile?.bestScore || 0);
  const RankIcon = rankInfo.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Profile</h2>
              <p className="text-gray-600">Track your progress and achievements</p>
            </div>

            {userProfile && (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                            />
                            <button
                              onClick={handleSave}
                              disabled={loading}
                              className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                            >
                              <Save className="w-4 h-4 text-blue-600" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-gray-800">{userProfile.displayName}</h3>
                            <button
                              onClick={() => setIsEditing(true)}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Edit3 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        )}
                        <p className="text-gray-600">{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-2 ${rankInfo.color}`}>
                        <RankIcon className="w-6 h-6" />
                        <span className="font-semibold">{rankInfo.title}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                    <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{userProfile.totalScore}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{userProfile.gamesPlayed}</div>
                    <div className="text-sm text-gray-600">Games Played</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{userProfile.bestScore}</div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{userProfile.averageScore}</div>
                    <div className="text-sm text-gray-600">Average</div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Total Score</span>
                        <span>{userProfile.totalScore} / 500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((userProfile.totalScore / 500) * 100, 100)}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Games Played</span>
                        <span>{userProfile.gamesPlayed} / 100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((userProfile.gamesPlayed / 100) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="text-sm text-gray-600">Member Since</div>
                        <div className="font-semibold text-gray-800">
                          {userProfile.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="text-sm text-gray-600">Last Played</div>
                        <div className="font-semibold text-gray-800">
                          {userProfile.lastPlayed.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
