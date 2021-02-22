import { WorkspaceParams } from 'utils/BrowserUtils/types';

class BrowserUtils {

  static workspaceParams(element: HTMLElement): WorkspaceParams {
    if (!element) {
      return {
        width: 0,
        height: 0,
        padding: 0,
      };
    }

    const { width, height, padding } = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    console.log('BrowserUtils.ts, workspaceParams [16]: ', rect);

    const realWidth = Number(width.replace('px', ''));
    const realHeight = Number(height.replace('px', ''));
    const realPadding = Number(padding.replace('px', ''));

    return {
      width: realWidth - (realPadding * 2),
      height: realHeight - (realPadding * 2),
      padding: realPadding,
    };
  }
}

export {
  BrowserUtils,
};
