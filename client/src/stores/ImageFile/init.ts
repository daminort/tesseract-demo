import { v4 as uuid } from 'uuid';
import { ImageFile } from 'stores/ImageFile/types';

const initImageFile: ImageFile = {
  id: uuid(),
  name: 'No file',
  url: '/images/no-data.png',
};

export {
  initImageFile,
};
