import { IEmployee } from 'app/shared/model/employee.model';

export interface IGroup {
  id?: number;
  name?: string;
  groups?: IEmployee[];
}

export const defaultValue: Readonly<IGroup> = {};
