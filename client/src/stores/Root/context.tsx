import React, { FC, createContext, useContext } from 'react';
import { RootStore, rootStore } from 'stores/Root/store';

const context = createContext<RootStore>(rootStore);

const RootProvider: FC = ({ children }) => {
  const { Provider } = context;

  return (
    <Provider value={rootStore}>
      {children}
    </Provider>
  );
};

function useRootStore(): RootStore {
  return useContext(context);
}

function useStore<T>(storeKey: keyof RootStore): T {
  const rootStore = useRootStore();
  const store = rootStore[storeKey];

  return (store as unknown as T);
}

export {
  RootProvider,
  useRootStore,
  useStore,
};
