import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  storageBackend: AsyncStorage,

  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,
});

export default storage;
