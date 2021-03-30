import { makeObservable, action, observable, runInAction } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { SelectionModel } from 'models/SelectionModel';
import { initSelections } from './init';

class SelectionsStore {

  public rootStore: RootStore;
  public selections: Array<SelectionModel> = initSelections;
  public activeID = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      selections: observable,
      activeID: observable,

      selectionUpsert: action.bound,
      selectionRecognize: action.bound,

      selectionRemove: action,
      selectionActivate: action,
      reset: action,
    });
  }

  async selectionUpsert(selection: SelectionModel): Promise<void> {
    const index = this.selections.findIndex(s => s.id === selection.id);
    if (index >= 0) {
      this.selections[index] = selection;
    } else {
      this.selections.push(selection);
    }

    // side-effect
    await runInAction(async () => {
      await selection.recognize();
    });
  }

  async selectionRecognize(id: string): Promise<void> {
    const selection = this.selections.find(s => s.id === id);
    if (!selection) {
      return;
    }

    await selection.recognize();
  }

  selectionRemove(id: string): void {
    this.selections = this.selections.filter(s => s.id !== id);
  }

  selectionActivate(id: string): void {
    this.activeID = id;
  }

  reset(): void {
    this.selections = initSelections;
    this.activeID = '';
  }
}

export {
  SelectionsStore,
};
