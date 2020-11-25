import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Organization from './organization';
import Department from './department';
import Employee from './employee';
import Group from './group';
import QuestionGroup from './question-group';
import Question from './question';
import ResulteQuestion from './resulte-question';
import FinalResult from './final-result';
import FinalQuestionGroupResult from './final-question-group-result';
import Period from './period';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}group`} component={Group} />
      <ErrorBoundaryRoute path={`${match.url}question-group`} component={QuestionGroup} />
      <ErrorBoundaryRoute path={`${match.url}question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}resulte-question`} component={ResulteQuestion} />
      <ErrorBoundaryRoute path={`${match.url}final-result`} component={FinalResult} />
      <ErrorBoundaryRoute path={`${match.url}final-question-group-result`} component={FinalQuestionGroupResult} />
      <ErrorBoundaryRoute path={`${match.url}period`} component={Period} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
