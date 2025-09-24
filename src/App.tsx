import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import FoodGuessrGame from './components/FoodGuessrGame';
import FoodGuessrResults from './components/FoodGuessrResults';
import UserProfile from './components/UserProfile';
import samplePeople from './data/samplePeople';
import { sampleFoods } from './data/sampleFoods';
import { GameState, Person, Food, Guess } from './types/GameTypes';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    currentRound: 1,
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
      currentRound: prev.currentRound + 1, 
      timeLeft: 30 
    }));
    setCurrentScreen('culture-game');
  };

  const nextCultureRound = () => {
    if (gameState.currentRound < gameState.totalRounds) {
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
        currentRound: prev.currentRound + 1, 
        timeLeft: 30 
      }));
      setCurrentScreen('culture-game');
    } else {
      setCurrentScreen('culture-results');
    }
  };

  const nextFoodRound = () => {
    if (gameState.currentRound < gameState.totalRounds) {
      const shuffledFoods = [...sampleFoods].sort(() => Math.random() - 0.5);
      setCurrentFood(shuffledFoods[0]);
      setGameState(prev => ({ 
        ...prev, 
        currentRound: prev.currentRound + 1, 
        timeLeft: 30 
      }));
      setCurrentScreen('food-game');
    } else {
      setCurrentScreen('food-results');
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCultureGuess = (guess: Guess) => {
    if (!currentPerson) return;
    
    const distance = calculateDistance(
      guess.lat, guess.lng,
      currentPerson.actualLocation.lat, currentPerson.actualLocation.lng
    );
    
    const points = Math.max(0, Math.round(5000 - distance));
    
    // Add to game history
    const newHistory = [...gameHistory, {
      round: gameState.currentRound,
      points,
      distance,
      correct: lastGuess?.country === currentPerson?.actualLocation.country,
      person: currentPerson
    }];
    setGameHistory(newHistory);
    setLastGuess(guess);
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
    
    if (gameState.currentRound < gameState.totalRounds) {
      setCurrentScreen('culture-results');
    } else {
      setCurrentScreen('culture-results');
    }
  };

  const handleFoodGuess = (guess: Guess) => {
    if (!currentFood) return;
    
    const distance = calculateDistance(
      guess.lat, guess.lng,
      currentFood.actualLocation.lat, currentFood.actualLocation.lng
    );
    
    const points = Math.max(0, Math.round(5000 - distance));
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
    
    if (gameState.currentRound < gameState.totalRounds) {
      setCurrentScreen('food-results');
    } else {
      setCurrentScreen('food-results');
    }
  };

  const startFoodGame = () => {
    const shuffledFoods = [...sampleFoods].sort(() => Math.random() - 0.5);
    setCurrentFood(shuffledFoods[0]);
    setGameState(prev => ({ 
      ...prev, 
      currentRound: 1, 
      timeLeft: 30 
    }));
    setCurrentScreen('food-game');
  };

  return (
    <AuthProvider>
      {currentScreen === 'landing' && (
        <LandingPage 
          onStartCultureGame={startCultureGame}
          onStartFoodGame={startFoodGame}
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
          onBackToLanding={() => setCurrentScreen('landing')}
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
          onBackToLanding={() => setCurrentScreen('landing')}
        />
      )}
      {currentScreen === 'profile' && (
        <UserProfile 
          isOpen={true}
          onClose={() => setCurrentScreen('landing')}
          onBackToLanding={() => setCurrentScreen('landing')} 
        />
      )}
    </AuthProvider>
  );
};

export default App;
