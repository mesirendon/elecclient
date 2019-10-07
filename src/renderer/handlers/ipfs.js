import Vue from 'vue';
import FormData from 'form-data';

const protocol = 'http';
const url = 'localhost';
const port = '5002';

const ipfs = {
  /**
   * @typedef {Object} ipfsResponse
   * @property {string} Name Uploaded file name
   * @property {string} Hash Uploaded file hash
   * @property {number} Size Uploaded file size in bytes
   */

  /**
   * Adds the specified file into the IPFS network
   * @param {Object} file
   * @param {string} file.fileName File name
   * @param {Buffer} file.fileBuffer File buffer
   * @return {Promise<ipfsResponse>}
   */
  add: ({ fileName, fileBuffer }) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', fileBuffer, fileName);
    Vue.http.post(
      `${protocol}://${url}:${port}/api/v0/add`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'X-Requested-With',
        },
      },
    )
      .then(res => resolve(res.data))
      .catch(reject);
  }),
};

export default ipfs;
