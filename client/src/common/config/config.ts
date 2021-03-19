import { Config } from 'common/config/types';

const baseURL = window.location.origin;

export const config: Config = {
  baseURL,
  apiURL: `${baseURL}/api`,
};
