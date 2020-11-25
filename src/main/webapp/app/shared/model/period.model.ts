import { Moment } from 'moment';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { PeriodStatus } from 'app/shared/model/enumerations/period-status.model';

export interface IPeriod {
  id?: number;
  start?: string;
  end?: string;
  state?: PeriodStatus;
  finalResults?: IFinalResult[];
}

export const defaultValue: Readonly<IPeriod> = {};
