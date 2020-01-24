import ethCrypto from 'eth-crypto';

const cipher = {
  /**
   * Encrypted the content using the publicTenderKey
   * @param publicKey public key of the tender
   * @param content JSON with the plain object
   * @returns {Promise<{}>}
   */
  encrypt: (publicKey, content) => new Promise((resolve, reject) => {
    ethCrypto.encryptWithPublicKey(publicKey, content)
      .then(resolve)
      .catch(reject);
  }),
  /**
   * Decrypted the content using the privateTenderKey
   * @param privateKey private key of the tender
   * @param content JSON with the encrypted object
   * @returns {Promise<{}>}
   */
  decrypt: (privateKey, content) => new Promise((resolve, reject) => {
    ethCrypto.decryptWithPrivateKey(privateKey, content)
      .then(resolve)
      .catch(reject);
  }),
};

export default cipher;
