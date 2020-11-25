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
import { IPeriod } from 'app/shared/model/period.model';
import { getEntities as getPeriods } from 'app/entities/period/period.reducer';
import { getEntity, updateEntity, createEntity, reset } from './final-result.reducer';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFinalResultUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FinalResultUpdate = (props: IFinalResultUpdateProps) => {
  const [employeeId, setEmployeeId] = useState('0');
  const [periodId, setPeriodId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { finalResultEntity, employees, periods, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/final-result');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmployees();
    props.getPeriods();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...finalResultEntity,
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
          <h2 id="App.finalResult.home.createOrEditLabel">Create or edit a FinalResult</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : finalResultEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="final-result-id">ID</Label>
                  <AvInput id="final-result-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="avrageResultLabel" for="final-result-avrageResult">
                  Avrage Result
                </Label>
                <AvField id="final-result-avrageResult" type="string" className="form-control" name="avrageResult" />
              </AvGroup>
              <AvGroup>
                <Label for="final-result-employee">Employee</Label>
                <AvInput id="final-result-employee" type="select" className="form-control" name="employee.id">
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
                <Label for="final-result-period">Period</Label>
                <AvInput id="final-result-period" type="select" className="form-control" name="period.id">
                  <option value="" key="0" />
                  {periods
                    ? periods.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/final-result" replace color="info">
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
  periods: storeState.period.entities,
  finalResultEntity: storeState.finalResult.entity,
  loading: storeState.finalResult.loading,
  updating: storeState.finalResult.updating,
  updateSuccess: storeState.finalResult.updateSuccess,
});

const mapDispatchToProps = {
  getEmployees,
  getPeriods,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalResultUpdate);
