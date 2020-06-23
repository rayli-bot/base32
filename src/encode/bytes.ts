import { BASE32_ENCODE_CHAR } from '../constant';

export function encodeBytes(bytes: Uint8Array, padder = '=') {
  if (padder.replace('\\', '').length !== 1) {
    throw new Error('Expect Base32 Padder is 1 Character');
  }
  let v1, v2, v3, v4, v5, base32Str = '', length = bytes.length;
  let i = 0, count = parseInt((length / 5).toString()) * 5;
  for (; i < count;) {
    v1 = bytes[i++];
    v2 = bytes[i++];
    v3 = bytes[i++];
    v4 = bytes[i++];
    v5 = bytes[i++];
    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
      BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
      BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
      BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
      BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
      BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
      BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
      BASE32_ENCODE_CHAR[v5 & 31];
  }

  // remain char
  let remain = length - count;
  if (remain === 1) {
    v1 = bytes[i];
    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
      BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
      padder.repeat(6);
  } else if (remain === 2) {
    v1 = bytes[i++];
    v2 = bytes[i];
    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
      BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
      BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
      BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
      padder.repeat(4);
  } else if (remain === 3) {
    v1 = bytes[i++];
    v2 = bytes[i++];
    v3 = bytes[i];
    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
      BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
      BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
      BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
      BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
      padder.repeat(3);
  } else if (remain === 4) {
    v1 = bytes[i++];
    v2 = bytes[i++];
    v3 = bytes[i++];
    v4 = bytes[i];
    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
      BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
      BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
      BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
      BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
      BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
      BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
      padder;
  }
  return base32Str;
}