import { makeObservable, action, observable } from 'mobx';

import { Selection, Selections } from './types';
import { initSelections } from './init';

class SelectionsStore {
  selections: Selections = initSelections;

  constructor() {
    makeObservable(this, {
      selections: observable,

      selectionUpsert: action,
      selectionRemove: action,
      reset: action,
    });
  }

  selectionUpsert(selection: Selection): void {
    const index = this.selections.findIndex(s => s.id === selection.id);
    if (index >= 0) {
      this.selections[index] = selection;
      return;
    }

    this.selections.push(selection);
  }

  selectionRemove(id: string): void {
    this.selections = this.selections.filter(s => s.id !== id);
  }

  reset(): void {
    this.selections = initSelections;
  }
}

const selectionsStore = new SelectionsStore();

export {
  SelectionsStore,
  selectionsStore,
};
