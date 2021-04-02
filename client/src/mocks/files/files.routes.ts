import { Server, Request } from 'miragejs';

import { ROUTES } from 'common/constants/routes';
import { createUploadResponse } from 'mocks/files/files.mocks';

function upload(server: Server): void {
  server.post(ROUTES.upload, () => {
    return createUploadResponse();
  });
}

export {
  upload,
};
