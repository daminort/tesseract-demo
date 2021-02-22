import React, { FC, createContext, useContext } from 'react';

import { GeneralStores } from 'stores/General/types';
import { fileStore } from 'stores/File';
import { selectionsStore } from 'stores/Selections';
import { statsStore } from 'stores/Stats';

const stores: GeneralStores = {
  fileStore,
  selectionsStore,
  statsStore,
};

const context = createContext<GeneralStores>(stores);

const GeneralStoresProvider: FC = ({ children }) => {
  const { Provider } = context;

  return (
    <Provider value={stores}>
      {children}
    </Provider>
  );
};

function useGeneralStore<T>(storeKey: keyof GeneralStores): T {
  const generalStore = useContext(context);
  const store = generalStore[storeKey];

  return (store as unknown as T);
}

export {
  GeneralStoresProvider,
  useGeneralStore,
};
