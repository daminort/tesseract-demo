import { makeObservable, action, observable } from 'mobx';

import { Selection, Selections } from './types';
import { initSelections } from './init';

class SelectionsStore {
  selections: Selections = initSelections;
  activeID = '';

  constructor() {
    makeObservable(this, {
      selections: observable,
      activeID: observable,

      selectionUpsert: action,
      selectionRemove: action,
      selectionActivate: action,
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

  selectionActivate(id: string): void {
    this.activeID = id;
  }

  reset(): void {
    this.selections = initSelections;
    this.activeID = '';
  }
}

const selectionsStore = new SelectionsStore();

export {
  SelectionsStore,
  selectionsStore,
};
