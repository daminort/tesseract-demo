import faker from 'faker';
import { Request } from 'miragejs';

import { RecognizeRequest, RecognizeResponse } from 'services/SelectionsService/types';
import { MockUtils } from 'utils/MockUtils';

function createRecognizeResponse(req: Request): RecognizeResponse {
  const { requestBody } = req;
  const body = MockUtils.parseJSON<RecognizeRequest>(requestBody);
  const res: RecognizeResponse = {
    fileID: body.fileID,
    selectionID: body.selectionID,
    top: body.top,
    left: body.left,
    width: body.width,
    height: body.height,
    text: faker.lorem.sentence(),
    confidence: 93.4,
  };

  return res;
}

export {
  createRecognizeResponse,
};
