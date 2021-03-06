import { Config } from 'common/config/types';

const { NODE_ENV, PUBLIC_URL } = process.env;

const isDevelopment = (NODE_ENV === 'development');
const isProduction = (NODE_ENV === 'production');
const baseURL = window.location.origin;

export const config: Config = {
  isDevelopment,
  isProduction,
  baseURL,
  apiURL: `${baseURL}/api`,
  iconsURL: `${PUBLIC_URL}/icons`,
};
