import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'stores/Root';
import { SelectionsListStore } from 'stores/SelectionsList';
import { Selection } from 'containers/Selection';

import 'containers/SelectionsList/SelectionsList.scss';

const SelectionsList: FC = observer(() => {

  const selectionsListStore = useStore<SelectionsListStore>('selectionsListStore');
  const { selectionsList, activeID } = selectionsListStore;

  const onClick = useCallback((id: string) => {
    selectionsListStore.selectionActivate(id);
  }, []);

  const onRemove = useCallback((id: string) => {
    selectionsListStore.selectionRemove(id);
  }, []);

  return (
    <div className="root-selections">
      {selectionsList.map((selection) => {
        const isActive = selection.id === activeID;

        return (
          <Selection
            key={selection.id}
            selection={selection}
            isActive={isActive}
            onClick={onClick}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
});

export { SelectionsList };
