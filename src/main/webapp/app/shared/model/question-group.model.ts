import { IQuestion } from 'app/shared/model/question.model';
import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';

export interface IQuestionGroup {
  id?: number;
  name?: string;
  order?: number;
  weight?: number;
  questions?: IQuestion[];
  questionGroupResults?: IFinalQuestionGroupResult[];
}

export const defaultValue: Readonly<IQuestionGroup> = {};
