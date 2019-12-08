import ethCrypto from 'eth-crypto';

const cipher = {
  /**
   * Encrypted the content using the publicTenderKey
   * @param publicTenderKey public key of the tender
   * @param content JSON with the plain object
   * @returns {Promise<{}>}
   */
  encrypt: (publicTenderKey, content) => new Promise((resolve, reject) => {
    ethCrypto.encryptWithPublicKey(publicTenderKey, content)
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Decrypted the content using the privateTenderKey
   * @param privateKeyTender private key of the tender
   * @param content JSON with the encrypted object
   * @returns {Promise<{}>}
   */
  decrypt: (privateKeyTender, content) => new Promise((resolve, reject) => {
    ethCrypto.decryptWithPrivateKey(privateKeyTender, content)
      .then(resolve)
      .catch(reject);
  }),
};

export default cipher;
