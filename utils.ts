
import { WORDS, HOUR_WORDS } from './constants';
import { GridPosition } from './types';

export function getActivePositions(date: Date): GridPosition[] {
  const positions: GridPosition[] = [];
  
  // Always active
  positions.push(WORDS['IT']);
  positions.push(WORDS['IS']);

  const rawHours = date.getHours();
  const minutes = date.getMinutes();
  const baseMinutes = minutes - (minutes % 5);
  
  // Determine if it's "PAST" or "TO"
  const isPast = baseMinutes <= 30 && baseMinutes !== 0;
  const isTo = baseMinutes > 30;
  const isOClock = baseMinutes === 0;

  // Add Minutes Words
  if (baseMinutes === 5 || baseMinutes === 55) {
    positions.push(WORDS['FIVE_MIN']);
  } else if (baseMinutes === 10 || baseMinutes === 50) {
    positions.push(WORDS['TEN_MIN']);
  } else if (baseMinutes === 15 || baseMinutes === 45) {
    positions.push(WORDS['QUARTER']);
  } else if (baseMinutes === 20 || baseMinutes === 40) {
    positions.push(WORDS['TWENTY_MIN']);
  } else if (baseMinutes === 25 || baseMinutes === 35) {
    positions.push(WORDS['TWENTY_MIN']);
    positions.push(WORDS['FIVE_MIN']);
  } else if (baseMinutes === 30) {
    positions.push(WORDS['HALF']);
  }

  if (isPast) positions.push(WORDS['PAST']);
  if (isTo) positions.push(WORDS['TO']);
  if (isOClock) positions.push(WORDS['OCLOCK']);

  // Determine which hour word to illuminate
  let displayHour = rawHours % 12;
  if (isTo) {
    displayHour = (displayHour + 1) % 12;
  }
  
  positions.push(WORDS[HOUR_WORDS[displayHour]]);

  // AM/PM
  positions.push(rawHours < 12 ? WORDS['AM'] : WORDS['PM']);

  return positions;
}

export function isCellActive(row: number, col: number, activePositions: GridPosition[]): boolean {
  return activePositions.some(pos => pos.row === row && pos.cols.includes(col));
}
