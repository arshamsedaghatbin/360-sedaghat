import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './period.reducer';
import { IPeriod } from 'app/shared/model/period.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPeriodUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PeriodUpdate = (props: IPeriodUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { periodEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/period');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.start = convertDateTimeToServer(values.start);
    values.end = convertDateTimeToServer(values.end);

    if (errors.length === 0) {
      const entity = {
        ...periodEntity,
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
          <h2 id="App.period.home.createOrEditLabel">Create or edit a Period</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : periodEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="period-id">ID</Label>
                  <AvInput id="period-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startLabel" for="period-start">
                  Start
                </Label>
                <AvInput
                  id="period-start"
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.periodEntity.start)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="period-end">
                  End
                </Label>
                <AvInput
                  id="period-end"
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.periodEntity.end)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="period-state">
                  State
                </Label>
                <AvInput
                  id="period-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && periodEntity.state) || 'NOT_START'}
                >
                  <option value="NOT_START">NOT_START</option>
                  <option value="INPROGRESS">INPROGRESS</option>
                  <option value="END">END</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/period" replace color="info">
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
  periodEntity: storeState.period.entity,
  loading: storeState.period.loading,
  updating: storeState.period.updating,
  updateSuccess: storeState.period.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PeriodUpdate);
