import { IResulteQuestion } from 'app/shared/model/resulte-question.model';
import { IQuestionGroup } from 'app/shared/model/question-group.model';

export interface IQuestion {
  id?: number;
  description?: string;
  weight?: number;
  results?: IResulteQuestion[];
  questionGroup?: IQuestionGroup;
}

export const defaultValue: Readonly<IQuestion> = {};
