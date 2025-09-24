import { Person } from '../types/GameTypes';

const samplePeople: Person[] = [
  // Armenia
  {
    id: 1,
    name: 'Anahit Sargsyan',
    image: '/photos/anahit-sargsyan.png',
    actualLocation: {
      lat: 40.0691,
      lng: 45.0382,
      country: 'Armenia',
      ethnicity: 'Armenian'
    }
  },
  
  // Georgia
  {
    id: 2,
    name: 'Giorgi Beridze',
    image: '/photos/giorgi-beridze.png',
    actualLocation: {
      lat: 42.3154,
      lng: 43.3569,
      country: 'Georgia',
      ethnicity: 'Georgian'
    }
  },
  
  // Azerbaijan
  {
    id: 3,
    name: 'Latif Mammadov',
    image: '/photos/latif-mammadov.png',
    actualLocation: {
      lat: 40.1431,
      lng: 47.5769,
      country: 'Azerbaijan',
      ethnicity: 'Azerbaijani'
    }
  },
  
  // Iran
  {
    id: 4,
    name: 'Amir Farhadi',
    image: '/photos/amir-farhadi.png',
    actualLocation: {
      lat: 32.4279,
      lng: 53.6880,
      country: 'Iran',
      ethnicity: 'Persian'
    }
  },
  
  // Kurdistan
  {
    id: 5,
    name: 'Dilan Barzani',
    image: '/photos/dilan-barzani.png',
    actualLocation: {
      lat: 36.1911,
      lng: 44.0092,
      country: 'Iraq',
      ethnicity: 'Kurdish'
    }
  },
  
  // Lebanon
  {
    id: 6,
    name: 'Omar El Khoury',
    image: '/photos/omar-el-khoury.png',
    actualLocation: {
      lat: 33.8547,
      lng: 35.8623,
      country: 'Lebanon',
      ethnicity: 'Lebanese'
    }
  },
  
  // Hazara
  {
    id: 7,
    name: 'Ali Ahmadzada',
    image: '/photos/ali-ahmadzada.png',
    actualLocation: {
      lat: 33.9391,
      lng: 67.7100,
      country: 'Afghanistan',
      ethnicity: 'Hazara'
    }
  },
  
  // Tajik
  {
    id: 8,
    name: 'Farrukh Rahmanov',
    image: '/photos/farrukh-rahmanov.png',
    actualLocation: {
      lat: 38.8610,
      lng: 71.2761,
      country: 'Tajikistan',
      ethnicity: 'Tajik'
    }
  },
  
  // Pashtun (Pakistan)
  {
    id: 9,
    name: 'Gul Afridi',
    image: '/photos/gul-afridi.png',
    actualLocation: {
      lat: 30.3753,
      lng: 69.3451,
      country: 'Pakistan',
      ethnicity: 'Pashtun'
    }
  },
  
  // Pashtun (Afghanistan)
  {
    id: 10,
    name: 'Zarmina Yusufzai',
    image: '/photos/zarmina-yusufzai.png',
    actualLocation: {
      lat: 33.9391,
      lng: 67.7100,
      country: 'Afghanistan',
      ethnicity: 'Pashtun'
    }
  },
  
  // Punjab (India)
  {
    id: 11,
    name: 'Yuvraj Sahota',
    image: '/photos/yuvraj-sahota.png',
    actualLocation: {
      lat: 20.5937,
      lng: 78.9629,
      country: 'India',
      ethnicity: 'Punjabi'
    }
  },
  
  // Punjab (Pakistan)
  {
    id: 12,
    name: 'Shaheen Malik',
    image: '/photos/shaheen-malik.png',
    actualLocation: {
      lat: 30.3753,
      lng: 69.3451,
      country: 'Pakistan',
      ethnicity: 'Punjabi'
    }
  },
  
  // Kashmir
  {
    id: 13,
    name: 'Aamir Bhat',
    image: '/photos/aamir-bhat.png',
    actualLocation: {
      lat: 34.0837,
      lng: 74.7973,
      country: 'India',
      ethnicity: 'Kashmiri'
    }
  },
  
  // Northeast Indian
  {
    id: 14,
    name: 'Ananya Kikon',
    image: '/photos/ananya-kikon.png',
    actualLocation: {
      lat: 26.1584,
      lng: 94.5624,
      country: 'India',
      ethnicity: 'Naga'
    }
  },
  
  // Baloch (Pakistan)
  {
    id: 15,
    name: 'Shahnawaz Mengal',
    image: '/photos/shahnawaz-mengal.png',
    actualLocation: {
      lat: 28.0339,
      lng: 65.3587,
      country: 'Pakistan',
      ethnicity: 'Baloch'
    }
  },
  
  // Tamil
  {
    id: 16,
    name: 'Arul Subramanian',
    image: '/photos/arul-subramanian.png',
    actualLocation: {
      lat: 11.1271,
      lng: 78.6569,
      country: 'India',
      ethnicity: 'Tamil'
    }
  },
  
  // Uzbek
  {
    id: 17,
    name: 'Jamshid Karimov',
    image: '/photos/jamshid-karimov.png',
    actualLocation: {
      lat: 41.3775,
      lng: 64.5853,
      country: 'Uzbekistan',
      ethnicity: 'Uzbek'
    }
  },
  
  // Deccani (India)
  {
    id: 18,
    name: 'Afreen Mirza',
    image: '/photos/afreen-mirza.png',
    actualLocation: {
      lat: 17.3850,
      lng: 78.4867,
      country: 'India',
      ethnicity: 'Deccani'
    }
  },
  
  // Turk
  {
    id: 19,
    name: 'Elif Yilmaz',
    image: '/photos/elif-yilmaz.png',
    actualLocation: {
      lat: 38.9637,
      lng: 35.2433,
      country: 'Turkey',
      ethnicity: 'Turkish'
    }
  },
  
  // Albanian
  {
    id: 20,
    name: 'Arben Krasniqi',
    image: '/photos/arben-krasniqi.png',
    actualLocation: {
      lat: 41.1533,
      lng: 20.1683,
      country: 'Albania',
      ethnicity: 'Albanian'
    }
  },
  
  // Iraqi Arab
  {
    id: 21,
    name: 'Haider Al-Maliki',
    image: '/photos/haider-al-maliki.png',
    actualLocation: {
      lat: 33.2232,
      lng: 43.6793,
      country: 'Iraq',
      ethnicity: 'Iraqi'
    }
  },
  
  // Syrian
  {
    id: 22,
    name: 'Bassel Al-Halaibi',
    image: '/photos/bassel-al-halaibi.png',
    actualLocation: {
      lat: 33.8547,
      lng: 35.8623,
      country: 'Syria',
      ethnicity: 'Syrian'
    }
  },
  
  // Turkmen
  {
    id: 23,
    name: 'Berdimyrat Atayev',
    image: '/photos/berdimyrat-atayev.png',
    actualLocation: {
      lat: 38.9697,
      lng: 59.5563,
      country: 'Turkmenistan',
      ethnicity: 'Turkmen'
    }
  },
  
  // Saudi
  {
    id: 24,
    name: 'Fahd Al-Saud',
    image: '/photos/fahd-al-saud.png',
    actualLocation: {
      lat: 23.8859,
      lng: 45.0792,
      country: 'Saudi Arabia',
      ethnicity: 'Saudi'
    }
  },
  
  // Egypt
  {
    id: 25,
    name: 'Mostafa Al-Masry',
    image: '/photos/mostafa-al-masry.png',
    actualLocation: {
      lat: 26.0975,
      lng: 30.0444,
      country: 'Egypt',
      ethnicity: 'Egyptian'
    }
  },
  
  // Jordan
  {
    id: 26,
    name: 'Omar Al-Majali',
    image: '/photos/omar-al-majali.png',
    actualLocation: {
      lat: 30.5852,
      lng: 36.2384,
      country: 'Jordan',
      ethnicity: 'Jordanian'
    }
  },
  
  // Algerian
  {
    id: 27,
    name: 'Karim Bouzid',
    image: '/photos/karim-bouzid.png',
    actualLocation: {
      lat: 28.0339,
      lng: 1.6596,
      country: 'Algeria',
      ethnicity: 'Algerian'
    }
  },
  
  // Algerian
  {
    id: 28,
    name: 'Nourhane Bensaleh',
    image: '/photos/nourhane-bensaleh.png',
    actualLocation: {
      lat: 28.0339,
      lng: 1.6596,
      country: 'Algeria',
      ethnicity: 'Algerian'
    }
  },
  
  // Morocco
  {
    id: 29,
    name: 'Rachid Benjelloun',
    image: '/photos/rachid-benjelloun.png',
    actualLocation: {
      lat: 31.6295,
      lng: -7.9811,
      country: 'Morocco',
      ethnicity: 'Moroccan'
    }
  },
  
  // Morocco
  {
    id: 30,
    name: 'Safae El Mansouri',
    image: '/photos/safae-el-mansouri.png',
    actualLocation: {
      lat: 31.6295,
      lng: -7.9811,
      country: 'Morocco',
      ethnicity: 'Moroccan'
    }
  },
  
  // Libyan
  {
    id: 31,
    name: 'Osama Al-Misrati',
    image: '/photos/osama-al-misrati.png',
    actualLocation: {
      lat: 26.3351,
      lng: 17.2283,
      country: 'Libya',
      ethnicity: 'Libyan'
    }
  },
  
  // Libyan
  {
    id: 32,
    name: 'Hanin Al-Kabti',
    image: '/photos/hanin-al-kabti.png',
    actualLocation: {
      lat: 26.3351,
      lng: 17.2283,
      country: 'Libya',
      ethnicity: 'Libyan'
    }
  },
  
  // Mongolian
  {
    id: 33,
    name: 'Ganbaatar Tserendorj',
    image: '/photos/ganbaatar-tserendorj.png',
    actualLocation: {
      lat: 46.8625,
      lng: 103.8467,
      country: 'Mongolia',
      ethnicity: 'Mongolian'
    }
  },
  
  // Philippines
  {
    id: 34,
    name: 'Jose Santos',
    image: '/photos/jose-santos.png',
    actualLocation: {
      lat: 12.8797,
      lng: 121.7740,
      country: 'Philippines',
      ethnicity: 'Filipino'
    }
  },
  
  // Malaysia
  {
    id: 35,
    name: 'Nur Aisyah binti Abdullah',
    image: '/photos/nur-aisyah-binti-abdullah.png',
    actualLocation: {
      lat: 4.2105,
      lng: 101.9758,
      country: 'Malaysia',
      ethnicity: 'Malay'
    }
  },
  
  // Indonesia
  {
    id: 36,
    name: 'Agus Setiawan',
    image: '/photos/agus-setiawan.png',
    actualLocation: {
      lat: -0.7893,
      lng: 113.9213,
      country: 'Indonesia',
      ethnicity: 'Javanese'
    }
  },
  
  // Sri Lanka
  {
    id: 37,
    name: 'Kavindi Perera',
    image: '/photos/kavindi-perera.png',
    actualLocation: {
      lat: 7.8731,
      lng: 80.7718,
      country: 'Sri Lanka',
      ethnicity: 'Sinhala'
    }
  },
  
  // Tunisia
  {
    id: 38,
    name: 'Anis Ali Ben Saleh',
    image: '/photos/anis-ali-ben-saleh.png',
    actualLocation: {
      lat: 33.8869,
      lng: 9.5375,
      country: 'Tunisia',
      ethnicity: 'Tunisian'
    }
  },
  
  // South Korea
  {
    id: 39,
    name: 'Kim Min-Jun',
    image: '/photos/kim-min-jun.png',
    actualLocation: {
      lat: 35.9078,
      lng: 127.7669,
      country: 'South Korea',
      ethnicity: 'Korean'
    }
  },
  
  // North Korea
  {
    id: 40,
    name: 'Kim Chol-Su',
    image: '/photos/kim-chol-su.png',
    actualLocation: {
      lat: 40.3399,
      lng: 127.5101,
      country: 'North Korea',
      ethnicity: 'Korean'
    }
  },
  
  // Thailand
  {
    id: 41,
    name: 'Somchai Wongchai',
    image: '/photos/somchai-wongchai.png',
    actualLocation: {
      lat: 15.8700,
      lng: 100.9925,
      country: 'Thailand',
      ethnicity: 'Thai'
    }
  },
  
  // Nepal
  {
    id: 42,
    name: 'Rajesh Shrestha',
    image: '/photos/rajesh-shrestha.png',
    actualLocation: {
      lat: 28.3949,
      lng: 84.1240,
      country: 'Nepal',
      ethnicity: 'Nepali'
    }
  },
  
  // Vietnam
  {
    id: 43,
    name: 'Nguyễn Thị Lan',
    image: '/photos/nguyen-thi-lan.png',
    actualLocation: {
      lat: 14.0583,
      lng: 108.2772,
      country: 'Vietnam',
      ethnicity: 'Vietnamese'
    }
  },
  
  // Taiwan
  {
    id: 44,
    name: 'Chen Mei-ling',
    image: '/photos/chen-mei-ling.png',
    actualLocation: {
      lat: 23.6978,
      lng: 120.9605,
      country: 'Taiwan',
      ethnicity: 'Chinese'
    }
  },
  
  // Kyrgyzstan
  {
    id: 45,
    name: 'Aizada Toktobekova',
    image: '/photos/aizada-toktobekova.png',
    actualLocation: {
      lat: 41.2044,
      lng: 74.7661,
      country: 'Kyrgyzstan',
      ethnicity: 'Kyrgyz'
    }
  },
  
  // Burma
  {
    id: 46,
    name: 'Su Su Aye',
    image: '/photos/su-su-aye.png',
    actualLocation: {
      lat: 21.9162,
      lng: 95.9560,
      country: 'Myanmar',
      ethnicity: 'Burmese'
    }
  },
  
  // Bengali
  {
    id: 47,
    name: 'Farhana Akter',
    image: '/photos/farhana-akter.png',
    actualLocation: {
      lat: 23.6850,
      lng: 90.3563,
      country: 'Bangladesh',
      ethnicity: 'Bengali'
    }
  },
  
  // Tibet
  {
    id: 48,
    name: 'Tsering Dolma',
    image: '/photos/tsering-dolma.png',
    actualLocation: {
      lat: 29.6465,
      lng: 91.1172,
      country: 'China',
      ethnicity: 'Tibetan'
    }
  },
  
  // Sudan
  {
    id: 49,
    name: 'Hassan Abdalla',
    image: '/photos/hassan-abdalla.png',
    actualLocation: {
      lat: 12.8628,
      lng: 30.2176,
      country: 'Sudan',
      ethnicity: 'Sudanese'
    }
  },
  
  // Japan
  {
    id: 50,
    name: 'Daichi Kawasaki',
    image: '/photos/daichi-kawasaki.png',
    actualLocation: {
      lat: 36.2048,
      lng: 138.2529,
      country: 'Japan',
      ethnicity: 'Japanese'
    }
  },
  
  // Yemen
  {
    id: 51,
    name: 'Balqis Al-Hudaydi',
    image: '/photos/balqis-al-hudaydi.png',
    actualLocation: {
      lat: 15.5527,
      lng: 48.5164,
      country: 'Yemen',
      ethnicity: 'Yemeni'
    }
  },
  
  // Kazakh
  {
    id: 52,
    name: 'Nursultan Baurzhanuly Akhmetov',
    image: '/photos/nursultan-baurzhanuly-akhmetov.png',
    actualLocation: {
      lat: 48.0196,
      lng: 66.9237,
      country: 'Kazakhstan',
      ethnicity: 'Kazakh'
    }
  },
  
  // Dagestan
  {
    id: 53,
    name: 'Murad Nurmagomedov',
    image: '/photos/murad-nurmagomedov.png',
    actualLocation: {
      lat: 42.9849,
      lng: 47.5047,
      country: 'Russia',
      ethnicity: 'Dagestani'
    }
  },
  
  // Chechnya
  {
    id: 54,
    name: 'Ramzan Zelimkhanovich Dakaev',
    image: '/photos/ramzan-zelimkhanovich-dakaev.png',
    actualLocation: {
      lat: 43.3119,
      lng: 45.6885,
      country: 'Russia',
      ethnicity: 'Chechen'
    }
  },
  
  // Russian
  {
    id: 55,
    name: 'Anastasia Ivanova',
    image: '/photos/anastasia-ivanova.png',
    actualLocation: {
      lat: 61.5240,
      lng: 105.3188,
      country: 'Russia',
      ethnicity: 'Russian'
    }
  },
  
  // Portugal
  {
    id: 56,
    name: 'Rui Neves',
    image: '/photos/rui-neves.png',
    actualLocation: {
      lat: 39.3999,
      lng: -8.2245,
      country: 'Portugal',
      ethnicity: 'Portuguese'
    }
  },
  
  // Hungary
  {
    id: 57,
    name: 'Eszter Kovacz',
    image: '/photos/eszter-kovacz.png',
    actualLocation: {
      lat: 47.1625,
      lng: 19.5033,
      country: 'Hungary',
      ethnicity: 'Hungarian'
    }
  },
  
  // Greece
  {
    id: 58,
    name: 'Elena Papadakis',
    image: '/photos/elena-papadakis.png',
    actualLocation: {
      lat: 39.0742,
      lng: 21.8243,
      country: 'Greece',
      ethnicity: 'Greek'
    }
  },
  
  // Ireland
  {
    id: 59,
    name: 'Patrick McGregor',
    image: '/photos/patrick-mcgregor.png',
    actualLocation: {
      lat: 53.4129,
      lng: -8.2439,
      country: 'Ireland',
      ethnicity: 'Irish'
    }
  },
  
  // Croatia
  {
    id: 60,
    name: 'Ana Kovacevic',
    image: '/photos/ana-kovacevic.png',
    actualLocation: {
      lat: 45.1000,
      lng: 15.2000,
      country: 'Croatia',
      ethnicity: 'Croatian'
    }
  },
  
  // Bulgaria
  {
    id: 61,
    name: 'Ivan Dimitrov',
    image: '/photos/ivan-dimitrov.png',
    actualLocation: {
      lat: 42.7339,
      lng: 25.4858,
      country: 'Bulgaria',
      ethnicity: 'Bulgarian'
    }
  },
  
  // Swiss
  {
    id: 62,
    name: 'Lara Meier',
    image: '/photos/lara-meier.png',
    actualLocation: {
      lat: 46.8182,
      lng: 8.2275,
      country: 'Switzerland',
      ethnicity: 'Swiss'
    }
  },
  
  // Sweden
  {
    id: 63,
    name: 'Erik Andersson',
    image: '/photos/erik-andersson.png',
    actualLocation: {
      lat: 60.1282,
      lng: 18.6435,
      country: 'Sweden',
      ethnicity: 'Swedish'
    }
  },
  
  // Denmark
  {
    id: 64,
    name: 'Freja Nielsen',
    image: '/photos/freja-nielsen.png',
    actualLocation: {
      lat: 56.2639,
      lng: 9.5018,
      country: 'Denmark',
      ethnicity: 'Danish'
    }
  },
  
  // Iceland
  {
    id: 65,
    name: 'Katrín Jonsdottir',
    image: '/photos/katrin-jonsdottir.png',
    actualLocation: {
      lat: 64.9631,
      lng: -19.0208,
      country: 'Iceland',
      ethnicity: 'Icelandic'
    }
  },
  
  // Romania
  {
    id: 66,
    name: 'Andrei Popescu',
    image: '/photos/andrei-popescu.png',
    actualLocation: {
      lat: 45.9432,
      lng: 24.9668,
      country: 'Romania',
      ethnicity: 'Romanian'
    }
  },
  
  // Poland
  {
    id: 67,
    name: 'Katarzyna Nowak',
    image: '/photos/katarzyna-nowak.png',
    actualLocation: {
      lat: 51.9194,
      lng: 19.1451,
      country: 'Poland',
      ethnicity: 'Polish'
    }
  },
  
  // Ukraine
  {
    id: 68,
    name: 'Olena Shevchenko',
    image: '/photos/olena-shevchenko.png',
    actualLocation: {
      lat: 48.3794,
      lng: 31.1656,
      country: 'Ukraine',
      ethnicity: 'Ukrainian'
    }
  },
  
  // France
  {
    id: 69,
    name: 'Camille Dubois',
    image: '/photos/camille-dubois.png',
    actualLocation: {
      lat: 46.2276,
      lng: 2.2137,
      country: 'France',
      ethnicity: 'French'
    }
  },
  
  // Belgium
  {
    id: 70,
    name: 'Pieter Janssens',
    image: '/photos/pieter-janssens.png',
    actualLocation: {
      lat: 50.5039,
      lng: 4.4699,
      country: 'Belgium',
      ethnicity: 'Belgian'
    }
  },
  
  // Spain
  {
    id: 71,
    name: 'Alejandro Garcia',
    image: '/photos/alejandro-garcia.png',
    actualLocation: {
      lat: 40.4637,
      lng: -3.7492,
      country: 'Spain',
      ethnicity: 'Spanish'
    }
  },
  
  // Finland
  {
    id: 72,
    name: 'Aino Virtanen',
    image: '/photos/aino-virtanen.png',
    actualLocation: {
      lat: 61.9241,
      lng: 25.7482,
      country: 'Finland',
      ethnicity: 'Finnish'
    }
  },
  
  // Czech
  {
    id: 73,
    name: 'Jakub Novak',
    image: '/photos/jakub-novak.png',
    actualLocation: {
      lat: 49.8175,
      lng: 15.4730,
      country: 'Czech Republic',
      ethnicity: 'Czech'
    }
  },
  
  // Bosnian
  {
    id: 74,
    name: 'Amir Hadzkic',
    image: '/photos/amir-hadzkic.png',
    actualLocation: {
      lat: 43.9159,
      lng: 17.6791,
      country: 'Bosnia and Herzegovina',
      ethnicity: 'Bosnian'
    }
  },
  
  // Germany
  {
    id: 75,
    name: 'Lukas Muller',
    image: '/photos/lukas-muller.png',
    actualLocation: {
      lat: 51.1657,
      lng: 10.4515,
      country: 'Germany',
      ethnicity: 'German'
    }
  },
  
  // Austria
  {
    id: 76,
    name: 'Anna Huber',
    image: '/photos/anna-huber.png',
    actualLocation: {
      lat: 47.5162,
      lng: 14.5501,
      country: 'Austria',
      ethnicity: 'Austrian'
    }
  },
  
  // Norway
  {
    id: 77,
    name: 'Magnus Hansen',
    image: '/photos/magnus-hansen.png',
    actualLocation: {
      lat: 60.4720,
      lng: 8.4689,
      country: 'Norway',
      ethnicity: 'Norwegian'
    }
  },
  
  // Australian
  {
    id: 78,
    name: 'Matilda Wilson',
    image: '/photos/matilda-wilson.png',
    actualLocation: {
      lat: -25.2744,
      lng: 133.7751,
      country: 'Australia',
      ethnicity: 'Australian'
    }
  },
  
  // Mexican
  {
    id: 79,
    name: 'Dolores Lopez',
    image: '/photos/dolores-lopez.png',
    actualLocation: {
      lat: 23.6345,
      lng: -102.5528,
      country: 'Mexico',
      ethnicity: 'Mexican'
    }
  },
  
  // Colombian
  {
    id: 80,
    name: 'Maria Camilla',
    image: '/photos/maria-camilla.png',
    actualLocation: {
      lat: 4.5709,
      lng: -74.2973,
      country: 'Colombia',
      ethnicity: 'Colombian'
    }
  },
  
  // Nigerian
  {
    id: 81,
    name: 'Chukwudi Adeyemi',
    image: '/photos/chukwudi-adeyemi.png',
    actualLocation: {
      lat: 9.0820,
      lng: 8.6753,
      country: 'Nigeria',
      ethnicity: 'Nigerian'
    }
  },
  
  // Ghana
  {
    id: 82,
    name: 'Kwame Mensah',
    image: '/photos/kwame-mensah.png',
    actualLocation: {
      lat: 7.9465,
      lng: -1.0232,
      country: 'Ghana',
      ethnicity: 'Ghanaian'
    }
  },
  
  // Senegal
  {
    id: 83,
    name: 'Mamadou Diof',
    image: '/photos/mamadou-diof.png',
    actualLocation: {
      lat: 14.4974,
      lng: -14.4524,
      country: 'Senegal',
      ethnicity: 'Senegalese'
    }
  },
  
  // Senegal
  {
    id: 84,
    name: 'Abdisalam Warsame',
    image: '/photos/abdisalam-warsame.png',
    actualLocation: {
      lat: 14.4974,
      lng: -14.4524,
      country: 'Senegal',
      ethnicity: 'Senegalese'
    }
  },
  
  // South Sudan
  {
    id: 85,
    name: 'Deng Akech',
    image: '/photos/deng-akech.png',
    actualLocation: {
      lat: 6.8770,
      lng: 31.3069,
      country: 'South Sudan',
      ethnicity: 'South Sudanese'
    }
  },
  
  // Ethiopia
  {
    id: 86,
    name: 'Selamawit Tesfaye',
    image: '/photos/selamawit-tesfaye.png',
    actualLocation: {
      lat: 9.1450,
      lng: 40.4897,
      country: 'Ethiopia',
      ethnicity: 'Ethiopian'
    }
  },
  
  // Eritrea
  {
    id: 87,
    name: 'Tesfam Gebremedhin',
    image: '/photos/tesfam-gebremedhin.png',
    actualLocation: {
      lat: 15.1794,
      lng: 39.7823,
      country: 'Eritrea',
      ethnicity: 'Eritrean'
    }
  },
  
  // Zimbabwe
  {
    id: 88,
    name: 'Tendai Moyo',
    image: '/photos/tendai-moyo.png',
    actualLocation: {
      lat: -19.0154,
      lng: 29.1549,
      country: 'Zimbabwe',
      ethnicity: 'Zimbabwean'
    }
  },
  
  // South Africa
  {
    id: 89,
    name: 'Naledi Khumalo',
    image: '/photos/naledi-khumalo.png',
    actualLocation: {
      lat: -30.5595,
      lng: 22.9375,
      country: 'South Africa',
      ethnicity: 'South African'
    }
  },
  
  // Kenyan
  {
    id: 90,
    name: 'Brian Otieno',
    image: '/photos/brian-otieno.png',
    actualLocation: {
      lat: -0.0236,
      lng: 37.9062,
      country: 'Kenya',
      ethnicity: 'Kenyan'
    }
  },
  
  // Argentina
  {
    id: 91,
    name: 'Mateo Fernandez',
    image: '/photos/mateo-fernandez.png',
    actualLocation: {
      lat: -38.4161,
      lng: -63.6167,
      country: 'Argentina',
      ethnicity: 'Argentine'
    }
  },
  
  // Dominican Republic
  {
    id: 92,
    name: 'Luis Martinez',
    image: '/photos/luis-martinez.png',
    actualLocation: {
      lat: 18.7357,
      lng: -70.1627,
      country: 'Dominican Republic',
      ethnicity: 'Dominican'
    }
  },
  
  // Jamaican
  {
    id: 93,
    name: 'Andre Campbell',
    image: '/photos/andre-campbell.png',
    actualLocation: {
      lat: 18.1096,
      lng: -77.2975,
      country: 'Jamaica',
      ethnicity: 'Jamaican'
    }
  },
  
  // Brazilian
  {
    id: 94,
    name: 'Rafael Oliveira',
    image: '/photos/rafael-oliveira.png',
    actualLocation: {
      lat: -14.2350,
      lng: -51.9253,
      country: 'Brazil',
      ethnicity: 'Brazilian'
    }
  },
  
  // Chile
  {
    id: 95,
    name: 'Matias Rojas',
    image: '/photos/matias-rojas.png',
    actualLocation: {
      lat: -35.6751,
      lng: -71.5430,
      country: 'Chile',
      ethnicity: 'Chilean'
    }
  },
  
  // England
  {
    id: 96,
    name: 'James Smith',
    image: '/photos/james-smith.png',
    actualLocation: {
      lat: 55.3781,
      lng: -3.4360,
      country: 'England',
      ethnicity: 'English'
    }
  },
  
  // Scotland
  {
    id: 97,
    name: 'Callum Fraser',
    image: '/photos/callum-fraser.png',
    actualLocation: {
      lat: 56.4907,
      lng: -4.2026,
      country: 'Scotland',
      ethnicity: 'Scottish'
    }
  },
  
  // Wales
  {
    id: 98,
    name: 'Gareth Bale',
    image: '/photos/gareth-bale.png',
    actualLocation: {
      lat: 52.1307,
      lng: -3.7837,
      country: 'Wales',
      ethnicity: 'Welsh'
    }
  },
  
  // Ivory Coast
  {
    id: 99,
    name: 'Didier Drogba',
    image: '/photos/didier-drogba.png',
    actualLocation: {
      lat: 7.5400,
      lng: -5.5471,
      country: 'Ivory Coast',
      ethnicity: 'Ivorian'
    }
  },
  
  // Italy
  {
    id: 100,
    name: 'Gianluigi Buffon',
    image: '/photos/gianluigi-buffon.png',
    actualLocation: {
      lat: 41.8719,
      lng: 12.5674,
      country: 'Italy',
      ethnicity: 'Italian'
    }
  },
  
  // Brazil 2
  {
    id: 101,
    name: 'Rodrygo Goes',
    image: '/photos/rodrygo-goes.png',
    actualLocation: {
      lat: -14.2350,
      lng: -51.9253,
      country: 'Brazil',
      ethnicity: 'Brazilian'
    }
  },
   // Algeria 2
   {
    id: 102,
    name: 'Nadia Bouzid',
    image: '/photos/nadia-bouzid.png',
    actualLocation: {
      lat: 28.0339,
      lng: 1.6596,
      country: 'Algeria',
      ethnicity: 'Algerian'
    }
  },
  
  // Pakistan 2
  {
    id: 103,
    name: 'Sadia Qureshi',
    image: '/photos/sadia-qureshi.png',
    actualLocation: {
      lat: 30.3753,
      lng: 69.3451,
      country: 'Pakistan',
      ethnicity: 'Pakistani'
    }
  },
  
  // Afghanistan 2
  {
    id: 104,
    name: 'Laila Noorzai',
    image: '/photos/laila-noorzai.png',
    actualLocation: {
      lat: 33.9391,
      lng: 67.7100,
      country: 'Afghanistan',
      ethnicity: 'Pashtun'
    }
  },
  
  // Algeria 3
  {
    id: 105,
    name: 'Karim Benkacem',
    image: '/photos/karim-benkacem.png',
    actualLocation: {
      lat: 28.0339,
      lng: 1.6596,
      country: 'Algeria',
      ethnicity: 'Algerian'
    }
  },
  
  // Morocco 3
  {
    id: 106,
    name: 'Youssef El-Mansour',
    image: '/photos/youssef-el-mansour.png',
    actualLocation: {
      lat: 31.6295,
      lng: -7.9811,
      country: 'Morocco',
      ethnicity: 'Moroccan'
    }
  },
  
  // Iraq 2
  {
    id: 107,
    name: 'Omar Al-Obaid',
    image: '/photos/omar-al-obaid.png',
    actualLocation: {
      lat: 33.2232,
      lng: 43.6793,
      country: 'Iraq',
      ethnicity: 'Iraqi'
    }
  },
  
  // Egypt 2
  {
    id: 108,
    name: 'Mohamed Fathy',
    image: '/photos/mohamed-fathy.png',
    actualLocation: {
      lat: 26.0975,
      lng: 30.0444,
      country: 'Egypt',
      ethnicity: 'Egyptian'
    }
  },
  
  // Lebanon 2
  {
    id: 109,
    name: 'Tarek Hamdan',
    image: '/photos/tarek-hamdan.png',
    actualLocation: {
      lat: 33.8547,
      lng: 35.8623,
      country: 'Lebanon',
      ethnicity: 'Lebanese'
    }
  },
  
  // Afghanistan 3
  {
    id: 110,
    name: 'Ahmad Shah Durrani',
    image: '/photos/ahmad-shah-durrani.png',
    actualLocation: {
      lat: 33.9391,
      lng: 67.7100,
      country: 'Afghanistan',
      ethnicity: 'Pashtun'
    }
  },
  
  // Iran 2
  {
    id: 111,
    name: 'Kourosh Farhad',
    image: '/photos/kourosh-farhad.png',
    actualLocation: {
      lat: 32.4279,
      lng: 53.6880,
      country: 'Iran',
      ethnicity: 'Persian'
    }
  },
  
  // Pakistan 3
  {
    id: 112,
    name: 'Atif Siddiqui',
    image: '/photos/atif-siddiqui.png',
    actualLocation: {
      lat: 30.3753,
      lng: 69.3451,
      country: 'Pakistan',
      ethnicity: 'Pakistani'
    }
  },
  
  // Turkey 2
  {
    id: 113,
    name: 'Emre Demir',
    image: '/photos/emre-demir.png',
    actualLocation: {
      lat: 38.9637,
      lng: 35.2433,
      country: 'Turkey',
      ethnicity: 'Turkish'
    }
  },
  
  // Turkey 3
  {
    id: 114,
    name: 'Zeynep Celik',
    image: '/photos/zeynep-celik.png',
    actualLocation: {
      lat: 38.9637,
      lng: 35.2433,
      country: 'Turkey',
      ethnicity: 'Turkish'
    }
  },
  
  // Algeria 4
  {
    id: 115,
    name: 'Amina Benali',
    image: '/photos/amina-benali.png',
    actualLocation: {
      lat: 28.0339,
      lng: 1.6596,
      country: 'Algeria',
      ethnicity: 'Algerian'
    }
  },
  
  // Iran 3
  {
    id: 116,
    name: 'Roxana Esfandiari',
    image: '/photos/roxana-esfandiari.png',
    actualLocation: {
      lat: 32.4279,
      lng: 53.6880,
      country: 'Iran',
      ethnicity: 'Persian'
    }
  },
  
  // UAE
  {
    id: 117,
    name: 'Aisha Al Falasi',
    image: '/photos/aisha-al-falasi.png',
    actualLocation: {
      lat: 23.4241,
      lng: 53.8478,
      country: 'United Arab Emirates',
      ethnicity: 'Emirati'
    }
  },
  
  // India 2
  {
    id: 118,
    name: 'Safeena Farooqui',
    image: '/photos/safeena-farooqui.png',
    actualLocation: {
      lat: 20.5937,
      lng: 78.9629,
      country: 'India',
      ethnicity: 'Indian'
    }
  }
];

export default samplePeople;


  