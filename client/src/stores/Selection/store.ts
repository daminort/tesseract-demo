import { makeObservable, action, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

import { TEXT_TEMPORARY, TEXT_ERROR } from 'common/constants/selections';
import { RootStore } from 'stores/Root';
import { selectionsService, RecognizeRequest } from 'services/SelectionsService';
import { SelectionSize } from 'stores/Selection/types';

class SelectionStore {

  private readonly rootStore: RootStore;
  private readonly fileID: string;

  public readonly id: string;
  public readonly screen: SelectionSize;
  public readonly real: SelectionSize;

  public text = TEXT_TEMPORARY;
  public confidence = 0;

  constructor(rootStore: RootStore, screen: SelectionSize) {
    this.rootStore = rootStore;
    this.fileID = rootStore.imageFileStore.imageFile.id;

    makeObservable(this, {
      id: observable,
      screen: observable,
      real: observable,
      text: observable,
      confidence: observable,

      recognize: action.bound,
      update: action.bound,
    });

    const { scale } = rootStore.statsStore;

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
      this.update(TEXT_ERROR, 0);

    } else {
      this.update(res.text, res.confidence);
    }
  }

  update(text: string, confidence: number): void {
    this.text = text;
    this.confidence = confidence;
  }
}

export {
  SelectionStore,
};
