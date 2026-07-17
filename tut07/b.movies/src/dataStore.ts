import type { Movie } from './types';
import fs from 'fs';

interface DataStore {
  movies: Movie[];
}

const dataStore: DataStore = {
  movies: [],
};

export function getData(): DataStore {
  if (fs.existsSync('/movieDatabase.json')) {
    const databaseString = String(fs.readFileSync('movieDatabase.json'));
    return JSON.parse(databaseString);
  }
  return dataStore;
}

export function saveData() {
  fs.writeFileSync('movieDatabase.json', JSON.stringify(dataStore));
}
