import { encodeBytes } from "./bytes";
import { encodeUtf8 } from "./utf-8";

export function encode(input: string | Uint8Array | ArrayBuffer | Array<number>, padder = '=') {
  if (input instanceof ArrayBuffer || Array.isArray(input)) {
    return encodeBytes(new Uint8Array(input), padder);
  } else if (input instanceof Uint8Array) {
    return encodeBytes(input, padder);
  } else {
    return encodeUtf8(input, padder);
  }
};
