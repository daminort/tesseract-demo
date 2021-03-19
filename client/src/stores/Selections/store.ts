import { makeObservable, action, observable, runInAction } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { selectionsModel } from 'models/SelectionsModel';
import { Selection, Selections } from './types';
import { initSelections } from './init';

class SelectionsStore {
  rootStore: RootStore;
  selections: Selections = initSelections;
  activeID = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      selections: observable,
      activeID: observable,

      selectionUpsert: action.bound,
      selectionUpdate: action.bound,
      selectionRemove: action,
      selectionActivate: action,
      reset: action,
    });
  }

  async selectionUpsert(selection: Selection): Promise<void> {
    const index = this.selections.findIndex(s => s.id === selection.id);
    if (index >= 0) {
      this.selections[index] = selection;
      return;
    }

    this.selections.push(selection);

    // side-effect
    const resSelection = await selectionsModel.recognize(selection, '0000');
    this.selectionUpdate(resSelection);
  }

  selectionUpdate(selection: Selection): void {
    const index = this.selections.findIndex(s => s.id === selection.id);
    if (index >= 0) {
      this.selections[index] = selection;
      return;
    }
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
