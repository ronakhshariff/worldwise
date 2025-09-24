import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Trophy, 
  Play, 
  User, 
  LogIn,
  Globe,
  Star,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

interface LandingPageProps {
  onStartCultureGame: () => void;
  onStartFoodGame: () => void;
  onShowProfile: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartCultureGame, 
  onStartFoodGame, 
  onShowProfile 
}) => {
  const { user, userProfile, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProfileClick = () => {
    if (user) {
      onShowProfile();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WorldWise</h1>
              <p className="text-sm text-gray-600">Guess the World</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userProfile?.displayName}</p>
                  <p className="text-xs text-gray-600">Level {userProfile?.level} • {userProfile?.totalScore.toLocaleString()} pts</p>
                </div>
                <button
                  onClick={onShowProfile}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Test Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> World Knowledge</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Can you guess where these people are from? Challenge yourself with our global guessing game and discover amazing places around the world.
          </p>
          
          {userProfile && (
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg mb-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">{userProfile.totalScore.toLocaleString()}</span>
                <span className="text-gray-600">Total Score</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">{userProfile.bestScore.toLocaleString()}</span>
                <span className="text-gray-600">Best Score</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">{userProfile.gamesPlayed}</span>
                <span className="text-gray-600">Games</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Game Modes */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Culture Game */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Culture Game</h3>
                <p className="text-gray-600">Guess where people are from</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Look at photos of people from around the world and guess their country of origin. 
              Use hints like clothing, background, and facial features to make your guess.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>5 rounds per game</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Unlock achievements</span>
              </div>
            </div>
            
            <button
              onClick={onStartCultureGame}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Culture Game
            </button>
          </motion.div>

          {/* Food Game */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Food Game</h3>
                <p className="text-gray-600">Guess where dishes are from</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Look at delicious dishes from around the world and guess their country of origin. 
              Use your knowledge of global cuisine to make accurate guesses.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>5 rounds per game</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Track your progress</span>
              </div>
            </div>
            
            <button
              onClick={onStartFoodGame}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Food Game
            </button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Play WorldWise?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Achievements</h4>
              <p className="text-gray-600">Unlock badges and level up as you improve your world knowledge</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Learning</h4>
              <p className="text-gray-600">Discover new cultures, places, and people from around the world</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Challenge Yourself</h4>
              <p className="text-gray-600">Test your geography skills and compete with friends</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default LandingPage;
