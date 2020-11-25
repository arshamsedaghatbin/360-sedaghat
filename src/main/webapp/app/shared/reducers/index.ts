import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import organization, {
  OrganizationState
} from 'app/entities/organization/organization.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import group, {
  GroupState
} from 'app/entities/group/group.reducer';
// prettier-ignore
import questionGroup, {
  QuestionGroupState
} from 'app/entities/question-group/question-group.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import resulteQuestion, {
  ResulteQuestionState
} from 'app/entities/resulte-question/resulte-question.reducer';
// prettier-ignore
import finalResult, {
  FinalResultState
} from 'app/entities/final-result/final-result.reducer';
// prettier-ignore
import finalQuestionGroupResult, {
  FinalQuestionGroupResultState
} from 'app/entities/final-question-group-result/final-question-group-result.reducer';
// prettier-ignore
import period, {
  PeriodState
} from 'app/entities/period/period.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly organization: OrganizationState;
  readonly department: DepartmentState;
  readonly employee: EmployeeState;
  readonly group: GroupState;
  readonly questionGroup: QuestionGroupState;
  readonly question: QuestionState;
  readonly resulteQuestion: ResulteQuestionState;
  readonly finalResult: FinalResultState;
  readonly finalQuestionGroupResult: FinalQuestionGroupResultState;
  readonly period: PeriodState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  organization,
  department,
  employee,
  group,
  questionGroup,
  question,
  resulteQuestion,
  finalResult,
  finalQuestionGroupResult,
  period,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
