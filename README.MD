# Base32(c)

Base32 with custom padding character (c).

## Usage

base32c aims to simplify and add the flexibility of base32 to suit different use cases. For example, we can change the Padding Character from `=` to `$` to QR Code Encoding.

`npm install base32c`

```typescript
import * as base32 from 'base32c';

// The Encoded String will be padded with '$'
// i.e : JA$$$$$$
const encodedString = base32.encode('i am any string', '\\$');

// Decode the Base32 with pre-defined Custom Padding Character
base32.decode(encodedString, 'utf-8', '\\$');
```
