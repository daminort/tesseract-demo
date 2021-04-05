import { Controller, Post, Body } from '@nestjs/common';
import { SelectionRequestDto } from 'modules/selections/selection.request.dto';
import { SelectionResponseDto } from 'modules/selections/selection.response.dto';
import { SelectionsService } from 'modules/selections/selections.service';

@Controller('api/selections')
export class SelectionsController {
  constructor(private selectionsService: SelectionsService) {}

  @Post('recognize')
  async recognize(@Body() selection: SelectionRequestDto): Promise<SelectionResponseDto> {
    return this.selectionsService.recognize(selection);
  }
}
