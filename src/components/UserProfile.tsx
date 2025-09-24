import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
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
  Medal,
  X,
  LogOut,
  Edit3,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLanding: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, onBackToLanding }) => {
  const { user, userProfile, logout, getAchievements } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'history'>('stats');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !userProfile) return null;

  const allAchievements = getAchievements();
  const unlockedAchievements = userProfile.achievements;
  const lockedAchievements = allAchievements.filter(
    achievement => !unlockedAchievements.find(a => a.id === achievement.id)
  );

  const getLevelProgress = () => {
    const currentLevelExp = (userProfile.level - 1) * 1000;
    const nextLevelExp = userProfile.level * 1000;
    const progress = ((userProfile.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return Math.min(progress, 100);
  };

  const getRankTitle = (level: number) => {
    if (level >= 50) return 'World Master';
    if (level >= 30) return 'Geography Expert';
    if (level >= 20) return 'Traveler';
    if (level >= 10) return 'Explorer';
    if (level >= 5) return 'Adventurer';
    return 'Beginner';
  };

  const getRankColor = (level: number) => {
    if (level >= 50) return 'from-purple-600 to-pink-600';
    if (level >= 30) return 'from-blue-600 to-purple-600';
    if (level >= 20) return 'from-green-600 to-blue-600';
    if (level >= 10) return 'from-yellow-600 to-green-600';
    if (level >= 5) return 'from-orange-600 to-yellow-600';
    return 'from-gray-600 to-orange-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userProfile.displayName}</h2>
                <p className="text-blue-100">Level {userProfile.level} • {getRankTitle(userProfile.level)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Experience: {userProfile.experience.toLocaleString()}</span>
              <span>Next Level: {userProfile.level * 1000}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${getRankColor(userProfile.level)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${getLevelProgress()}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'stats', label: 'Statistics', icon: BarChart3 },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'history', label: 'Game History', icon: Globe }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                activeTab === id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8" />
                      <div>
                        <p className="text-blue-100 text-sm">Total Score</p>
                        <p className="text-2xl font-bold">{userProfile.totalScore.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8" />
                      <div>
                        <p className="text-green-100 text-sm">Best Score</p>
                        <p className="text-2xl font-bold">{userProfile.bestScore.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-3">
                      <Globe className="w-8 h-8" />
                      <div>
                        <p className="text-purple-100 text-sm">Games Played</p>
                        <p className="text-2xl font-bold">{userProfile.gamesPlayed}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8" />
                      <div>
                        <p className="text-orange-100 text-sm">Average Score</p>
                        <p className="text-2xl font-bold">{userProfile.averageScore.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Player Rank
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getRankColor(userProfile.level)} rounded-full flex items-center justify-center`}>
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{getRankTitle(userProfile.level)}</p>
                      <p className="text-gray-600">Level {userProfile.level} • {userProfile.experience.toLocaleString()} XP</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allAchievements.map((achievement) => {
                    const isUnlocked = unlockedAchievements.find(a => a.id === achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isUnlocked
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`text-3xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${isUnlocked ? 'text-green-800' : 'text-gray-600'}`}>
                                {achievement.name}
                              </h4>
                              {isUnlocked && <CheckCircle className="w-5 h-5 text-green-600" />}
                            </div>
                            <p className={`text-sm ${isUnlocked ? 'text-green-700' : 'text-gray-500'}`}>
                              {achievement.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {isUnlocked ? `Unlocked • ${achievement.points} XP` : `${achievement.points} XP`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {userProfile.gameHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No games played yet</p>
                    <p className="text-sm text-gray-400">Start playing to see your game history!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userProfile.gameHistory.slice(-10).reverse().map((game) => (
                      <div key={game.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              {game.gameType === 'culture' ? <Users className="w-5 h-5 text-blue-600" /> : <MapPin className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <p className="font-medium capitalize">{game.gameType} Game</p>
                              <p className="text-sm text-gray-600">
                                {new Date(game.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{game.score.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{game.rounds} rounds</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
