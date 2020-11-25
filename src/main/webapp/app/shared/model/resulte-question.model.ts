import { IEmployee } from 'app/shared/model/employee.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IResulteQuestion {
  id?: number;
  employeeWeight?: number;
  result?: number;
  employee?: IEmployee;
  employee?: IEmployee;
  question?: IQuestion;
}

export const defaultValue: Readonly<IResulteQuestion> = {};
