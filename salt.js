const crypto = require('crypto');

/**
 * Deterministic salt generation based on input. No randomness involved.
 * 
 * @param {string} input - The input string to salt.
 * @param {number} rounds - The number of iterations to apply (defaults to 64).
 * @returns {string} - The resulting salt (in hexadecimal format).
 */
function generateSalt(input, rounds = 64) {
    let salted = input;

    // Increase rounds to 64 and apply the hashing process
    for (let i = 0; i < rounds; i++) {
        // We apply SHA-256 hash and update with the previous result (increasing the complexity).
        salted = crypto.createHash('sha256').update(salted).digest('hex');
    }

    // Ensure the final result has a consistent length (e.g., 256 bits / 64 hex characters)
    // This ensures that regardless of the rounds, the salt length is fixed and predictable.
    return salted.slice(0, 64);  // Optionally, you can keep 64 characters, representing 256 bits
}

module.exports = { generateSalt };
