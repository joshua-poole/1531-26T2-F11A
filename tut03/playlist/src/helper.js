import { dataStore } from "./dataStore.js";

export function getUserById(userId) {
  return dataStore.users.find(user => user.userId === userId);
}

export function getSongById(songId) {
  return dataStore.songs.find(song => song.songId === songId);
}

export function validateSongParameters(name, artist, duration) {
  return !name || !artist || duration > 10 || duration < 0
}