import Vue from 'vue';
import FormData from 'form-data';

const ipfs = {
  add: ({ fileName, fileBuffer }) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', fileBuffer, fileName);
    Vue.http.post(
      'https://ipfs.infura.io:5001/api/v0/add',
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
