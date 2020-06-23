import * as base32 from '../src';

var utf8Str = [
  'H',
  'He',
  'Hel',
  'Hell',
  'Hello',
  'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.',
  'Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation.',
  '中文',
  '中文1',
  '中文12',
  'aécio',
  '𠜎',
  'Base64是一種基於64個可列印字元來表示二進制資料的表示方法'
];

var base32Utf8Strs = [
  'JA======',
  'JBSQ====',
  'JBSWY===',
  'JBSWY3A=',
  'JBSWY3DP',
  'JVQW4IDJOMQGI2LTORUW4Z3VNFZWQZLEFQQG433UEBXW43DZEBRHSIDINFZSA4TFMFZW63RMEBRHK5BAMJ4SA5DINFZSA43JNZTXK3DBOIQHAYLTONUW63RAMZZG63JAN52GQZLSEBQW42LNMFWHGLBAO5UGSY3IEBUXGIDBEBWHK43UEBXWMIDUNBSSA3LJNZSCYIDUNBQXIIDCPEQGCIDQMVZHGZLWMVZGC3TDMUQG6ZRAMRSWY2LHNB2CA2LOEB2GQZJAMNXW45DJNZ2WKZBAMFXGIIDJNZSGKZTBORUWOYLCNRSSAZ3FNZSXEYLUNFXW4IDPMYQGW3TPO5WGKZDHMUWCAZLYMNSWKZDTEB2GQZJAONUG64TUEB3GK2DFNVSW4Y3FEBXWMIDBNZ4SAY3BOJXGC3BAOBWGKYLTOVZGKLQ=',
  'IJQXGZJWGQQGS4ZAMEQGO4TPOVYCA33GEBZWS3LJNRQXEIDCNFXGC4TZFV2G6LLUMV4HIIDFNZRW6ZDJNZTSA43DNBSW2ZLTEB2GQYLUEBZGK4DSMVZWK3TUEBRGS3TBOJ4SAZDBORQSA2LOEBQW4ICBKNBUSSJAON2HE2LOM4QGM33SNVQXIIDCPEQHI4TBNZZWYYLUNFXGOIDJOQQGS3TUN4QGCIDSMFSGS6BNGY2CA4TFOBZGK43FNZ2GC5DJN5XC4===',
  '4S4K3ZUWQ4======',
  '4S4K3ZUWQ4YQ====',
  '4S4K3ZUWQ4YTE===',
  'MHB2SY3JN4======',
  '6CQJZDQ=',
  'IJQXGZJWGTTJRL7EXCAOPKFO4WP3VZUWXQ3DJZMARPSY7L7FRCL6LDNQ4WWZPZMFQPSL5BXIUGUOPJF24S5IZ2MAWLSYRNXIWOD6NFUZ46NIJ2FBVDT2JOXGS246NM4V'
];

var base32Invalid8Strs = [
  '1 ======'
];

/**
 * base32 test
 */
describe("base32 Test", () => {
  describe('encode', function() {

    describe('UTF8', function() {
      it('should be successful', function() {
        for(var i = 0;i < utf8Str.length;++i) {
          expect(base32.encode(utf8Str[i])).toBe(base32Utf8Strs[i]);
        }
      });
    });

    describe('Array', function() {
      describe('Array', function() {
        it('should be successful', function() {
          expect(base32.encode([72])).toBe('JA======');
          expect(base32.encode([72, 101])).toBe('JBSQ====');
          expect(base32.encode([72, 101, 108])).toBe('JBSWY===');
          expect(base32.encode([72, 101, 108, 108])).toBe('JBSWY3A=');
          expect(base32.encode([72, 101, 108, 108, 111])).toBe('JBSWY3DP');
        });
      });

      describe('Uint8Array', function() {
        it('should be successful', function() {
          expect(base32.encode(new Uint8Array([72, 101, 108, 108, 111]))).toBe('JBSWY3DP');
        });
      });

      describe('ArrayBuffer', function() {
        it('should be successful', function() {
          expect(base32.encode(new ArrayBuffer(1))).toBe('AA======');
        });
      });
    });
  });

  describe('decode', function() {
    describe('UTF8', function() {
      it('should be successful', function() {
        for(var i = 0;i < utf8Str.length;++i) {
          expect(base32.decode(base32Utf8Strs[i], 'utf-8')).toBe(utf8Str[i]);
        }
      });
    });

    describe('when invalid string', function () {
      for (var i = 0; i < base32Invalid8Strs.length; ++i) {
        (function (i) {
          it('should throw exception', function () {
            expect(function () {
              base32.decode(base32Invalid8Strs[i], 'buffer');
            }).toThrowError();
          });
        })(i);
      }
    });
  });
})
