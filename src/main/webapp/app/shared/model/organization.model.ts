import { IDepartment } from 'app/shared/model/department.model';

export interface IOrganization {
  id?: number;
  name?: string;
  departments?: IDepartment[];
}

export const defaultValue: Readonly<IOrganization> = {};
