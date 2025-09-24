import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Clock, Target, Lock, ChefHat, Info } from 'lucide-react';
import { GameState, Food, Guess } from '../types/GameTypes';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface FoodGuessrGameProps {
  gameState: GameState;
  currentFood: Food | null;
  onSubmitGuess: (guess: Guess) => void;
  onResults: (results: any) => void;
}

const FoodGuessrGame: React.FC<FoodGuessrGameProps> = ({ gameState, currentFood, onSubmitGuess }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmitGuess = useCallback(() => {
    if (selectedLocation && !hasSubmitted) {
      setHasSubmitted(true);
      onSubmitGuess({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        country: 'Unknown'
      });
    }
  }, [selectedLocation, hasSubmitted, onSubmitGuess]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          // Auto-submit if time runs out
          if (selectedLocation) {
            handleSubmitGuess();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLocation, handleSubmitGuess]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!hasSubmitted) {
          setSelectedLocation({
            lat: e.latlng.lat,
            lng: e.latlng.lng
          });
        }
      }
    });
    return null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentFood) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="card">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-600" />
                <span className="text-2xl font-bold text-gray-800">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-red-600" />
                <span className="text-xl font-semibold text-gray-800">
                  Round {gameState.round}/{gameState.totalRounds}
                </span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍽️</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                Score: {gameState.score}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Food Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={currentFood.image}
                  alt={currentFood.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="glass p-3 rounded-full">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentFood.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Where do you think this dish originates from?
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Info className="w-4 h-4" />
                  <span>Click on the map to place your guess</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center: Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card p-0 overflow-hidden">
              <div className="h-96 lg:h-[500px]">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-2xl"
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                  />
                  <MapClickHandler />
                  {selectedLocation && (
                    <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
                  )}
                </MapContainer>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Click on the map to place your guess
                  </h3>
                  {selectedLocation && (
                    <div className="text-sm text-gray-600">
                      {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleSubmitGuess}
                  disabled={!selectedLocation || hasSubmitted}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    selectedLocation && !hasSubmitted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-6 h-6" />
                    {hasSubmitted ? 'Guess Submitted' : 'Lock in Guess'}
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Round Progress</span>
              <span className="text-sm font-medium text-gray-600">
                {gameState.round} of {gameState.totalRounds}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(gameState.round / gameState.totalRounds) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodGuessrGame;
