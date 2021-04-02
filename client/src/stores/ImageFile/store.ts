import { makeObservable, action, observable } from 'mobx';

import { uploadService } from 'services/UploadService';
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
      imageUpload: action.bound,
    });
  }

  imageFileUpdate(imageFile: Partial<ImageFile>): void {
    this.imageFile = {
      id: imageFile?.id || this.imageFile.id,
      name: imageFile?.name || this.imageFile.name,
      url: imageFile?.url || this.imageFile.url,
    }
  }

  async imageUpload(file: File): Promise<void> {
    const result = await uploadService.upload({ file });
    if (result) {
      this.imageFileUpdate(result);
    }
  }
}

export {
  ImageFileStore,
};
