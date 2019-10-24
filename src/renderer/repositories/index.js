import DataStore from 'nedb';
import path from 'path';

const { remote } = window.require('electron');

export default new DataStore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/procurement.db'),
});
