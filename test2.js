const { shlw64 } = require('./index'); // Make sure this points to your index.js

// The word you want to hash
const word = 'letmein';

// Generate the hash
const hash = shlw64(word);

// Output the result
console.log(`Generated hash for "${word}":\n${hash}`);
