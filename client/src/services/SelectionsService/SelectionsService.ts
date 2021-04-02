import { AxiosError } from 'axios';
import { ROUTES } from 'common/constants/routes';
import { BaseService } from 'services/BaseService';
import { RecognizeRequest, RecognizeResponse } from 'services/SelectionsService/types';

class SelectionsService extends BaseService {

  async recognize(data: RecognizeRequest): Promise<RecognizeResponse | null> {
    try {
      const response = await this.agent.post(ROUTES.recognize, data);
      return this.processResponse<RecognizeResponse>(response);

    } catch (error: unknown) {
      return this.processError(error as AxiosError);
    }
  }
}

const selectionsService = new SelectionsService();

export {
  selectionsService,
};
