import DataStore from 'nedb';
import path from 'path';
import { remote } from '@/repositories';
import { DB_FOLDER } from '@/store/constants';

export default new DataStore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), DB_FOLDER, 'account.db'),
});
