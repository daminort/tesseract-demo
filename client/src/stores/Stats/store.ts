import { makeObservable, action, observable, computed } from 'mobx';

import { RootStore } from 'stores/Root/store';
import { StatsImage, StatsWorkspace } from './types';
import { initImage, initWorkspace } from './init';

class StatsStore {
  rootStore: RootStore;
  image: StatsImage = initImage;
  workspace: StatsWorkspace = initWorkspace;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      image: observable,
      workspace: observable,

      imageUpdate: action,
      workspaceUpdate: action,

      scale: computed,
    });
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
