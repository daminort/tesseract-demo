import { Server, Request } from 'miragejs';

import { RoutesAPI } from 'common/enums/routes-api';
import { createRecognizeResponse } from 'mocks/selections/selections.mocks';

function recognize(server: Server): void {
  server.post(RoutesAPI.recognize, (schema: unknown, req: Request) => {
    return createRecognizeResponse(req);
  });
}

export {
  recognize,
};
