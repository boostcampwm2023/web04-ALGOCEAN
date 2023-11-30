import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';

export class ReadQuestionDraftDto extends PartialType(CreateQuestionDto) {}
