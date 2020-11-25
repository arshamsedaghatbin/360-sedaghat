import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Period from './period';
import PeriodDetail from './period-detail';
import PeriodUpdate from './period-update';
import PeriodDeleteDialog from './period-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PeriodUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PeriodUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PeriodDetail} />
      <ErrorBoundaryRoute path={match.url} component={Period} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PeriodDeleteDialog} />
  </>
);

export default Routes;
