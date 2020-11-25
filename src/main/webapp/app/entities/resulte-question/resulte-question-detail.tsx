import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resulte-question.reducer';
import { IResulteQuestion } from 'app/shared/model/resulte-question.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResulteQuestionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResulteQuestionDetail = (props: IResulteQuestionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { resulteQuestionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ResulteQuestion [<b>{resulteQuestionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="employeeWeight">Employee Weight</span>
          </dt>
          <dd>{resulteQuestionEntity.employeeWeight}</dd>
          <dt>
            <span id="result">Result</span>
          </dt>
          <dd>{resulteQuestionEntity.result}</dd>
          <dt>Employee</dt>
          <dd>{resulteQuestionEntity.employee ? resulteQuestionEntity.employee.id : ''}</dd>
          <dt>Employee</dt>
          <dd>{resulteQuestionEntity.employee ? resulteQuestionEntity.employee.id : ''}</dd>
          <dt>Question</dt>
          <dd>{resulteQuestionEntity.question ? resulteQuestionEntity.question.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/resulte-question" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resulte-question/${resulteQuestionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ resulteQuestion }: IRootState) => ({
  resulteQuestionEntity: resulteQuestion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResulteQuestionDetail);
