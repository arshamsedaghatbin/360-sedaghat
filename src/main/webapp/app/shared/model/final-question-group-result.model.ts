import { IQuestionGroup } from 'app/shared/model/question-group.model';
import { IFinalResult } from 'app/shared/model/final-result.model';

export interface IFinalQuestionGroupResult {
  id?: number;
  avrageQuestionGroupResult?: number;
  weight?: number;
  questionGroup?: IQuestionGroup;
  finalResult?: IFinalResult;
}

export const defaultValue: Readonly<IFinalQuestionGroupResult> = {};
