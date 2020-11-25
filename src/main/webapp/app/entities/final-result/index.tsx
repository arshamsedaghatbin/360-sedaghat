import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FinalResult from './final-result';
import FinalResultDetail from './final-result-detail';
import FinalResultUpdate from './final-result-update';
import FinalResultDeleteDialog from './final-result-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FinalResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FinalResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FinalResultDetail} />
      <ErrorBoundaryRoute path={match.url} component={FinalResult} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FinalResultDeleteDialog} />
  </>
);

export default Routes;
