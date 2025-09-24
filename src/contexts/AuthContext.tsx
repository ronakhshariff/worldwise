import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  points: number;
}

export interface GameSession {
  id: string;
  gameType: 'culture' | 'food';
  score: number;
  rounds: number;
  completedAt: Date;
  achievements: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  totalScore: number;
  gamesPlayed: number;
  bestScore: number;
  averageScore: number;
  achievements: Achievement[];
  gameHistory: GameSession[];
  createdAt: Date;
  lastPlayed: Date;
  level: number;
  experience: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  addGameSession: (session: Omit<GameSession, 'id'>) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  getAchievements: () => Achievement[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Predefined achievements
const ACHIEVEMENTS = {
  FIRST_GAME: {
    id: 'first_game',
    name: 'Getting Started',
    description: 'Complete your first game',
    icon: '🎮',
    points: 10
  },
  PERFECT_SCORE: {
    id: 'perfect_score',
    name: 'Perfectionist',
    description: 'Score 5000 points in a single game',
    icon: '⭐',
    points: 50
  },
  STREAK_MASTER: {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Win 5 games in a row',
    icon: '🔥',
    points: 100
  },
  WORLD_TRAVELER: {
    id: 'world_traveler',
    name: 'World Traveler',
    description: 'Play 50 games',
    icon: '🌍',
    points: 200
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a game in under 2 minutes',
    icon: '⚡',
    points: 75
  },
  CLOSE_CALL: {
    id: 'close_call',
    name: 'Close Call',
    description: 'Get within 10km of the target',
    icon: '🎯',
    points: 25
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserProfile({
              uid: user.uid,
              email: userData.email || user.email || '',
              displayName: userData.displayName || user.displayName || '',
              photoURL: userData.photoURL || user.photoURL,
              totalScore: userData.totalScore || 0,
              gamesPlayed: userData.gamesPlayed || 0,
              bestScore: userData.bestScore || 0,
              averageScore: userData.averageScore || 0,
              achievements: userData.achievements || [],
              gameHistory: userData.gameHistory || [],
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastPlayed: userData.lastPlayed?.toDate() || new Date(),
              level: userData.level || 1,
              experience: userData.experience || 0
            });
          } else {
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              photoURL: user.photoURL || undefined,
              totalScore: 0,
              gamesPlayed: 0,
              bestScore: 0,
              averageScore: 0,
              achievements: [],
              gameHistory: [],
              createdAt: new Date(),
              lastPlayed: new Date(),
              level: 1,
              experience: 0
            };
            await setDoc(doc(db, 'users', user.uid), newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      const newProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName,
        photoURL: userCredential.user.photoURL || undefined,
        totalScore: 0,
        gamesPlayed: 0,
        bestScore: 0,
        averageScore: 0,
        achievements: [],
        gameHistory: [],
        createdAt: new Date(),
        lastPlayed: new Date(),
        level: 1,
        experience: 0
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newProfile);
    } catch (error) {
      throw error;
    }
  };

  const signInAnonymously = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      
      const newProfile: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: 'Anonymous Player',
        photoURL: userCredential.user.photoURL || undefined,
        totalScore: 0,
        gamesPlayed: 0,
        bestScore: 0,
        averageScore: 0,
        achievements: [],
        gameHistory: [],
        createdAt: new Date(),
        lastPlayed: new Date(),
        level: 1,
        experience: 0
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newProfile);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      } catch (error) {
        throw error;
      }
    }
  };

  const addGameSession = async (session: Omit<GameSession, 'id'>) => {
    if (!user || !userProfile) return;

    const newSession: GameSession = {
      ...session,
      id: Date.now().toString()
    };

    const updatedHistory = [...userProfile.gameHistory, newSession];
    const newTotalScore = userProfile.totalScore + session.score;
    const newGamesPlayed = userProfile.gamesPlayed + 1;
    const newBestScore = Math.max(userProfile.bestScore, session.score);
    const newAverageScore = Math.round(newTotalScore / newGamesPlayed);
    
    // Calculate level and experience
    const newExperience = userProfile.experience + session.score;
    const newLevel = Math.floor(newExperience / 1000) + 1;

    await updateUserProfile({
      gameHistory: updatedHistory,
      totalScore: newTotalScore,
      gamesPlayed: newGamesPlayed,
      bestScore: newBestScore,
      averageScore: newAverageScore,
      lastPlayed: new Date(),
      level: newLevel,
      experience: newExperience
    });

    // Check for achievements
    await checkAchievements(newSession, newGamesPlayed, newBestScore);
  };

  const checkAchievements = async (session: GameSession, gamesPlayed: number, bestScore: number) => {
    if (!user || !userProfile) return;

    const unlockedAchievements: string[] = [];

    // First game achievement
    if (gamesPlayed === 1 && !userProfile.achievements.find(a => a.id === 'first_game')) {
      unlockedAchievements.push('first_game');
    }

    // Perfect score achievement
    if (session.score >= 5000 && !userProfile.achievements.find(a => a.id === 'perfect_score')) {
      unlockedAchievements.push('perfect_score');
    }

    // World traveler achievement
    if (gamesPlayed >= 50 && !userProfile.achievements.find(a => a.id === 'world_traveler')) {
      unlockedAchievements.push('world_traveler');
    }

    // Unlock achievements
    for (const achievementId of unlockedAchievements) {
      await unlockAchievement(achievementId);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!user || !userProfile) return;

    const achievement = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId);
    if (!achievement || userProfile.achievements.find(a => a.id === achievementId)) return;

    const newAchievement: Achievement = {
      ...achievement,
      unlockedAt: new Date()
    };

    const updatedAchievements = [...userProfile.achievements, newAchievement];
    const newExperience = userProfile.experience + achievement.points;
    const newLevel = Math.floor(newExperience / 1000) + 1;

    await updateUserProfile({
      achievements: updatedAchievements,
      experience: newExperience,
      level: newLevel
    });
  };

  const getAchievements = () => {
    return Object.values(ACHIEVEMENTS);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInAnonymously,
    logout,
    updateUserProfile,
    addGameSession,
    unlockAchievement,
    getAchievements
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
