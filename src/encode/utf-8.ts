import { BASE32_ENCODE_CHAR } from '../constant';

export function encodeUtf8(str: string, padder = '=') {
  let blocks = [0, 0, 0, 0, 0, 0, 0, 0];

  if (padder.length !== 1) {
    throw new Error('Expect Base32 Padder is 1 Character');
  }
  let v1, v2, v3, v4, v5, code, end = false, base32Str = '',
      index = 0, i, start = 0, length = str.length;
  do {
    blocks[0] = blocks[5];
    blocks[1] = blocks[6];
    blocks[2] = blocks[7];
    for (i = start; index < length && i < 5; ++index) {
      code = str.charCodeAt(index);
      if (code < 0x80) {
        blocks[i++] = code;
      } else if (code < 0x800) {
        blocks[i++] = 0xc0 | (code >> 6);
        blocks[i++] = 0x80 | (code & 0x3f);
      } else if (code < 0xd800 || code >= 0xe000) {
        blocks[i++] = 0xe0 | (code >> 12);
        blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
        blocks[i++] = 0x80 | (code & 0x3f);
      } else {
        code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++index) & 0x3ff));
        blocks[i++] = 0xf0 | (code >> 18);
        blocks[i++] = 0x80 | ((code >> 12) & 0x3f);
        blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
        blocks[i++] = 0x80 | (code & 0x3f);
      }
    }
    start = i - 5;
    if (index === length) {
      ++index;
    }
    if (index > length && i < 6) {
      end = true;
    }
    v1 = blocks[0];
    if (i > 4) {
      v2 = blocks[1];
      v3 = blocks[2];
      v4 = blocks[3];
      v5 = blocks[4];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
        BASE32_ENCODE_CHAR[v5 & 31];
    } else if (i === 1) {
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
        padder.repeat(6);
    } else if (i === 2) {
      v2 = blocks[1];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
        padder.repeat(4);
    } else if (i === 3) {
      v2 = blocks[1];
      v3 = blocks[2];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
        padder.repeat(3);
    } else {
      v2 = blocks[1];
      v3 = blocks[2];
      v4 = blocks[3];
      base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
        BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
        BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
        BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
        BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
        BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
        BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
        padder;
    }
  } while (!end);
  return base32Str;
}