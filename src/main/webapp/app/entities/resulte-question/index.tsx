import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ResulteQuestion from './resulte-question';
import ResulteQuestionDetail from './resulte-question-detail';
import ResulteQuestionUpdate from './resulte-question-update';
import ResulteQuestionDeleteDialog from './resulte-question-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResulteQuestionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResulteQuestionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResulteQuestionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ResulteQuestion} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ResulteQuestionDeleteDialog} />
  </>
);

export default Routes;
