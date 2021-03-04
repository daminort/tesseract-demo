export type SelectionSize = {
  top: number,
  left: number,
  width: number,
  height: number,
};

export type Selection = {
  id: string,
  screen: SelectionSize,
  real: SelectionSize,
};

export type Selections = Array<Selection>;
