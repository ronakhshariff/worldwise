import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ArrowRight, Trophy, Target } from 'lucide-react';
import { GameState, Food, Guess } from '../types/GameTypes';
import { calculateDistance, calculatePoints, getAccuracyLevel } from '../utils/scoring';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface FoodGuessrResultsProps {
  gameState: GameState;
  currentFood: Food | null;
  guess: Guess | null;
  onNextRound: () => void;
  gameHistory?: any[];
  onBackToLanding: () => void;
}

const FoodGuessrResults: React.FC<FoodGuessrResultsProps> = ({ 
  gameState, 
  currentFood, 
  guess, 
  onNextRound,
  onBackToLanding
}) => {
  if (!currentFood || !guess) return null;

  // Safe validation for coordinates
  const isValidGuess = (guess: any): boolean => {
    return guess && 
           typeof guess.lat === 'number' && 
           typeof guess.lng === 'number' && 
           !isNaN(guess.lat) && 
           !isNaN(guess.lng) &&
           guess.lat >= -90 && 
           guess.lat <= 90 &&
           guess.lng >= -180 && 
           guess.lng <= 180;
  };

  const isValidFoodLocation = (food: Food): boolean => {
    return food && 
           food.actualLocation &&
           typeof food.actualLocation.lat === 'number' && 
           typeof food.actualLocation.lng === 'number' && 
           !isNaN(food.actualLocation.lat) && 
           !isNaN(food.actualLocation.lng) &&
           food.actualLocation.lat >= -90 && 
           food.actualLocation.lat <= 90 &&
           food.actualLocation.lng >= -180 && 
           food.actualLocation.lng <= 180;
  };

  const distance = isValidGuess(guess) && isValidFoodLocation(currentFood)
    ? calculateDistance(
        guess.lat,
        guess.lng,
        currentFood.actualLocation.lat,
        currentFood.actualLocation.lng
      )
    : 0;

  const points = isValidGuess(guess)
    ? calculatePoints(distance, {
        name: false,
        language: false
      })
    : 0;

  const accuracy = getAccuracyLevel(points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Round {gameState.round} Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {currentFood.name} originates from {currentFood.actualLocation.country}
          </p>
        </motion.div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-6">
            <img
              src={currentFood.image}
              alt={currentFood.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentFood.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {currentFood.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Distance:</span>
                  <span className="font-semibold text-secondary-600">
                    {Math.round(distance)} km
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Points:</span>
                  <span className="font-semibold text-primary-600">
                    {points} points
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Accuracy:</span>
                  <span className={`font-semibold ${accuracy.color}`}>
                    {accuracy.level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map - Only render if we have valid coordinates */}
        {isValidGuess(guess) && isValidFoodLocation(currentFood) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Guess vs Actual Origin</h3>
            <div className="h-96">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="rounded-2xl"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                
                {/* Actual Location Marker */}
                <Marker 
                  position={[currentFood.actualLocation.lat, currentFood.actualLocation.lng]}
                  icon={new Icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#22c55e"/>
                        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
                      </svg>
                    `),
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -41]
                  })}
                />
                
                {/* Your Guess Marker */}
                <Marker 
                  position={[guess.lat, guess.lng]}
                  icon={new Icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ef4444"/>
                        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
                      </svg>
                    `),
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -41]
                  })}
                />
              </MapContainer>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-600">Actual Origin</p>
                  <p className="text-sm text-gray-800">{currentFood.actualLocation.country}</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-600">Your Guess</p>
                  <p className="text-sm text-gray-800">
                    {guess.lat.toFixed(2)}, {guess.lng.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          {gameState.round < gameState.totalRounds ? (
            <button
              onClick={onNextRound}
              className="btn-primary flex items-center gap-2"
            >
              Next Round
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onBackToLanding}
              className="btn-primary flex items-center gap-2"
            >
              View Final Results
              <Trophy className="w-5 h-5" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FoodGuessrResults;
