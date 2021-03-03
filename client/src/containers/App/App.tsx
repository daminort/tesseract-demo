import React, { FC } from 'react';

import { GeneralStoresProvider } from 'stores/General';
import { NavBar } from 'containers/NavBar';
import { Preview } from 'containers/Preview';
import { Selections } from 'containers/Selections';

import './App.scss';

const App: FC = () => {
  return (
    <div className="root-app">
      <GeneralStoresProvider>
        <NavBar />
        <div className="content">
          <Preview />
          <Selections />
        </div>
      </GeneralStoresProvider>
    </div>
  );
}

export {
  App,
};
