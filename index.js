const crypto = require('crypto');
const { rotateBinaryLeft, rotateBinaryRight } = require('./rotate');
const { generateSalt } = require('./salt');

// Convert text to binary string
function textToBinary(text) {
  return text.split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

// Convert binary string back to Buffer
function binaryToBuffer(binStr) {
  const bytes = [];
  for (let i = 0; i < binStr.length; i += 8) {
    const byte = binStr.slice(i, i + 8);
    if (byte.length === 8) {
      bytes.push(parseInt(byte, 2));
    }
  }
  return Buffer.from(bytes);
}

// Constant pepper key
const PEPPER = 'Jeck1224';

// Main hash function
function shlw64(input) {
  const nonce = generateSalt(input); // Use salt as nonce
  const salted = generateSalt(input);
  const saltedWithNonceAndPepper = salted + nonce + PEPPER;
  
  let binaryStr = textToBinary(saltedWithNonceAndPepper);

  binaryStr = rotateBinaryLeft(binaryStr, 10);
  binaryStr = rotateBinaryRight(binaryStr, 10);

  const buffer = binaryToBuffer(binaryStr);
  const finalHash = crypto.createHash('sha256').update(buffer).digest('hex');
  
  // No randomness, just use a stable replacement
  const modifiedHash = finalHash.replace(/[c]/gi, 'x');  // Replace 'c' with 'x' deterministically

  return `@/64${modifiedHash.slice(0, 64)}=`;  // Return the hash without random value
}

// Simple helper to normalize hash (removes the random part at the end)
function extractStaticHashPart(fullHash) {
  const parts = fullHash.split('=');
  return parts[0]; // Take only the fixed hash part before '='
}

// Verifying function
function verifyShlw64(input, hashed) {
  const hashedStaticPart = extractStaticHashPart(hashed);

  const nonce = generateSalt(input); // Use salt as nonce
  const salted = generateSalt(input);
  const saltedWithNonceAndPepper = salted + nonce + PEPPER;

  let binaryStr = textToBinary(saltedWithNonceAndPepper);

  binaryStr = rotateBinaryLeft(binaryStr, 10);  
  binaryStr = rotateBinaryRight(binaryStr, 10);  

  const buffer = binaryToBuffer(binaryStr);  
  const finalHash = crypto.createHash('sha256').update(buffer).digest('hex');  
  const modifiedHash = finalHash.replace(/[c]/gi, 'x');  // Replace 'c' with 'x' deterministically  

  const generatedStaticPart = `@/64${modifiedHash.slice(0, 64)}`;  

  return generatedStaticPart === hashedStaticPart;  // Return if hashes match
}

module.exports = { shlw64, verifyShlw64 };
