import { encodeBytes } from "./bytes";
import { encodeUtf8 } from "./utf-8";

export function encode(input: string | Uint8Array | ArrayBuffer | Array<number>, padder = '=') {
  if (padder.replace('\\', '').length !== 1) {
    throw new Error('Expect Base32 Padder is 1 Character');
  }

  padder = padder.replace('\\', '');

  if (input instanceof ArrayBuffer || Array.isArray(input)) {
    return encodeBytes(new Uint8Array(input), padder);
  } else if (input instanceof Uint8Array) {
    return encodeBytes(input, padder);
  } else {
    return encodeUtf8(input, padder);
  }
};
