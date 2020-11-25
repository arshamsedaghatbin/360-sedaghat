import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './department.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DepartmentDetail = (props: IDepartmentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { departmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Department [<b>{departmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{departmentEntity.name}</dd>
          <dt>Employee</dt>
          <dd>
            {departmentEntity.employees
              ? departmentEntity.employees.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {departmentEntity.employees && i === departmentEntity.employees.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Organization</dt>
          <dd>{departmentEntity.organization ? departmentEntity.organization.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/department" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/department/${departmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ department }: IRootState) => ({
  departmentEntity: department.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDetail);
