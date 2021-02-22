import React, { FC } from 'react';
import { observer, useObserver } from 'mobx-react-lite';

import { useGeneralStore } from 'stores/General';
import { SelectionsStore } from 'stores/Selections';

const Selections: FC = observer(() => {

  const selectionsStore = useGeneralStore<SelectionsStore>('selectionsStore');
  const { selections } = selectionsStore;

  return useObserver(() => (
    <div className="tx-selections w-2/6 p-2 mt-1">
      {selections.map(selection => {
        const { id, top, left, width, height } = selection;
        const title = `Top: ${top}, Left: ${left}`;
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
