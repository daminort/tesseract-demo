import React, { FC, createContext, useContext } from 'react';
import { StatsStore, statsStore } from './store';

const context = createContext<StatsStore>(statsStore);

const StatsStoreProvider: FC = ({ children }) => {
  const { Provider } = context;

  return (
    <Provider value={statsStore}>
      {children}
    </Provider>
  );
};

const useStatsStore = (): StatsStore => useContext(context);

export {
  StatsStoreProvider,
  useStatsStore,
};
