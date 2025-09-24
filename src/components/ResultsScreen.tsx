import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ArrowRight, Globe, Trophy } from 'lucide-react';
import { GameState, Person, Guess } from '../types/GameTypes';
import { calculateDistance, getAccuracyLevel } from '../utils/scoring';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ResultsScreenProps {
  gameState: GameState;
  currentPerson: Person | null;
  guess?: Guess | null;
  gameHistory?: any[];
  onNextRound: () => void;
  onBackToLanding: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  gameState, 
  currentPerson, 
  guess, 
  gameHistory = [],
  onNextRound,
  onBackToLanding
}) => {
  // Move ALL hooks to the top before any early returns
  const [guessCountry, setGuessCountry] = useState<string>('Unknown Country');

  // Get the actual guess data - check both guess prop and gameHistory
  const actualGuess = guess || (gameHistory.length > 0 ? gameHistory[gameHistory.length - 1] : null);

  // Reverse geocoding to get country name from coordinates
  useEffect(() => {
    const getCountryFromCoordinates = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await response.json();
        if (data.countryName) {
          setGuessCountry(data.countryName);
        }
      } catch (error) {
        console.log('Reverse geocoding failed:', error);
        setGuessCountry('Unknown Country');
      }
    };

    if (actualGuess && actualGuess.lat && actualGuess.lng) {
      getCountryFromCoordinates(actualGuess.lat, actualGuess.lng);
    }
  }, [actualGuess]);

  if (!currentPerson) return null;

  // Validation helpers - more lenient
  const isValidPersonLocation = (p: Person): boolean => {
    if (!p || !p.actualLocation) return false;
    return (
      typeof p.actualLocation.lat === 'number' && 
      typeof p.actualLocation.lng === 'number' && 
      !isNaN(p.actualLocation.lat) && 
      !isNaN(p.actualLocation.lng) &&
      p.actualLocation.lat >= -90 && 
      p.actualLocation.lat <= 90 &&
      p.actualLocation.lng >= -180 && 
      p.actualLocation.lng <= 180
    );
  };

  // Get coordinates from guess data
  const getGuessCoordinates = (g: any) => {
    if (!g) return null;
    if (typeof g.lat === 'number' && typeof g.lng === 'number') {
      return { lat: g.lat, lng: g.lng };
    }
    if (g.coordinates && typeof g.coordinates.lat === 'number' && typeof g.coordinates.lng === 'number') {
      return { lat: g.coordinates.lat, lng: g.coordinates.lng };
    }
    return null;
  };

  const guessCoords = getGuessCoordinates(actualGuess);
  const distance =
    guessCoords && isValidPersonLocation(currentPerson)
      ? calculateDistance(
          guessCoords.lat,
          guessCoords.lng,
          currentPerson.actualLocation.lat,
          currentPerson.actualLocation.lng
        )
      : 0;

  const accuracy = getAccuracyLevel(distance);
  const hasValidMapData = guessCoords && isValidPersonLocation(currentPerson);

  // Check if ethnicity is correct
  const isEthnicallyCorrect = actualGuess && 
    actualGuess.ethnicity && 
    currentPerson.actualLocation.ethnicity &&
    actualGuess.ethnicity.toLowerCase() === currentPerson.actualLocation.ethnicity.toLowerCase();

  // Create smart markers based on accuracy
  const createSmartMarker = (color: string, isCorrect: boolean) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        ${isCorrect ? `
          <path d="M8 14l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        ` : `
          <circle cx="14" cy="14" r="3" fill="white"/>
        `}
      </svg>
    `)}`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });

  const actualLocationIcon = createSmartMarker('#10B981', true); // Green with checkmark
  const guessIcon = createSmartMarker(isEthnicallyCorrect ? '#10B981' : '#3B82F6', isEthnicallyCorrect); // Green with checkmark if ethnically correct, blue if not

  return (
    <div className="h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        {/* Round Progress - Floating Global Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mx-auto mb-6"
        >
          <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
            <span>Round {gameState.round} of {gameState.totalRounds}</span>
            <span>{Math.round((gameState.round / gameState.totalRounds) * 100)}%</span>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(gameState.round / gameState.totalRounds) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Content - FIXED: Equal height columns with items-stretch */}
        <div className="flex-1 grid grid-cols-12 gap-6 items-stretch">
          {/* Left side - FIXED: Remove h-full, let content determine height */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-4"
          >
            <div className="card p-0 overflow-hidden h-full">
              {/* Profile - Even taller portrait */}
              <div className="relative h-80 lg:h-96">
                <img
                  src={currentPerson.image}
                  alt={currentPerson.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-3xl font-bold mb-1">{currentPerson.name}</h2>
                  <p className="text-lg opacity-90">{currentPerson.actualLocation.ethnicity}</p>
                </div>
              </div>

              {/* Info + Results - FIXED: Auto-size content, no h-full */}
              <div className="flex flex-col p-5 space-y-4">
                {/* Distance & Accuracy */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white shadow p-4 text-center">
                    <p className="text-xs font-medium text-gray-500">DISTANCE</p>
                    <p className="text-xl font-bold text-red-600">{Math.round(distance)} km</p>
                  </div>
                  <div className="rounded-xl bg-white shadow p-4 text-center">
                    <p className="text-xs font-medium text-gray-500">ACCURACY</p>
                    <p className={`text-xl font-bold ${accuracy.color}`}>{accuracy.level}</p>
                  </div>
                </div>

                {/* Your Guess */}
                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm text-gray-500">Your Guess</p>
                  {guessCoords ? (
                    <>
                      <p className="text-base font-medium text-gray-700">
                        {guessCountry}
                      </p>
                      <p className="text-sm text-gray-600">
                        Lat {guessCoords.lat.toFixed(2)}, Lng {guessCoords.lng.toFixed(2)}
                      </p>
                      {isEthnicallyCorrect && (
                        <div className="mt-2 flex items-center gap-1 text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium">Ethnically Correct!</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-base font-medium text-gray-400">
                      {actualGuess ? 'Invalid guess data' : 'No guess available'}
                    </p>
                  )}
                </div>

                {/* Actual Location */}
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm text-gray-500">Actual Location</p>
                  {isValidPersonLocation(currentPerson) ? (
                    <>
                      <p className="text-lg font-semibold text-gray-800">
                        {currentPerson.actualLocation.country}
                      </p>
                      <p className="text-sm text-gray-500">
                        Lat {currentPerson.actualLocation.lat.toFixed(2)}, Lng{' '}
                        {currentPerson.actualLocation.lng.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-base font-medium text-gray-400">Invalid location data</p>
                  )}
                </div>

                {/* Points - Now sits right below content with no extra space */}
                <div className="flex items-center justify-between rounded-2xl bg-white shadow p-4">
                  <div className="text-center flex-1">
                    <p className="text-xs font-medium text-gray-500">ROUND POINTS</p>
                    <p className="text-xl font-bold text-purple-600">{gameState.score}</p>
                  </div>
                  <div className="w-px bg-gray-200 mx-4" />
                  <div className="text-center flex-1">
                    <p className="text-xs font-medium text-gray-500">TOTAL POINTS</p>
                    <p className="text-xl font-bold text-green-600">{gameState.score}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Map - FIXED: Equal height with flex-grow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="card p-0 overflow-hidden h-full flex flex-col">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  Location Analysis
                </h3>
                <p className="text-sm text-gray-600">Your guess vs actual location</p>
              </div>

              {/* FIXED: Map grows to fill available space */}
              <div className="flex-grow relative">
                {hasValidMapData ? (
                  <MapContainer
                    center={[
                      currentPerson.actualLocation.lat,
                      currentPerson.actualLocation.lng,
                    ]}
                    zoom={3}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-b-2xl"
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                      attribution='&copy; <a href=\"https://carto.com/attributions\">CARTO</a>'
                    />

                    <Polyline
                      positions={[
                        [guessCoords.lat, guessCoords.lng],
                        [currentPerson.actualLocation.lat, currentPerson.actualLocation.lng],
                      ]}
                      color={isEthnicallyCorrect ? "#10B981" : "#3B82F6"}
                      weight={3}
                      opacity={0.7}
                    />

                    <Marker
                      position={[
                        currentPerson.actualLocation.lat,
                        currentPerson.actualLocation.lng,
                      ]}
                      icon={actualLocationIcon}
                    />

                    <Marker
                      position={[guessCoords.lat, guessCoords.lng]}
                      icon={guessIcon}
                    />
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">
                        {!actualGuess ? 'No guess data available' : 
                         !guessCoords ? 'Invalid guess coordinates' :
                         !isValidPersonLocation(currentPerson) ? 'Invalid person location' :
                         'Map data unavailable'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="h-16 flex items-center justify-center mt-4"
        >
          {gameState.round < gameState.totalRounds ? (
            <button
              onClick={onNextRound}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <span>Next Round</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToLanding}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <span>View Final Results</span>
              <Trophy className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsScreen;
