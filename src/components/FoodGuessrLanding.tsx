import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Trophy, Zap, Utensils, ArrowLeft, Clock, Target, Star } from 'lucide-react';
import { GameMode } from '../types/GameTypes';

interface FoodGuessrLandingProps {
  onStartGame: (mode: GameMode) => void;
  onBackToLanding: () => void;
}

const FoodGuessrLanding: React.FC<FoodGuessrLandingProps> = ({ onStartGame, onBackToLanding }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Utensils className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            FoodGuessr
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Guess the origin of delicious dishes from around the world! 
            Test your culinary geography knowledge and discover amazing foods.
          </p>
        </motion.div>

        {/* Game Modes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Quick Play */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card cursor-pointer group"
            onClick={() => onStartGame('food')}
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Quick Play</h3>
              <p className="text-gray-600 mb-4">
                5 rounds of delicious food guessing fun!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>~10 minutes</span>
              </div>
            </div>
          </motion.div>

          {/* Challenge Mode */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card cursor-pointer group"
            onClick={() => onStartGame('food')}
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Challenge Mode</h3>
              <p className="text-gray-600 mb-4">
                Test your food knowledge with difficult dishes!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Target className="w-4 h-4" />
                <span>Expert level</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Global Cuisine</h4>
            <p className="text-gray-600">
              Discover dishes from every continent and culture
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Learn & Explore</h4>
            <p className="text-gray-600">
              Expand your culinary knowledge with each guess
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Share & Compete</h4>
            <p className="text-gray-600">
              Challenge friends and share your food discoveries
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => onStartGame('food')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5" />
            Start Food Game
          </button>
          
          <button
            onClick={onBackToLanding}
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodGuessrLanding;
