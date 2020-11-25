import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './period.reducer';
import { IPeriod } from 'app/shared/model/period.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPeriodProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Period = (props: IPeriodProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { periodList, match, loading } = props;
  return (
    <div>
      <h2 id="period-heading">
        Periods
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Period
        </Link>
      </h2>
      <div className="table-responsive">
        {periodList && periodList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start</th>
                <th>End</th>
                <th>State</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {periodList.map((period, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${period.id}`} color="link" size="sm">
                      {period.id}
                    </Button>
                  </td>
                  <td>{period.start ? <TextFormat type="date" value={period.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{period.end ? <TextFormat type="date" value={period.end} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{period.state}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${period.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${period.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${period.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Periods found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ period }: IRootState) => ({
  periodList: period.entities,
  loading: period.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Period);
