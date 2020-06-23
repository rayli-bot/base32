export const BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
export const BASE32_DECODE_CHAR = {
  'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
  'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
  'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
  'Z': 25, '2': 26, '3': 27, '4': 28, '5': 29, '6': 30, '7': 31
};


export type BASE32 = 
  "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|
  "I"|"J"|"K"|"L"|"M"|"N"|"O"|"P"|
  "Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|
  "Y"|"Z"|"2"|"3"|"4"|"5"|"6"|"7";