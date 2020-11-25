import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IFinalQuestionGroupResult } from 'app/shared/model/final-question-group-result.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './final-question-group-result.reducer';

export interface IFinalQuestionGroupResultDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FinalQuestionGroupResultDeleteDialog = (props: IFinalQuestionGroupResultDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/final-question-group-result');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.finalQuestionGroupResultEntity.id);
  };

  const { finalQuestionGroupResultEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="App.finalQuestionGroupResult.delete.question">
        Are you sure you want to delete this FinalQuestionGroupResult?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-finalQuestionGroupResult" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ finalQuestionGroupResult }: IRootState) => ({
  finalQuestionGroupResultEntity: finalQuestionGroupResult.entity,
  updateSuccess: finalQuestionGroupResult.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinalQuestionGroupResultDeleteDialog);
