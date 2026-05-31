// 1. Check if an array of numbers contains 67
const numbers = [ 42, 789, 67, 0, 1 ];

let present = false;
for (const num of numbers) {
  if (num === 67) {
    present = true;
    break;
  }
}
console.log(present);


// 2. Filter only words containing `cat` from a list
const words = [ 'locate', 'turtle', 'educational', 'copy' ];

const catsWords = [];
for (const word of words) {
  if (word.includes('cat')) {
    catsWords.push(word);
  }
}
console.log(catsWords);

// 3. Triple all prime numbers
const primes = [ 2, 3, 5, 7, 11 ];

const triplePrime = [];
for (const p of primes) {
  triplePrime.push(p * 3);
}
console.log(triplePrime);

// 4. Find the first game that has name 'Exploding Kittens'
const games = [
  { name: 'Chess', players: [2] },
  { name: 'Valorant', players: [1,5] },
  { name: 'Exploding Kittens', players: [2,5] },
  { name: 'Roblox', players: [1, undefined] },
];

let foundKittens = undefined;
for (const g of games) {
  if (g.name === 'Exploding Kittens') {
    foundKittens = g;
  }
}
console.log(foundKittens);
