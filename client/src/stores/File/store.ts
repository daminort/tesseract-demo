import { makeObservable, action, observable } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { File } from './types';
import { initFile } from './init';

class FileStore {
  rootStore: RootStore;
  file: File = initFile;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      file: observable,
      fileUpdate: action,
      reset: action,
    });
  }

  fileUpdate(file: Partial<File>): void {
    this.file = {
      id: file?.id || this.file.id,
      name: file?.name || this.file.name,
      url: file?.url || this.file.url,
    }
  }

  reset(): void {
    this.file = initFile;
  }
}

export {
  FileStore,
};
