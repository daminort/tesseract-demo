export type RecognizeRequest = {
  fileID: string,
  selectionID: string,
  top: number,
  left: number,
  width: number,
  height: number,
};

export type RecognizeResponse = RecognizeRequest & {
  text: string;
  confidence: number;
};
