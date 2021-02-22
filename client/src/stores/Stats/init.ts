import { StatsFile, StatsImage, StatsWorkspace } from './types';

const initFile: StatsFile = {
  name: 'book',
  url: '',
};

const initImage: StatsImage = {
  width: 820,
  height: 1000,
  ratio: 1000 / 820,
};

const initWorkspace: StatsWorkspace = {
  width: 0,
  height: 0,
  padding: 0,
};

export {
  initFile,
  initImage,
  initWorkspace,
};
