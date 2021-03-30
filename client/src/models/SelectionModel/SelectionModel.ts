import { selectionsService, RecognizeRequest } from 'services/SelectionsService';
import { SelectionSize } from 'models/SelectionModel/types';
import { v4 as uuid } from 'uuid';

class SelectionModel {

  public readonly fileID: string;
  public readonly id: string;
  public readonly screen: SelectionSize;
  public readonly real: SelectionSize;

  public text = '';
  public confidence = 0;

  constructor(fileID: string, screen: SelectionSize, scale: number) {
    this.fileID = fileID;
    this.id = uuid();
    this.screen = screen;
    this.real = {
      top: Number((screen.top * scale).toFixed(2)),
      left: Number((screen.left * scale).toFixed(2)),
      width: Number((screen.width * scale).toFixed(2)),
      height: Number((screen.height * scale).toFixed(2)),
    };
  }

  async recognize(): Promise<void> {
    const { top, left, width, height } = this.real;
    const req: RecognizeRequest = {
      fileID: this.fileID,
      selectionID: this.id,
      top,
      left,
      width,
      height,
    };

    const res = await selectionsService.recognize(req);
    if (!res) {
      this.text = 'Text is not recognized...';

    } else {
      this.text = res.text;
      this.confidence = res.confidence;
    }
  }
}

export {
  SelectionModel,
};
