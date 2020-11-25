import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './final-question-group-result.reducer';
import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFinalQuestionGroupResultDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FinalQuestionGroupResultDetail = (props: IFinalQuestionGroupResultDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { finalQuestionGroupResultEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          FinalQuestionGroupResult [<b>{finalQuestionGroupResultEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="avrageQuestionGroupResult">Avrage Question Group Result</span>
          </dt>
          <dd>{finalQuestionGroupResultEntity.avrageQuestionGroupResult}</dd>
          <dt>
            <span id="weight">Weight</span>
          </dt>
          <dd>{finalQuestionGroupResultEntity.weight}</dd>
          <dt>Question Group</dt>
          <dd>{finalQuestionGroupResultEntity.questionGroup ? finalQuestionGroupResultEntity.questionGroup.id : ''}</dd>
          <dt>Final Result</dt>
          <dd>{finalQuestionGroupResultEntity.finalResult ? finalQuestionGroupResultEntity.finalResult.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/final-question-group-result" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/final-question-group-result/${finalQuestionGroupResultEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ finalQuestionGroupResult }: IRootState) => ({
  finalQuestionGroupResultEntity: finalQuestionGroupResult.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalQuestionGroupResultDetail);
