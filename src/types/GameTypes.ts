export interface Person {
  id: number;
  name: string;
  image: string;
  actualLocation: {
    lat: number;
    lng: number;
    country: string;
    ethnicity: string;
  };
  hints?: {
    voice: string;
    clothing: string;
    background: string;
    fact: string;
  };
}

export interface Food {
  id: number;
  name: string;
  image: string;
  actualLocation: {
    lat: number;
    lng: number;
    country: string;
    cuisine: string;
  };
}

export interface Guess {
  lat: number;
  lng: number;
  country: string;
}

export interface GameState {
  round: number;
  
  totalRounds: number;
  timeLeft: number;
  score: number;
  isGameActive: boolean;
}

export type GameMode = 'people' | 'food';
