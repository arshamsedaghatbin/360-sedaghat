import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FinalQuestionGroupResult from './final-question-group-result';
import FinalQuestionGroupResultDetail from './final-question-group-result-detail';
import FinalQuestionGroupResultUpdate from './final-question-group-result-update';
import FinalQuestionGroupResultDeleteDialog from './final-question-group-result-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FinalQuestionGroupResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FinalQuestionGroupResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FinalQuestionGroupResultDetail} />
      <ErrorBoundaryRoute path={match.url} component={FinalQuestionGroupResult} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FinalQuestionGroupResultDeleteDialog} />
  </>
);

export default Routes;
