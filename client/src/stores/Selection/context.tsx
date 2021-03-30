import { useStore } from 'stores/Root';
import { SelectionsListStore } from 'stores/SelectionsList';
import { SelectionStore } from 'stores/Selection/store';

function useSelectionStore(id: string): SelectionStore {
  const selectionsListStore = useStore<SelectionsListStore>('selectionsListStore');
  const { selectionsList } = selectionsListStore;

  const selectionStore = selectionsList.find(s => s.id === id);

  return (selectionStore as SelectionStore);
}

export {
  useSelectionStore,
};
