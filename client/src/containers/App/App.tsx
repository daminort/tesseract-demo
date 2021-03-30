import React, { FC } from 'react';

import { RootProvider } from 'stores/Root';
import { NavBar } from 'containers/NavBar';
import { Preview } from 'containers/Preview';
import { SelectionsList } from 'containers/SelectionsList';

import './App.scss';

const App: FC = () => {
  return (
    <div className="root-app">
      <RootProvider>
        <NavBar />
        <div className="content">
          <div className="preview">
            <Preview />
          </div>
          <div className="selections">
            <SelectionsList />
          </div>
        </div>
      </RootProvider>
    </div>
  );
}

export {
  App,
};
