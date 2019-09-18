import Datastore from 'nedb';
import path from 'path';

const { remote } = window.require('electron');

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db'),
});
