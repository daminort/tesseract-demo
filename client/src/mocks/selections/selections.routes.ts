import { Server, Request } from 'miragejs';
import { RoutesAPI } from 'common/enums/routes-api';
import { createRecognizeResponse } from 'mocks/selections/selections.mocks';

function recognize(server: Server) {
  server.post(RoutesAPI.recognize, (schema: unknown, req: Request) => {
    const res = createRecognizeResponse(req);
    return res;
  });
}

export {
  recognize,
};
