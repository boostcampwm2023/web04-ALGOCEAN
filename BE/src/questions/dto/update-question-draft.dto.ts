import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDraftDto extends PartialType(CreateQuestionDto) {}
