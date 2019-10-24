import DataStore from 'nedb';
import path from 'path';
import { remote, DB_FOLDER } from '@/repositories';

export default new DataStore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), `${DB_FOLDER}/tender.db`),
});
