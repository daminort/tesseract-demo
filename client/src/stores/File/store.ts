import { makeObservable, action, observable } from 'mobx';

import { File } from './types';
import { initFile } from './init';

class FileStore {
  file: File = initFile;

  constructor() {
    makeObservable(this, {
      file: observable,
      fileUpdate: action,
      reset: action,
    });
  }

  fileUpdate(file: Partial<File>): void {
    this.file = {
      name: file?.name || this.file.name,
      url: file?.url || this.file.url,
    }
  }

  reset(): void {
    this.file = initFile;
  }
}

const fileStore = new FileStore();

export {
  FileStore,
  fileStore,
};
