import { dataStore } from './dataStore.js'
import { getUserById, getSongById, validateSongParameters } from './helper.js';
import cryptoRandomString from 'crypto-random-string';
import validator from 'validator';
import { format } from 'date-fns'

/**
 * Playlist song object.
 *
 * @typedef {object} Song
 * @property {string} songId
 * @property {string} name
 * @property {string} artist
 * @property {number} duration
 */

/**
 * Playlist user object.
 *
 * @typedef {object} User
 * @property {string} email
 * @property {string} password
 * @property {string} dateCreated
 * @property {Song[]} playlist
 */

///////////////////////////////////////////////////////////////////////////////

/**
 * Registers a user with an email and password
 * @param {string} email
 * @param {string} password
 * @returns {{userId: number}|{error: string}}
 */
export function addUser(email, password) {
  // check if password is empty
  if (password === "") {
    return { error: 'invalid password' };
  }

  if (!validator.isEmail(email)) {
    return { error: 'invalid email' };
  }

  const userId = cryptoRandomString({length: 10});

  // 'WEEKDAY - hh:mm:ss [am/pm]". e.g. 'Saturday - 06:03:54 pm'
  let date = format(new Date(), "EEEE - hh:mm:ss aaa");
  

  const newUser = {
    userId: userId,
    email: email,
    password: password,
    playlist: [],
    dateCreated: date
  }

  dataStore.users.push(newUser);

  return { userId };
}

/**
 * Adds a new song to the database
 * @param {string} name
 * @param {string} artist
 * @param {number} duration
 * @returns {{userId: number}|{error: string}}
 */
export function addSong(name, artist, duration) {
  if (name === '') {
    return { error: 'empty song name' };
  }
  if (artist === '') {
    return { error: 'empty artist name' };
  }
  if (duration > 10 || duration < 0) {
    return { error: 'duration is less than 0 or greater than 10' };
  }

  const songId = cryptoRandomString({length: 10});

  dataStore.songs.push({ name, artist, duration, songId });
  return { songId };
}

/**
 * Adds a song to a users playlist
 * @param {string} userId
 * @param {string} songId
 * @returns {}
 */
export function addToPlaylist(userId, songId) {
  const user = getUserById(userId);
  const song = getSongById(songId);
  if (!user || !song) {
    return {error: "userId or songId is invalid"};
  }

  if (user.playlist.includes(song)) {
    return {error: "song is already in users playlist"};
  }

  user.playlist.push(song);
  return {};
}

/**
 * Lists all of the songs in a users playlist
 * @param {string} userId
 * @returns {songs[]} playlist
 */
export function listPlaylist(userId) {
  const user = getUserById(userId);

  if (!user) {
    return {error: "userId is invalid"};
  }
  return user.playlist;
}

/**
 * Returns the program to its original state
 * @returns {}
 */
export function clear() {
  dataStore.songs = [];
  dataStore.users = [];
  return {};
}

///////////////////////////////////////////////////////////////////////////////

// Manually Testing that the code works!
// Add Users and Songs to the Database!
const userId = addUser('amber@gmail.com', 'secure!');
const songId = addSong('name', 'artist', 10);
// console.log(userId);
// console.log(songId);
// console.log(dataStore);
