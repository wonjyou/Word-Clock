
import { WordMap } from './types';

export const GRID_DATA = [
  "ITLISASTIME",
  "ACQUARTERDC",
  "TWENTYFIVEX",
  "HALFBTENFTO",
  "PASTERUNINE",
  "ONESIXTHREE",
  "FOURFIVETWO",
  "EIGHTELEVEN",
  "SEVENTWELVE",
  "TENSEOCLOCK",
  "AMPM"
];

export const WORDS: WordMap = {
  // Static
  'IT': { row: 0, cols: [0, 1] },
  'IS': { row: 0, cols: [3, 4] },
  
  // Minutes (Top half)
  'QUARTER': { row: 1, cols: [2, 3, 4, 5, 6, 7, 8] },
  'TWENTY_MIN': { row: 2, cols: [0, 1, 2, 3, 4, 5] },
  'FIVE_MIN': { row: 2, cols: [6, 7, 8, 9] },
  'HALF': { row: 3, cols: [0, 1, 2, 3] },
  'TEN_MIN': { row: 3, cols: [5, 6, 7] },
  'TO': { row: 3, cols: [9, 10] },
  'PAST': { row: 4, cols: [0, 1, 2, 3] },

  // Hours (Bottom half)
  'ONE': { row: 5, cols: [0, 1, 2] },
  'SIX': { row: 5, cols: [3, 4, 5] },
  'THREE': { row: 5, cols: [6, 7, 8, 9, 10] },
  'FOUR': { row: 6, cols: [0, 1, 2, 3] },
  'FIVE_HOUR': { row: 6, cols: [4, 5, 6, 7] },
  'TWO': { row: 6, cols: [8, 9, 10] },
  'EIGHT': { row: 7, cols: [0, 1, 2, 3, 4] },
  'ELEVEN': { row: 7, cols: [5, 6, 7, 8, 9, 10] },
  'SEVEN': { row: 8, cols: [0, 1, 2, 3, 4] },
  'TWELVE': { row: 8, cols: [5, 6, 7, 8, 9, 10] },
  'NINE': { row: 4, cols: [7, 8, 9, 10] },
  'TEN_HOUR': { row: 9, cols: [0, 1, 2] },
  'OCLOCK': { row: 9, cols: [5, 6, 7, 8, 9, 10] },

  // AM PM
  'AM': { row: 10, cols: [0, 1] },
  'PM': { row: 10, cols: [2, 3] }
};

export const HOUR_WORDS = [
  'TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE_HOUR', 
  'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN_HOUR', 'ELEVEN'
];
