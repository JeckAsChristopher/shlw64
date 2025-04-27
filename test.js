const fs = require('fs');
const readline = require('readline');
const { shlw64, verifyShlw64 } = require('./index'); // <- Corrected to your actual hasher file

// Step 1: Generate dictionary.txt automatically
const dictionary = [
  'password', '123456', 'qwerty', 'letmein', 'admin', 
  'welcome', 'monkey', 'abc123', 'dragon', 'jeck1224', 
  'football', 'iloveyou', 'secret', 'god', 'trustno1'
];

// Save to dictionary.txt
fs.writeFileSync('dictionary.txt', dictionary.join('\n'));
console.log('✅ dictionary.txt created with common passwords.\n');

// Step 2: Create prompt to ask user for a hash
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter hash value only to crack: ', async (hashInput) => {
  console.log(`\nStarting crack attempt on hash: ${hashInput}\n`);

  const passwords = fs.readFileSync('dictionary.txt', 'utf-8').split('\n');
  let cracked = false;

  for (const password of passwords) {
    const isMatch = verifyShlw64(password, hashInput);

    if (isMatch) {
      console.log(`\n✅ Password cracked successfully!`);
      console.log(`Original password: "${password}"`);
      cracked = true;
      break;
    }
  }

  if (!cracked) {
    console.log(`\n❌ Failed to crack the hash using dictionary.txt.`);
  }

  rl.close();
});
