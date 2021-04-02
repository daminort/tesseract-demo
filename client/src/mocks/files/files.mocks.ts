import faker from 'faker';
import { v4 as uuid } from 'uuid';

import { UploadResponse } from 'services/UploadService';

function createUploadResponse(): UploadResponse {
  const res: UploadResponse = {
    id: uuid(),
    name: `${faker.system.fileName()}.png`,
    url: '/images/book.gif',
  };

  return res;
}

export {
  createUploadResponse,
};
