import { makeObservable, action, observable, computed } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { StatsFile, StatsImage, StatsWorkspace } from './types';
import { initFile, initImage, initWorkspace } from './init';

class StatsStore {
  rootStore: RootStore;
  file: StatsFile = initFile;
  image: StatsImage = initImage;
  workspace: StatsWorkspace = initWorkspace;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      file: observable,
      image: observable,
      workspace: observable,

      fileUpdate: action,
      imageUpdate: action,
      workspaceUpdate: action,
      reset: action,

      scale: computed,
    });
  }

  /**
   * Actions
   */
  fileUpdate(file: Partial<StatsFile>): void {
    this.file = {
      name: file?.name || this.file.name,
      url: file?.url || this.file.url,
    }
  }

  imageUpdate(image: Partial<StatsImage>): void {
    const width = image?.width || this.image.width;
    const height = image?.height || this.image.height;
    const ratio = height / width;

    this.image = {
      width,
      height,
      ratio,
    }
  }

  workspaceUpdate(workspace: Partial<StatsWorkspace>): void {
    this.workspace = {
      width: workspace?.width || this.workspace.width,
      height: workspace?.height || this.workspace.height,
      padding: workspace?.padding || this.workspace.padding,
    }
  }

  reset(): void {
    this.file = initFile;
    this.image = initImage;
    this.workspace = initWorkspace;
  }

  /**
   * Computed
   */
  get scale(): number {
    if (!this.workspace.width) {
      return 0;
    }

    const ratio = this.image.width / this.workspace.width;
    return Number(ratio.toFixed(3));
  }

}

export {
  StatsStore,
};
