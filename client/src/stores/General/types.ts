import { FileStore } from 'stores/File/store';
import { SelectionsStore } from 'stores/Selections/store';
import { StatsStore } from 'stores/Stats/store';

export type GeneralStores = {
  fileStore: FileStore,
  selectionsStore: SelectionsStore,
  statsStore: StatsStore,
};
