
export interface GridPosition {
  row: number;
  cols: number[];
}

export interface WordMap {
  [key: string]: GridPosition;
}

export type Theme = 'warm' | 'cool' | 'minimal';
