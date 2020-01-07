import Vue from 'vue';
import FormData from 'form-data';
import { development } from '@/handlers';

const protocol = development ? 'http' : 'https';
const url = development ? 'localhost' : 'ipfs.infura.io';
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
  /**
   * Gets a file from IPFS
   * @param {string} Hash - IPFS hash of the expected file
   * @return {Promise<ipfsResponse>}
   */
  get: Hash => new Promise((resolve, reject) => {
    Vue.http.post(`${protocol}://${url}:${port}/api/v0/cat?arg=${Hash}`)
      .then(res => resolve(res.data))
      .catch(reject);
  }),
};

export default ipfs;
