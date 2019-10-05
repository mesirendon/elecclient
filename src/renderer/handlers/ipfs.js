import Vue from 'vue';
import FormData from 'form-data';

const protocol = 'http';
const url = 'localhost';
const port = '5002';

const ipfs = {
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
