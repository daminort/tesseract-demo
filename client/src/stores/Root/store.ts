import { FileStore } from 'stores/File';
import { SelectionsStore } from 'stores/Selections';
import { StatsStore } from 'stores/Stats';

class RootStore {
  fileStore: FileStore;
  selectionsStore: SelectionsStore;
  statsStore: StatsStore;

  constructor() {
    this.fileStore = new FileStore(this);
    this.selectionsStore = new SelectionsStore(this);
    this.statsStore = new StatsStore(this);
  }
}

const rootStore = new RootStore();

export {
  RootStore,
  rootStore,
};
