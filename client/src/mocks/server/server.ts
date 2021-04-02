import { createServer } from 'miragejs';

import { ROUTES } from 'common/constants/routes';
import { config } from 'common/config/config';
import { options } from 'mocks/server/options';
import { recognize } from 'mocks/selections/selections.routes';
import { upload } from 'mocks/files/files.routes';

function createMockServer(): void {
  if (!config.isDevelopment) {
    return;
  }

  const needToMock = Object.values(options).some(value => value);
  if (!needToMock) {
    return;
  }

  createServer({
    routes() {
      this.namespace = '/api';
      this.timing = 500;

      if (options[ROUTES.recognize]) {
        recognize(this);
      }
      if (options[ROUTES.upload]) {
        upload(this);
      }

      this.passthrough();
    }
  })
}

export {
  createMockServer,
};
