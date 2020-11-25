import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './final-result.reducer';
import { IFinalResult } from 'app/shared/model/final-result.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFinalResultDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FinalResultDetail = (props: IFinalResultDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { finalResultEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          FinalResult [<b>{finalResultEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="avrageResult">Avrage Result</span>
          </dt>
          <dd>{finalResultEntity.avrageResult}</dd>
          <dt>Employee</dt>
          <dd>{finalResultEntity.employee ? finalResultEntity.employee.id : ''}</dd>
          <dt>Period</dt>
          <dd>{finalResultEntity.period ? finalResultEntity.period.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/final-result" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/final-result/${finalResultEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ finalResult }: IRootState) => ({
  finalResultEntity: finalResult.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalResultDetail);
