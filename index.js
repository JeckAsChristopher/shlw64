const crypto = require('crypto');
const { rotateBinaryLeft, rotateBinaryRight } = require('./rotate');
const { generateSalt } = require('./salt');
const { validateInput } = require('./error');  // Import the error handling function

// Convert text to binary string
function textToBinary(text) {
  if (!text) {
    throw new Error('Input text cannot be empty');
  }
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
const PEPPER = process.env.PEPPER || 'Jeck1224'; // Using environment variable for better security

// Main hash function
function shlw64(input) {
  try {
    // Validate input (check for empty input)
    if (!input || input.trim() === '') {
      console.log('Input is empty, check error.log for details.');
      return '';  // Return early to avoid further processing
    }

    const salt = generateSalt(input);  // Use salt only once
    const saltedWithPepper = salt + PEPPER;  // Combine salt and pepper for hashing

    let binaryStr = textToBinary(saltedWithPepper);

    // Apply rotations (assuming your rotation functions handle the necessary logic)
    binaryStr = rotateBinaryLeft(binaryStr, 10);
    binaryStr = rotateBinaryRight(binaryStr, 10);

    const buffer = binaryToBuffer(binaryStr);
    const finalHash = crypto.createHash('sha256').update(buffer).digest('hex');

    // Replace 'c' with 'x' deterministically in the hash
    const modifiedHash = finalHash.replace(/[c]/gi, 'x');

    return `@/64${modifiedHash.slice(0, 64)}=`;  // Return the hash without random value
  } catch (error) {
    // Silently log the error and return a default or empty response
    console.log('Error occurred but execution continues.');
    console.error(error.message);  // You can log it to a file or console
    return '';  // Return an empty string or default value
  }
}

// Helper to normalize hash (removes the random part at the end)
function extractStaticHashPart(fullHash) {
  const parts = fullHash.split('=');
  return parts[0]; // Take only the fixed hash part before '='
}

// Verifying function
function verifyShlw64(input, hashed) {
  try {
    // Validate input
    if (!input || input.trim() === '') {
      console.log('Input is empty, check error.log for details.');
      return false;  // Return early to avoid further processing
    }

    const hashedStaticPart = extractStaticHashPart(hashed);

    const salt = generateSalt(input);  // Use salt only once
    const saltedWithPepper = salt + PEPPER;

    let binaryStr = textToBinary(saltedWithPepper);

    // Apply rotations (assuming your rotation functions handle the necessary logic)
    binaryStr = rotateBinaryLeft(binaryStr, 10);
    binaryStr = rotateBinaryRight(binaryStr, 10);

    const buffer = binaryToBuffer(binaryStr);
    const finalHash = crypto.createHash('sha256').update(buffer).digest('hex');
    const modifiedHash = finalHash.replace(/[c]/gi, 'x');

    const generatedStaticPart = `@/64${modifiedHash.slice(0, 64)}`;

    return generatedStaticPart === hashedStaticPart;  // Return if hashes match
  } catch (error) {
    // Silently log the error and return a default or empty response
    console.log('Error occurred but execution continues.');
    console.error(error.message);  // You can log it to a file or console
    return false;  // Return false or some default value
  }
}

module.exports = { shlw64, verifyShlw64 };
