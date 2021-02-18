import { FileStore } from 'stores/File/store';
import { StatsStore } from 'stores/Stats/store';

export type GeneralStores = {
  fileStore: FileStore,
  statsStore: StatsStore,
};

export type GeneralStore = FileStore | StatsStore;
