import React, { FC } from 'react';

import { RootProvider } from 'stores/Root';
import { NavBar } from 'containers/NavBar';
import { Preview } from 'containers/Preview';
import { Selections } from 'containers/Selections';

import './App.scss';

const App: FC = () => {
  return (
    <div className="root-app">
      <RootProvider>
        <NavBar />
        <div className="content">
          <Preview />
          <Selections />
        </div>
      </RootProvider>
    </div>
  );
}

export {
  App,
};
