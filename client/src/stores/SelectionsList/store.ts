import { makeObservable, action, observable, runInAction } from 'mobx';

import { RootStore } from 'stores/Root';
import { SelectionStore, SelectionSize } from 'stores/Selection';
import { initSelectionsList } from './init';

class SelectionsListStore {

  private readonly rootStore: RootStore;

  public selectionsList: Array<SelectionStore> = initSelectionsList;
  public activeID = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      selectionsList: observable,
      activeID: observable,

      selectionCreate: action.bound,
      selectionRecognize: action.bound,

      selectionRemove: action,
      selectionActivate: action,
      reset: action,
    });
  }

  async selectionCreate(screenRectangle: SelectionSize): Promise<void> {
    const selection = new SelectionStore(this.rootStore, screenRectangle);
    this.selectionsList.push(selection);

    // side-effect
    await runInAction(async () => {
      await selection.recognize();
    });
  }

  async selectionRecognize(id: string): Promise<void> {
    const selection = this.selectionsList.find(s => s.id === id);
    if (!selection) {
      return;
    }

    // side-effect
    await runInAction(async () => {
      await selection.recognize();
    });
  }

  selectionRemove(id: string): void {
    this.selectionsList = this.selectionsList.filter(s => s.id !== id);
  }

  selectionActivate(id: string): void {
    this.activeID = id;
  }

  reset(): void {
    this.selectionsList = initSelectionsList;
    this.activeID = '';
  }
}

export {
  SelectionsListStore,
};
