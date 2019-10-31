
export const { remote } = window.require('electron');

const files = require.context('.', false, /\.js$/);
const db = {};

files.keys()
  .forEach((key) => {
    if (key === './index.js') return;
    db[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
  });

export { db };
