import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  Crown, 
  Zap, 
  Globe, 
  TrendingUp,
  CheckCircle,
  XCircle,
  MapPin,
  Users,
  Medal
} from 'lucide-react';
import { GameState } from '../types/GameTypes';

interface FinalScoreScreenProps {
  gameState: GameState;
  totalScore: number;
  maxPossibleScore: number;
  rounds: Array<{
    round: number;
    points: number;
    distance: number;
    correct: boolean;
    personName: string;
    country: string;
  }>;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const FinalScoreScreen: React.FC<FinalScoreScreenProps> = ({
  gameState,
  totalScore,
  maxPossibleScore,
  rounds,
  onPlayAgain,
  onBackToMenu
}) => {
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  const getTier = (score: number, maxScore: number): { 
    name: string; 
    color: string; 
    bgColor: string; 
    icon: any; 
    description: string;
    rank: string;
  } => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 95) {
      return {
        name: 'Geographic Master',
        color: 'text-yellow-600',
        bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        icon: Crown,
        description: 'Absolute perfection in geography!',
        rank: 'S+'
      };
    } else if (percentage >= 90) {
      return {
        name: 'World Explorer',
        color: 'text-purple-600',
        bgColor: 'bg-gradient-to-r from-purple-400 to-purple-600',
        icon: Globe,
        description: 'Exceptional knowledge of world cultures!',
        rank: 'S'
      };
    } else if (percentage >= 80) {
      return {
        name: 'Cultural Expert',
        color: 'text-blue-600',
        bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
        icon: Award,
        description: 'Outstanding cultural awareness!',
        rank: 'A+'
      };
    } else if (percentage >= 70) {
      return {
        name: 'Geography Scholar',
        color: 'text-green-600',
        bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
        icon: Target,
        description: 'Great understanding of world geography!',
        rank: 'A'
      };
    } else if (percentage >= 60) {
      return {
        name: 'World Traveler',
        color: 'text-orange-600',
        bgColor: 'bg-gradient-to-r from-orange-400 to-orange-600',
        icon: MapPin,
        description: 'Good knowledge of different cultures!',
        rank: 'B'
      };
    } else if (percentage >= 50) {
      return {
        name: 'Geography Student',
        color: 'text-red-600',
        bgColor: 'bg-gradient-to-r from-red-400 to-red-600',
        icon: Users,
        description: 'Learning about world cultures!',
        rank: 'C'
      };
    } else {
      return {
        name: 'Geography Beginner',
        color: 'text-gray-600',
        bgColor: 'bg-gradient-to-r from-gray-400 to-gray-600',
        icon: Star,
        description: 'Keep exploring the world!',
        rank: 'D'
      };
    }
  };

  const tier = getTier(totalScore, maxPossibleScore);
  const correctRounds = rounds.filter(round => round.correct).length;
  const averageDistance = rounds.reduce((sum, round) => sum + round.distance, 0) / rounds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
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
            className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Game Complete!
          </h1>
          <p className="text-xl text-gray-600">
            You've finished all {gameState.totalRounds} rounds
          </p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8 overflow-hidden"
        >
          <div className={`${tier.bgColor} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <tier.icon className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-2">{tier.name}</h2>
            <p className="text-xl mb-4">{tier.description}</p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-white/20 rounded-full px-6 py-3">
                <span className="text-3xl font-bold">{tier.rank}</span>
              </div>
              <div className="bg-white/20 rounded-full px-6 py-3">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
            
            <div className="text-6xl font-bold mb-2">
              {totalScore}/{maxPossibleScore}
            </div>
            <p className="text-lg opacity-90">Total Points</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {correctRounds}/{gameState.totalRounds}
            </h3>
            <p className="text-gray-600">Correct Guesses</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {Math.round(averageDistance)} km
            </h3>
            <p className="text-gray-600">Average Distance</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {percentage}%
            </h3>
            <p className="text-gray-600">Accuracy</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {Math.round((correctRounds / gameState.totalRounds) * 100)}%
            </h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </motion.div>

        {/* Round Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Round Breakdown
          </h3>
          
          <div className="space-y-4">
            {rounds.map((round, index) => (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  round.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    round.correct ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {round.correct ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <XCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Round {round.round}</h4>
                    <p className="text-sm text-gray-600">{round.personName} from {round.country}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">{round.points}/10</div>
                  <div className="text-sm text-gray-600">{Math.round(round.distance)} km</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Zap className="w-5 h-5" />
            Play Again
          </button>
          
          <button
            onClick={onBackToMenu}
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Globe className="w-5 h-5" />
            Back to Menu
          </button>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Achievements
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                name: 'Perfect Round', 
                icon: Star, 
                unlocked: rounds.some(r => r.points === 10),
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100'
              },
              { 
                name: 'Country Master', 
                icon: Target, 
                unlocked: correctRounds >= gameState.totalRounds * 0.8,
                color: 'text-green-600',
                bgColor: 'bg-green-100'
              },
              { 
                name: 'Distance Expert', 
                icon: MapPin, 
                unlocked: averageDistance <= 500,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100'
              },
              { 
                name: 'Consistent Player', 
                icon: Medal, 
                unlocked: rounds.every(r => r.points >= 5),
                color: 'text-purple-600',
                bgColor: 'bg-purple-100'
              }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className={`card text-center p-4 ${
                  achievement.unlocked ? achievement.bgColor : 'bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  achievement.unlocked ? achievement.color : 'text-gray-400'
                }`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <h4 className={`font-semibold ${
                  achievement.unlocked ? achievement.color : 'text-gray-400'
                }`}>
                  {achievement.name}
                </h4>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.unlocked ? 'Unlocked!' : 'Locked'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalScoreScreen;
