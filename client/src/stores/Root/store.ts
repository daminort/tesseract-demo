import { ImageFileStore } from 'stores/ImageFile';
import { SelectionsStore } from 'stores/Selections';
import { StatsStore } from 'stores/Stats';

class RootStore {
  imageFileStore: ImageFileStore;
  selectionsStore: SelectionsStore;
  statsStore: StatsStore;

  constructor() {
    this.imageFileStore = new ImageFileStore(this);
    this.selectionsStore = new SelectionsStore(this);
    this.statsStore = new StatsStore(this);
  }
}

const rootStore = new RootStore();

export {
  RootStore,
  rootStore,
};
