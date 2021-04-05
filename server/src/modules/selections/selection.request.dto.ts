export class SelectionRequestDto {
  readonly fileID: string;
  readonly selectionID: string;
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;

  constructor(data: Partial<SelectionRequestDto>) {
    Object.assign(this, data);
  }
}