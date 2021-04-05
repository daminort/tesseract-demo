import { SelectionRequestDto } from 'modules/selections/selection.request.dto';

export class SelectionResponseDto extends SelectionRequestDto {
  text: string;
  confidence: number;

  constructor(selectionRequestDto: SelectionRequestDto) {
    super(selectionRequestDto);
    this.text = '';
    this.confidence = 0;
  }
}