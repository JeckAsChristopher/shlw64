/**
 * A utility library for binary rotations.
 * Includes functions for both left and right rotations on binary strings.
 * Each rotation is done by a specified number of bits.
 * This code handles specific rotations (10 bits to the right and 7 bits to the left).
 * 
 * @module BinaryRotationUtils
 */

/**
 * Performs a left rotation on a binary string by a specified number of bits.
 * A left rotation shifts the bits to the left, wrapping around the shifted bits to the right.
 * 
 * @param {string} binStr - The binary string to be rotated.
 * @param {number} bits - The number of bits to rotate to the left.
 * @returns {string} - The resulting binary string after the left rotation.
 */
function rotateBinaryLeft(binStr, bits) {
    // Validate that the input is a binary string and bits is a non-negative integer
    if (!/^[01]+$/.test(binStr)) {
        throw new Error('Input must be a binary string.');
    }
    if (typeof bits !== 'number' || bits < 0) {
        throw new Error('The number of bits must be a non-negative integer.');
    }

    const len = binStr.length;

    // Ensure the number of bits is within the length of the binary string to avoid unnecessary rotations
    bits = bits % len;

    // Perform the left rotation
    return binStr.slice(bits) + binStr.slice(0, bits);
}

/**
 * Performs a right rotation on a binary string by a specified number of bits.
 * A right rotation shifts the bits to the right, wrapping around the shifted bits to the left.
 * 
 * @param {string} binStr - The binary string to be rotated.
 * @param {number} bits - The number of bits to rotate to the right.
 * @returns {string} - The resulting binary string after the right rotation.
 */
function rotateBinaryRight(binStr, bits) {
    // Validate that the input is a binary string and bits is a non-negative integer
    if (!/^[01]+$/.test(binStr)) {
        throw new Error('Input must be a binary string.');
    }
    if (typeof bits !== 'number' || bits < 0) {
        throw new Error('The number of bits must be a non-negative integer.');
    }

    const len = binStr.length;

    // Ensure the number of bits is within the length of the binary string to avoid unnecessary rotations
    bits = bits % len;

    // Perform the right rotation
    return binStr.slice(-bits) + binStr.slice(0, -bits);
}

/**
 * Predefined rotations for common use cases: 10 bits to the right and 7 bits to the left.
 * These values are typically used in certain cryptographic or bitwise operations.
 * 
 * @param {string} binStr - The binary string to rotate.
 * @returns {object} - The resulting rotated binary strings for both left and right rotations.
 */
function predefinedRotations(binStr) {
    // Validate input
    if (!/^[01]+$/.test(binStr)) {
        throw new Error('Input must be a binary string.');
    }

    // Perform predefined rotations: 10 to the right and 7 to the left
    const rotatedRight = rotateBinaryRight(binStr, 10);
    const rotatedLeft = rotateBinaryLeft(binStr, 7);

    return {
        rotatedRight,
        rotatedLeft
    };
}

// Export functions as a module
module.exports = {
    rotateBinaryLeft,
    rotateBinaryRight,
    predefinedRotations
};

// Example usage (for testing or demonstration purposes)
if (require.main === module) {
    const testBinaryStr = '1101010110001110'; // Example binary string for testing

    console.log('Original Binary String:', testBinaryStr);

    // Perform rotations
    const rotatedRight = rotateBinaryRight(testBinaryStr, 10);
    const rotatedLeft = rotateBinaryLeft(testBinaryStr, 7);

    console.log('Rotated Right (10 bits):', rotatedRight);
    console.log('Rotated Left (7 bits):', rotatedLeft);

    // Predefined rotations
    const rotations = predefinedRotations(testBinaryStr);
    console.log('Predefined Rotations (Right 10, Left 7):', rotations);
}
