import { selectionsService, RecognizeRequest, RecognizeResponse } from 'services/SelectionsService';
import { Selection } from 'stores/Selections';

class SelectionsModel {

  async recognize(selection: Selection, fileID: string): Promise<Selection> {
    const { top, left, width, height } = selection.real;
    const req: RecognizeRequest = {
      fileID,
      top,
      left,
      width,
      height,
      selectionID: selection.id,
    };

    const res = await selectionsService.recognize(req);
    if (!res) {
      return selection;
    }

    const resSelection: Selection = {
      ...selection,
      text: res.text,
      confidence: res.confidence,
    };

    return resSelection;
  }
}

const selectionsModel = new SelectionsModel();

export {
  selectionsModel,
};
