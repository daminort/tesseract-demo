import { Server, Request } from 'miragejs';

import { ROUTES } from 'common/constants/routes';
import { createRecognizeResponse } from 'mocks/selections/selections.mocks';

function recognize(server: Server): void {
  server.post(ROUTES.recognize, (schema: unknown, req: Request) => {
    return createRecognizeResponse(req);
  });
}

export {
  recognize,
};
