import { IEmployee } from 'app/shared/model/employee.model';
import { IOrganization } from 'app/shared/model/organization.model';

export interface IDepartment {
  id?: number;
  name?: string;
  employees?: IEmployee[];
  organization?: IOrganization;
}

export const defaultValue: Readonly<IDepartment> = {};
