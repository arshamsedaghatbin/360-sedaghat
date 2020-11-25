import { IResulteQuestion } from 'app/shared/model/resulte-question.model';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { IGroup } from 'app/shared/model/group.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IEmployee {
  id?: number;
  name?: string;
  personalNumber?: string;
  weight?: number;
  voters?: IResulteQuestion[];
  owners?: IResulteQuestion[];
  results?: IFinalResult[];
  groups?: IGroup[];
  departments?: IDepartment[];
}

export const defaultValue: Readonly<IEmployee> = {};
