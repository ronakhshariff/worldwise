import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import FoodGuessrGame from './components/FoodGuessrGame';
import FoodGuessrResults from './components/FoodGuessrResults';
import UserProfile from './components/UserProfile';
import FinalScoreScreen from './components/FinalScoreScreen';
import samplePeople from './data/samplePeople';
import { sampleFoods } from './data/sampleFoods';
import { GameState, Person, Food, Guess } from './types/GameTypes';

const AppContent: React.FC = () => {
  const { user, userProfile, addGameSession } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    totalRounds: 5,
    score: 0,
    timeLeft: 30,
    isGameActive: false
  });
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [currentFood, setCurrentFood] = useState<Food | null>(null);
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  const [shownPeople, setShownPeople] = useState<Set<number>>(new Set());
  const [lastGuess, setLastGuess] = useState<Guess | null>(null);

  // Get available people who haven't been shown yet
  const getAvailablePeople = () => {
    return samplePeople.filter(person => !shownPeople.has(person.id));
  };

  const startCultureGame = () => {
    const availablePeople = getAvailablePeople();
    if (availablePeople.length === 0) {
      // Reset shown people if all have been shown
      setShownPeople(new Set());
    }
    
    const shuffledPeople = [...samplePeople].sort(() => Math.random() - 0.5);
    const selectedPerson = shuffledPeople[0];
    
    setCurrentPerson(selectedPerson);
    setShownPeople(prev => {
      const newSet = new Set(prev);
      newSet.add(selectedPerson.id);
      return newSet;
    });
    
    setGameState(prev => ({ 
      ...prev, 
      round: 1, 
      score: 0,
      timeLeft: 30 
    }));
    setGameHistory([]);
    setCurrentScreen('culture-game');
  };

  const nextCultureRound = () => {
    if (gameState.round < gameState.totalRounds) {
      const availablePeople = getAvailablePeople();
      if (availablePeople.length === 0) {
        // If no more people available in current round, get new people
        setShownPeople(new Set());
      }
      
      const shuffledPeople = [...samplePeople].sort(() => Math.random() - 0.5);
      const selectedPerson = shuffledPeople[0];
      
      setCurrentPerson(selectedPerson);
      setShownPeople(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedPerson.id);
        return newSet;
      });
      
      setGameState(prev => ({ 
        ...prev, 
        round: prev.round + 1, 
        timeLeft: 30 
      }));
      setCurrentScreen('culture-game');
    } else {
      // Game completed - save to user profile
      if (user && userProfile) {
        addGameSession({
          gameType: 'culture',
          score: gameState.score,
          rounds: gameState.totalRounds,
          completedAt: new Date(),
          achievements: []
        });
      }
      setCurrentScreen('culture-results');
    }
  };

  const nextFoodRound = () => {
    if (gameState.round < gameState.totalRounds) {
      const shuffledFoods = [...sampleFoods].sort(() => Math.random() - 0.5);
      setCurrentFood(shuffledFoods[0]);
      setGameState(prev => ({ 
        ...prev, 
        round: prev.round + 1, 
        timeLeft: 30 
      }));
      setCurrentScreen('food-game');
    } else {
      // Game completed - save to user profile
      if (user && userProfile) {
        addGameSession({
          gameType: 'food',
          score: gameState.score,
          rounds: gameState.totalRounds,
          completedAt: new Date(),
          achievements: []
        });
      }
      setCurrentScreen('food-results');
    }
  };

  const handleCultureGuess = (guess: Guess) => {
    if (!currentPerson) return;
    
    // Calculate distance and score
    const distance = Math.sqrt(
      Math.pow(guess.lat - currentPerson.actualLocation.lat, 2) + 
      Math.pow(guess.lng - currentPerson.actualLocation.lng, 2)
    ) * 111; // Rough conversion to km
    
    const points = Math.max(0, Math.round(1000 - distance));
    const newScore = gameState.score + points;
    
    setGameState(prev => ({ ...prev, score: newScore }));
    setLastGuess(guess);
    
    // Add to game history
    const roundData = {
      round: gameState.round,
      points,
      distance,
      correct: distance < 100, // Within 100km is considered correct
      person: currentPerson,
      guess
    };
    
    setGameHistory(prev => [...prev, roundData]);
    setCurrentScreen('culture-results');
  };

  const handleFoodGuess = (guess: Guess) => {
    if (!currentFood) return;
    
    // Calculate distance and score
    const distance = Math.sqrt(
      Math.pow(guess.lat - currentFood.actualLocation.lat, 2) + 
      Math.pow(guess.lng - currentFood.actualLocation.lng, 2)
    ) * 111; // Rough conversion to km
    
    const points = Math.max(0, Math.round(1000 - distance));
    const newScore = gameState.score + points;
    
    setGameState(prev => ({ ...prev, score: newScore }));
    setLastGuess(guess);
    
    // Add to game history
    const roundData = {
      round: gameState.round,
      points,
      distance,
      correct: distance < 100, // Within 100km is considered correct
      food: currentFood,
      guess
    };
    
    setGameHistory(prev => [...prev, roundData]);
    setCurrentScreen('food-results');
  };

  return (
    <>
      {currentScreen === 'landing' && (
        <LandingPage 
          onStartCultureGame={startCultureGame}
          onStartFoodGame={() => {
            const shuffledFoods = [...sampleFoods].sort(() => Math.random() - 0.5);
            setCurrentFood(shuffledFoods[0]);
            setGameState(prev => ({ ...prev, round: 1, score: 0, timeLeft: 30 }));
            setGameHistory([]);
            setCurrentScreen('food-game');
          }}
          onShowProfile={() => setCurrentScreen('profile')}
        />
      )}
      {currentScreen === 'culture-game' && currentPerson && (
        <GameScreen
          gameState={gameState}
          currentPerson={currentPerson}
          onSubmitGuess={handleCultureGuess}
        />
      )}
      {currentScreen === 'culture-results' && (
        <ResultsScreen
          gameState={gameState}
          currentPerson={currentPerson}
          guess={lastGuess}
          gameHistory={gameHistory}
          onNextRound={nextCultureRound}
          onBackToLanding={() => setCurrentScreen('final-results')}
        />
      )}
      {currentScreen === 'food-game' && currentFood && (
        <FoodGuessrGame
          gameState={gameState}
          currentFood={currentFood}
          onSubmitGuess={handleFoodGuess}
          onResults={(results) => setLastGuess(results)}
        />
      )}
      {currentScreen === 'food-results' && (
        <FoodGuessrResults
          gameState={gameState}
          currentFood={currentFood}
          guess={lastGuess}
          gameHistory={gameHistory}
          onNextRound={nextFoodRound}
          onBackToLanding={() => setCurrentScreen('final-results')}
        />
      )}
      {currentScreen === 'profile' && (
        <UserProfile 
          isOpen={true}
          onClose={() => setCurrentScreen('landing')}
          onBackToLanding={() => setCurrentScreen('landing')} 
        />
      )}
      {currentScreen === 'final-results' && (
        <FinalScoreScreen
          gameState={gameState}
          totalScore={gameState.score}
          maxPossibleScore={gameState.totalRounds * 1000}
          rounds={gameHistory}
          onPlayAgain={() => {
            setGameState(prev => ({ ...prev, round: 1, score: 0 }));
            setGameHistory([]);
            setCurrentScreen('landing');
          }}
          onBackToMenu={() => setCurrentScreen('landing')}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
