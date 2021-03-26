import { v4 as uuid } from 'uuid';
import { ImageFile } from 'stores/ImageFile/types';

const initImageFile: ImageFile = {
  id: uuid(),
  name: 'book.gif',
  url: '/images/book.gif',
};

export {
  initImageFile,
};
