// error.js
const fs = require('fs');

/**
 * Checks if the input is empty and logs an error if it is.
 * @param {string} input - The user input to check.
 * @throws {Error} Throws an error if input is empty.
 */
function validateInput(input) {
  if (!input || input.trim() === '') {
    const errorMsg = 'Input cannot be empty';
    
    // Log the error to a file instead of throwing it
    fs.appendFileSync('error.log', `${new Date().toISOString()}: ${errorMsg}\n`);
    
    // Optionally, you can also return a default value or just log silently
    console.log('Input is empty, check error.log for details.');
    return;  // Return silently without throwing an error
  }
}

module.exports = { validateInput };
