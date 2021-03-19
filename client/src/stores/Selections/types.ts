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
  text: string,
  confidence: number,
};

export type Selections = Array<Selection>;
