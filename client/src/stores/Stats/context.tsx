import React, { FC, createContext, useContext } from 'react';
import { StatsStore, Stats } from './store';

const context = createContext<StatsStore>(Stats);

const StatsProvider: FC = ({ children }): React.ReactElement => {
  const { Provider } = context;

  return (
    <Provider value={Stats}>
      {children}
    </Provider>
  );
};

const useStatsStore = (): StatsStore => useContext(context);

export {
  StatsProvider,
  useStatsStore,
};
