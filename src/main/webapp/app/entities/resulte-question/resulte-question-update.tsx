import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { getEntity, updateEntity, createEntity, reset } from './resulte-question.reducer';
import { IResulteQuestion } from 'app/shared/model/resulte-question.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResulteQuestionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResulteQuestionUpdate = (props: IResulteQuestionUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [questionId, setQuestionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { resulteQuestionEntity, employees, questions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/resulte-question');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployees();
    props.getQuestions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...resulteQuestionEntity,
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
          <h2 id="App.resulteQuestion.home.createOrEditLabel">Create or edit a ResulteQuestion</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : resulteQuestionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="resulte-question-id">ID</Label>
                  <AvInput id="resulte-question-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="employeeWeightLabel" for="resulte-question-employeeWeight">
                  Employee Weight
                </Label>
                <AvField id="resulte-question-employeeWeight" type="string" className="form-control" name="employeeWeight" />
              </AvGroup>
              <AvGroup>
                <Label id="resultLabel" for="resulte-question-result">
                  Result
                </Label>
                <AvField id="resulte-question-result" type="string" className="form-control" name="result" />
              </AvGroup>
              <AvGroup>
                <Label for="resulte-question-employee">Employee</Label>
                <AvInput id="resulte-question-employee" type="select" className="form-control" name="employee.id">
                  <option value="" key="0" />
                  {employees
                    ? employees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="resulte-question-employee">Employee</Label>
                <AvInput id="resulte-question-employee" type="select" className="form-control" name="employee.id">
                  <option value="" key="0" />
                  {employees
                    ? employees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="resulte-question-question">Question</Label>
                <AvInput id="resulte-question-question" type="select" className="form-control" name="question.id">
                  <option value="" key="0" />
                  {questions
                    ? questions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/resulte-question" replace color="info">
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
  employees: storeState.employee.entities,
  questions: storeState.question.entities,
  resulteQuestionEntity: storeState.resulteQuestion.entity,
  loading: storeState.resulteQuestion.loading,
  updating: storeState.resulteQuestion.updating,
  updateSuccess: storeState.resulteQuestion.updateSuccess,
});

const mapDispatchToProps = {
  getEmployees,
  getQuestions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResulteQuestionUpdate);
