import { RoutesAPI } from 'common/enums/routes-api';
import { createServer } from 'miragejs';

import { config } from 'common/config/config';
import { options } from 'mocks/server/options';
import { recognize } from 'mocks/selections/selections.routes';

function createMockServer() {
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

      if (options[RoutesAPI.recognize]) {
        recognize(this);
      }
      if (options[RoutesAPI.upload]) {
        // upload mocks
      }

      this.passthrough();
    }
  })
}

export {
  createMockServer,
};
