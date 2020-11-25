import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './final-result.reducer';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFinalResultProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FinalResult = (props: IFinalResultProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { finalResultList, match, loading } = props;
  return (
    <div>
      <h2 id="final-result-heading">
        Final Results
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Final Result
        </Link>
      </h2>
      <div className="table-responsive">
        {finalResultList && finalResultList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Avrage Result</th>
                <th>Employee</th>
                <th>Period</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {finalResultList.map((finalResult, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${finalResult.id}`} color="link" size="sm">
                      {finalResult.id}
                    </Button>
                  </td>
                  <td>{finalResult.avrageResult}</td>
                  <td>{finalResult.employee ? <Link to={`employee/${finalResult.employee.id}`}>{finalResult.employee.id}</Link> : ''}</td>
                  <td>{finalResult.period ? <Link to={`period/${finalResult.period.id}`}>{finalResult.period.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${finalResult.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${finalResult.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${finalResult.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Final Results found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ finalResult }: IRootState) => ({
  finalResultList: finalResult.entities,
  loading: finalResult.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalResult);
