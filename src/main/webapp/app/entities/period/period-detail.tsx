import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './period.reducer';
import { IPeriod } from 'app/shared/model/period.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPeriodDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PeriodDetail = (props: IPeriodDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { periodEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Period [<b>{periodEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="start">Start</span>
          </dt>
          <dd>{periodEntity.start ? <TextFormat value={periodEntity.start} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="end">End</span>
          </dt>
          <dd>{periodEntity.end ? <TextFormat value={periodEntity.end} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{periodEntity.state}</dd>
        </dl>
        <Button tag={Link} to="/period" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/period/${periodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ period }: IRootState) => ({
  periodEntity: period.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PeriodDetail);
