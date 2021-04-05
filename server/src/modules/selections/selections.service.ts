import { resolve } from 'path';
import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

import { UPLOADS_PATH, IMAGE_EXTENSION } from 'common/constants/files';
import { SelectionRequestDto } from 'modules/selections/selection.request.dto';
import { SelectionResponseDto } from 'modules/selections/selection.response.dto';

@Injectable()
export class SelectionsService {
  async recognize(selection: SelectionRequestDto): Promise<SelectionResponseDto> {

    const fileName = resolve(UPLOADS_PATH, `${selection.fileID}.${IMAGE_EXTENSION}`);
    const rectangle = {
      left: selection.left,
      top: selection.top,
      width: selection.width,
      height: selection.height,
    };

    const worker = createWorker();

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(fileName, { rectangle });

    await worker.terminate();

    const result = new SelectionResponseDto(selection);
    result.text = data.text;
    result.confidence = data.confidence;

    return result;
  }
}
