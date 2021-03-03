import React, { FC } from 'react';
import { observer, useObserver } from 'mobx-react-lite';

import { useGeneralStore } from 'stores/General';
import { SelectionsStore } from 'stores/Selections';

import './Selections.scss';

const Selections: FC = observer(() => {

  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const { selections } = selectionsStore;

  return useObserver(() => (
    <div className="root-selections">
      {selections.map(selection => {
        const { id, top, left, width, height } = selection;
        const title = `[${left}, ${top}] x [${left + width}, ${top + height}]`;
        return (
          <div className="mb-2" key={id}>
            <div className="font-normal">{title}</div>
            {/*<div className="pl-1">Some selected text: {title}...</div>*/}
          </div>
        );
      })}
    </div>
  ));
});

export { Selections };
