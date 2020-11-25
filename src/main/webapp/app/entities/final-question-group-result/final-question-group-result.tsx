import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './final-question-group-result.reducer';
import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFinalQuestionGroupResultProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FinalQuestionGroupResult = (props: IFinalQuestionGroupResultProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { finalQuestionGroupResultList, match, loading } = props;
  return (
    <div>
      <h2 id="final-question-group-result-heading">
        Final Question Group Results
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Final Question Group Result
        </Link>
      </h2>
      <div className="table-responsive">
        {finalQuestionGroupResultList && finalQuestionGroupResultList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Avrage Question Group Result</th>
                <th>Weight</th>
                <th>Question Group</th>
                <th>Final Result</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {finalQuestionGroupResultList.map((finalQuestionGroupResult, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${finalQuestionGroupResult.id}`} color="link" size="sm">
                      {finalQuestionGroupResult.id}
                    </Button>
                  </td>
                  <td>{finalQuestionGroupResult.avrageQuestionGroupResult}</td>
                  <td>{finalQuestionGroupResult.weight}</td>
                  <td>
                    {finalQuestionGroupResult.questionGroup ? (
                      <Link to={`question-group/${finalQuestionGroupResult.questionGroup.id}`}>
                        {finalQuestionGroupResult.questionGroup.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {finalQuestionGroupResult.finalResult ? (
                      <Link to={`final-result/${finalQuestionGroupResult.finalResult.id}`}>{finalQuestionGroupResult.finalResult.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${finalQuestionGroupResult.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${finalQuestionGroupResult.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${finalQuestionGroupResult.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Final Question Group Results found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ finalQuestionGroupResult }: IRootState) => ({
  finalQuestionGroupResultList: finalQuestionGroupResult.entities,
  loading: finalQuestionGroupResult.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalQuestionGroupResult);
