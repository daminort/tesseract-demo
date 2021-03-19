import { RoutesAPI } from 'common/enums/routes-api';

/**
 * Defines which API endpoints should be mocked
 */
export const options = {
  [RoutesAPI.upload]: true,
  [RoutesAPI.recognize]: true,
};
