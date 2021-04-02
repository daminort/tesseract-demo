import { AxiosError } from 'axios';
import { ROUTES } from 'common/constants/routes';
import { BaseService } from 'services/BaseService';
import { UploadRequest, UploadResponse } from 'services/UploadService/types';

class UploadService extends BaseService {

  async upload(data: UploadRequest): Promise<UploadResponse | null> {
    const formData = new FormData();
    formData.append('file', data.file);

    try {
      const response = await this.agent.post(ROUTES.upload, formData);
      return this.processResponse<UploadResponse>(response);

    } catch (error: unknown) {
      return this.processError(error as AxiosError);
    }
  }
}

const uploadService = new UploadService();

export {
  uploadService,
};
