import { SelectionSize } from 'stores/Selection';
import { Point } from 'utils/SelectionUtils/types';

class SelectionUtils {

  static createRectangle(start: Point, end: Point): SelectionSize {
    const startTop = Math.min(start.y, end.y);
    const startLeft = Math.min(start.x, end.x);
    const endTop = Math.max(start.y, end.y);
    const endLeft = Math.max(start.x, end.x);

    const rectangle: SelectionSize = {
      top: Math.max(0, startTop),
      left: Math.max(0, startLeft),
      width: Math.max(0, endLeft - startLeft),
      height: Math.max(0, endTop - startTop),
    };

    return rectangle;
  }
}

export {
  SelectionUtils,
};
