import { ImageFileStore } from 'stores/ImageFile';
import { SelectionsListStore } from 'stores/SelectionsList';
import { StatsStore } from 'stores/Stats';

class RootStore {
  imageFileStore: ImageFileStore;
  selectionsListStore: SelectionsListStore;
  statsStore: StatsStore;

  constructor() {
    this.imageFileStore = new ImageFileStore(this);
    this.selectionsListStore = new SelectionsListStore(this);
    this.statsStore = new StatsStore(this);
  }
}

const rootStore = new RootStore();

export {
  RootStore,
  rootStore,
};
