import { InnerSize } from 'utils/BrowserUtils/types';

class BrowserUtils {

  static getInnerSize(element: HTMLElement): InnerSize {
    if (!element) {
      return {
        width: 0,
        height: 0,
      };
    }

    const { width, height, padding } = getComputedStyle(element);

    const realWidth = Number(width.replace('px', ''));
    const realHeight = Number(height.replace('px', ''));
    const realPadding = Number(padding.replace('px', ''));

    return {
      width: realWidth - (realPadding * 2),
      height: realHeight - (realPadding * 2),
    };
  }
}

export {
  BrowserUtils,
};
