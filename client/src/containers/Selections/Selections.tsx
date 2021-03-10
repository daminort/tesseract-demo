import React, { FC, useCallback } from 'react';
import clsx from 'clsx';
import { observer, useObserver } from 'mobx-react-lite';

import { useGeneralStore } from 'stores/General';
import { SelectionsStore } from 'stores/Selections';

import './Selections.scss';

const Selections: FC = observer(() => {

  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const { selections, activeID } = selectionsStore;

  const onClick = useCallback((id) => () => {
    selectionsStore.selectionActivate(id);
  }, []);

  return useObserver(() => (
    <div className="root-selections">
      {selections.map((selection, index) => {
        const { id, screen, real } = selection;

        const screenStart = `Screen: ${(screen.left).toFixed(2)}, ${(screen.top).toFixed(2)}`;
        const realStart = `Real: ${(real.left).toFixed(2)}, ${(real.top).toFixed(2)}`;

        const screenEnd = `Screen: ${(screen.left + screen.width).toFixed(2)}, ${(screen.top + screen.height).toFixed(2)}`;
        const realEnd = `Real: ${(real.left + real.width).toFixed(2)}, ${(real.top + real.height).toFixed(2)}`;

        const selectionClass = clsx('selection', {
          active: id === activeID,
        });

        return (
          <div key={id} className={selectionClass} onClick={onClick(id)}>
            <div className="title">ID: {id}</div>
            <div className="start">
              <span className="screen">{screenStart}</span>
              <span className="delimiter">|</span>
              <span className="real">{realStart}</span>
            </div>
            <div className="end">
              <span className="screen">{screenEnd}</span>
              <span className="delimiter">|</span>
              <span className="real">{realEnd}</span>
            </div>
            <div className="badge">{index + 1}</div>
          </div>
        );
      })}
    </div>
  ));
});

export { Selections };
