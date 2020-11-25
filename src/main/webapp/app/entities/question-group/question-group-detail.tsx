import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question-group.reducer';
import { IQuestionGroup } from 'app/shared/model/question-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionGroupDetail = (props: IQuestionGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questionGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          QuestionGroup [<b>{questionGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{questionGroupEntity.name}</dd>
          <dt>
            <span id="order">Order</span>
          </dt>
          <dd>{questionGroupEntity.order}</dd>
          <dt>
            <span id="weight">Weight</span>
          </dt>
          <dd>{questionGroupEntity.weight}</dd>
        </dl>
        <Button tag={Link} to="/question-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question-group/${questionGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ questionGroup }: IRootState) => ({
  questionGroupEntity: questionGroup.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionGroupDetail);
