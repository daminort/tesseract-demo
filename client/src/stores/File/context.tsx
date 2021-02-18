import React, { FC, createContext, useContext } from 'react';
import { FileStore, fileStore } from 'stores/File/store';

const context = createContext<FileStore>(fileStore);

const FileStoreProvider: FC = ({ children }) => {
  const { Provider } = context;

  return (
    <Provider value={fileStore}>
      {children}
    </Provider>
  );
};

const useFileStore = (): FileStore => useContext(context);

export {
  FileStoreProvider,
  useFileStore,
};
