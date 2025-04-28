# Shlw64

**Shlw64** is a lightweight and secure 64-bit hash function designed for mid security purposes. It combines salting, rotation, and cryptographic techniques to produce a robust hash that is suitable for various applications requiring high security.

## Features

**Lightweight:** Designed for speed and efficiency while maintaining a high level of security.

**Multiple Layers of Security:** Includes salting (12 rounds), binary rotations, and a cryptographic hash (SHA-256).

**Customizable:** Supports additional randomness(removed) using nonces and random values to further secure hashes.

**Pepper Support:** Add a pepper key for added security.


## Installation

Install the `shlw64` package via npm:

```bash
npm install shlw64
```

## Updates

**1.1.0** — Initial release of Shlw64 with basic functionality.

**1.2.0** — Performance improvements and added minor optimizations to the hashing process.

**1.4.1** — Removed unnecessary randomization, making the hash value deterministic and lockable; introduced further security enhancements and tools.

**1.5.1** — Enhances **Security Features** making it more **complex** and **reliable**.

**1.6.2** — Added **Error Handling** and **Fixed double rotation and salting round**.

> **Coming Soon:** New features, optimizations, and support for broader use cases.



### Key Updates:

1. **1.1.0** — Clear initial release, establishing the base functionality.


2. **1.2.0** — Highlighted **performance** improvements and optimizations.


3. **1.4.1** — Explained the removal of randomness to make the hash deterministic and lockable.

4. **1.5.1** — Enhances **Security Features**.

5. **1.6.2** — Added **error handling** and fix a **bug**

## Usage

To use the` shlw64` package in your project:

```javascript
const { shlw64 } = require('shlw64');

const hashedPassword = shlw64('example');

console.log(hashedPassword); // Returns a deterministic hash
```

## Reports

**Other people claiming about why does that it for security purposes? if you all asking why? it's because it's new so it can't be brute-force just report the bugs to me i will fix it quickly(note: `shlw64`` is still developing)**
