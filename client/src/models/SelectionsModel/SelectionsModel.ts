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

    const resSelection: Selection = {
      ...selection,
    };

    const res = await selectionsService.recognize(req);
    if (!res) {
      resSelection.text = 'Error: text is not recognized...';

    } else {
      resSelection.text = res.text;
      resSelection.confidence = res.confidence;
    }

    return resSelection;
  }
}

const selectionsModel = new SelectionsModel();

export {
  selectionsModel,
};
