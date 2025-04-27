// check-node-version.js

const requiredVersion = '16.0.0'; // Minimum required Node.js version

// Get the current Node.js version and remove the "v" prefix (e.g., "v16.5.1" -> "16.5.1")
const currentVersion = process.version.slice(1); // Current version, e.g., "16.5.1"

// Function to compare two version strings
function compareVersions(version1, version2) {
  const v1Parts = version1.split('.').map(Number); // Split and convert to numbers
  const v2Parts = version2.split('.').map(Number);

  // Compare major, minor, and patch versions
  for (let i = 0; i < 3; i++) {
    if (v1Parts[i] < v2Parts[i]) {
      return -1; // version1 is less than version2
    } else if (v1Parts[i] > v2Parts[i]) {
      return 1; // version1 is greater than version2
    }
  }

  return 0; // versions are equal
}

// Check if the current Node.js version is lower than the required version
if (compareVersions(currentVersion, requiredVersion) < 0) {
  // If outdated, show error and exit
  console.error(`Error: Your Node.js version (${currentVersion}) is outdated.`);
  console.error(`Please update to Node.js ${requiredVersion} or later and try again.`);
  process.exit(1); // Exit with a non-zero code to stop installation
} else {
  // If compatible, proceed
  console.log(`Node.js version ${currentVersion} is compatible. Proceeding with installation...`);
}
