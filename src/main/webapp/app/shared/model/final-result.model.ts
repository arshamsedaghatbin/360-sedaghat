import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { IPeriod } from 'app/shared/model/period.model';

export interface IFinalResult {
  id?: number;
  avrageResult?: number;
  questionGroupResultes?: IFinalQuestionGroupResult[];
  employee?: IEmployee;
  period?: IPeriod;
}

export const defaultValue: Readonly<IFinalResult> = {};
