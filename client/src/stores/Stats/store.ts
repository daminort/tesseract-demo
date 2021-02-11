import { makeObservable, action, observable } from 'mobx';

import { StatsFile, StatsImage, StatsScale } from './types';
import { initFile, initImage, initScale } from './init';

class StatsStore {
  file: StatsFile = initFile;
  image: StatsImage = initImage;
  scale: StatsScale = initScale;

  constructor() {
    makeObservable(this, {
      file: observable,
      image: observable,
      scale: observable,

      fileUpdate: action,
      imageUpdate: action,
      scaleUpdate: action,
      reset: action,
    });
  }

  fileUpdate(file: Partial<StatsFile>): void {
    this.file = {
      name: file?.name || this.file.name,
      url: file?.url || this.file.url,
    }
  }

  imageUpdate(image: Partial<StatsImage>): void {
    this.image = {
      width: image?.width || this.image.width,
      height: image?.height || this.image.height,
    }
  }

  scaleUpdate(scale: StatsScale): void {
    this.scale = scale;
  }

  reset(): void {
    this.file = initFile;
    this.image = initImage;
    this.scale = initScale;
  }
}

const Stats = new StatsStore();

export {
  StatsStore,
  Stats,
};
