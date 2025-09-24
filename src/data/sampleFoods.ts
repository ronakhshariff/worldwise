import { Food } from '../types/GameTypes';

export const sampleFoods: Food[] = [
  {
    id: 1,
    name: 'Pizza Margherita',
    image: '/photos/pizza-margherita.jpg',
    actualLocation: {
      lat: 40.8518,
      lng: 14.2681,
      country: 'Italy',
      cuisine: 'Naples'
    }
  },
  {
    id: 2,
    name: 'Sushi',
    image: '/photos/sushi.jpg',
    actualLocation: {
      lat: 35.6762,
      lng: 139.6503,
      country: 'Japan',
      cuisine: 'Tokyo'
    }
  },
  {
    id: 3,
    name: 'Tacos',
    image: '/photos/tacos.jpg',
    actualLocation: {
      lat: 19.4326,
      lng: -99.1332,
      country: 'Mexico',
      cuisine: 'Mexico City'
    }
  },
  {
    id: 4,
    name: 'Pad Thai',
    image: '/photos/pad-thai.jpg',
    actualLocation: {
      lat: 13.7563,
      lng: 100.5018,
      country: 'Thailand',
      cuisine: 'Bangkok'
    }
  },
  {
    id: 5,
    name: 'Fish and Chips',
    image: '/photos/fish-and-chips.jpg',
    actualLocation: {
      lat: 51.5074,
      lng: -0.1278,
      country: 'United Kingdom',
      cuisine: 'London'
    }
  },
  {
    id: 6,
    name: 'Croissant',
    image: '/photos/croissant.jpg',
    actualLocation: {
      lat: 48.8566,
      lng: 2.3522,
      country: 'France',
      cuisine: 'Paris'
    }
  },
  {
    id: 7,
    name: 'Biryani',
    image: '/photos/biryani.jpg',
    actualLocation: {
      lat: 28.7041,
      lng: 77.1025,
      country: 'India',
      cuisine: 'Delhi'
    }
  },
  {
    id: 8,
    name: 'Kimchi',
    image: '/photos/kimchi.jpg',
    actualLocation: {
      lat: 37.5665,
      lng: 126.9780,
      country: 'South Korea',
      cuisine: 'Seoul'
    }
  },
  {
    id: 9,
    name: 'Paella',
    image: '/photos/paella.jpg',
    actualLocation: {
      lat: 39.4699,
      lng: -0.3763,
      country: 'Spain',
      cuisine: 'Valencia'
    }
  },
  {
    id: 10,
    name: 'Pho',
    image: '/photos/pho.jpg',
    actualLocation: {
      lat: 21.0285,
      lng: 105.8542,
      country: 'Vietnam',
      cuisine: 'Hanoi'
    }
  }
];

export default sampleFoods;
