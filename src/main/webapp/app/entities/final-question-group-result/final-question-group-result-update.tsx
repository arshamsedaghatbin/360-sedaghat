import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuestionGroup } from 'app/shared/model/question-group.model';
import { getEntities as getQuestionGroups } from 'app/entities/question-group/question-group.reducer';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { getEntities as getFinalResults } from 'app/entities/final-result/final-result.reducer';
import { getEntity, updateEntity, createEntity, reset } from './final-question-group-result.reducer';
import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFinalQuestionGroupResultUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FinalQuestionGroupResultUpdate = (props: IFinalQuestionGroupResultUpdateProps) => {
  const [questionGroupId, setQuestionGroupId] = useState('0');
  const [finalResultId, setFinalResultId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { finalQuestionGroupResultEntity, questionGroups, finalResults, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/final-question-group-result');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuestionGroups();
    props.getFinalResults();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...finalQuestionGroupResultEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="App.finalQuestionGroupResult.home.createOrEditLabel">Create or edit a FinalQuestionGroupResult</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : finalQuestionGroupResultEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="final-question-group-result-id">ID</Label>
                  <AvInput id="final-question-group-result-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="avrageQuestionGroupResultLabel" for="final-question-group-result-avrageQuestionGroupResult">
                  Avrage Question Group Result
                </Label>
                <AvField
                  id="final-question-group-result-avrageQuestionGroupResult"
                  type="string"
                  className="form-control"
                  name="avrageQuestionGroupResult"
                />
              </AvGroup>
              <AvGroup>
                <Label id="weightLabel" for="final-question-group-result-weight">
                  Weight
                </Label>
                <AvField id="final-question-group-result-weight" type="string" className="form-control" name="weight" />
              </AvGroup>
              <AvGroup>
                <Label for="final-question-group-result-questionGroup">Question Group</Label>
                <AvInput id="final-question-group-result-questionGroup" type="select" className="form-control" name="questionGroup.id">
                  <option value="" key="0" />
                  {questionGroups
                    ? questionGroups.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="final-question-group-result-finalResult">Final Result</Label>
                <AvInput id="final-question-group-result-finalResult" type="select" className="form-control" name="finalResult.id">
                  <option value="" key="0" />
                  {finalResults
                    ? finalResults.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/final-question-group-result" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  questionGroups: storeState.questionGroup.entities,
  finalResults: storeState.finalResult.entities,
  finalQuestionGroupResultEntity: storeState.finalQuestionGroupResult.entity,
  loading: storeState.finalQuestionGroupResult.loading,
  updating: storeState.finalQuestionGroupResult.updating,
  updateSuccess: storeState.finalQuestionGroupResult.updateSuccess,
});

const mapDispatchToProps = {
  getQuestionGroups,
  getFinalResults,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalQuestionGroupResultUpdate);
