import { makeObservable, action, observable } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { ImageFile } from './types';
import { initImageFile } from './init';

class ImageFileStore {
  rootStore: RootStore;
  imageFile: ImageFile = initImageFile;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      imageFile: observable,
      imageFileUpdate: action,
      reset: action,
    });
  }

  imageFileUpdate(imageFile: Partial<ImageFile>): void {
    this.imageFile = {
      id: imageFile?.id || this.imageFile.id,
      name: imageFile?.name || this.imageFile.name,
      url: imageFile?.url || this.imageFile.url,
    }
  }

  reset(): void {
    this.imageFile = initImageFile;
  }
}

export {
  ImageFileStore,
};
