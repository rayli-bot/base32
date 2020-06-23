import { BASE32_DECODE_CHAR, BASE32 } from './constant';


function decodeAsBytes(base32Str: string, padder = '=') {
  const base32Reg = new RegExp(`^[A-Z2-7${padder}]+$`, 'g');
  if (!base32Reg.test(base32Str)) {
    throw new Error('Invalid base32 characters');
  } else if (padder.length !== 1) {
    throw new Error('Invalid Padding Character');
  }

  const reg = new RegExp(padder, 'g');
  base32Str = base32Str.replace(reg, '');
  let v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length;

  // 4 char to 3 bytes
  let i = 0, count = length >> 3 << 3;
  for (; i < count;) {
    v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
    bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
    bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
    bytes[index++] = (v7 << 5 | v8) & 255;
  }

  // remain bytes
  let remain = length - count;
  if (remain === 2) {
    v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
  } else if (remain === 4) {
    v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
  } else if (remain === 5) {
    v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
    bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
  } else if (remain === 7) {
    v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++) as BASE32];
    bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
    bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
    bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
    bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
  }
  return new Uint8Array(bytes);
};

export function decode(base32Str: string, format: 'utf-8', padder?: string): string;
export function decode(base32Str: string, format: 'buffer', padder?: string): Uint8Array;
export function decode(base32Str: string, format: 'utf-8' | 'buffer', padder = '=') {
  const decoded = decodeAsBytes(base32Str, padder);
  if (format === 'utf-8') {
    return Buffer.from(decoded).toString('utf-8');
  } else {
    return decoded;
  }
};