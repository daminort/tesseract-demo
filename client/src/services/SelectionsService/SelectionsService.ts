import { RoutesAPI } from 'common/enums/routes-api';
import { BaseService } from 'services/BaseService';
import { RecognizeRequest, RecognizeResponse } from 'services/SelectionsService/types';

class SelectionsService extends BaseService {

  async recognize(data: RecognizeRequest): Promise<RecognizeResponse | null> {
    try {
      const response = await this.agent.post(RoutesAPI.recognize, data);
      return this.processResponse<RecognizeResponse>(response);

    } catch (error) {
      return this.processError(error);
    }
  }
}

const selectionsService = new SelectionsService();

export {
  selectionsService,
};
