import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFinalQuestionGroupResult, defaultValue } from 'app/shared/model/final-question-group-result.model';

export const ACTION_TYPES = {
  FETCH_FINALQUESTIONGROUPRESULT_LIST: 'finalQuestionGroupResult/FETCH_FINALQUESTIONGROUPRESULT_LIST',
  FETCH_FINALQUESTIONGROUPRESULT: 'finalQuestionGroupResult/FETCH_FINALQUESTIONGROUPRESULT',
  CREATE_FINALQUESTIONGROUPRESULT: 'finalQuestionGroupResult/CREATE_FINALQUESTIONGROUPRESULT',
  UPDATE_FINALQUESTIONGROUPRESULT: 'finalQuestionGroupResult/UPDATE_FINALQUESTIONGROUPRESULT',
  DELETE_FINALQUESTIONGROUPRESULT: 'finalQuestionGroupResult/DELETE_FINALQUESTIONGROUPRESULT',
  RESET: 'finalQuestionGroupResult/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFinalQuestionGroupResult>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FinalQuestionGroupResultState = Readonly<typeof initialState>;

// Reducer

export default (state: FinalQuestionGroupResultState = initialState, action): FinalQuestionGroupResultState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FINALQUESTIONGROUPRESULT):
    case REQUEST(ACTION_TYPES.UPDATE_FINALQUESTIONGROUPRESULT):
    case REQUEST(ACTION_TYPES.DELETE_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT):
    case FAILURE(ACTION_TYPES.CREATE_FINALQUESTIONGROUPRESULT):
    case FAILURE(ACTION_TYPES.UPDATE_FINALQUESTIONGROUPRESULT):
    case FAILURE(ACTION_TYPES.DELETE_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FINALQUESTIONGROUPRESULT):
    case SUCCESS(ACTION_TYPES.UPDATE_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FINALQUESTIONGROUPRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/final-question-group-results';

// Actions

export const getEntities: ICrudGetAllAction<IFinalQuestionGroupResult> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT_LIST,
  payload: axios.get<IFinalQuestionGroupResult>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFinalQuestionGroupResult> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FINALQUESTIONGROUPRESULT,
    payload: axios.get<IFinalQuestionGroupResult>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFinalQuestionGroupResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FINALQUESTIONGROUPRESULT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFinalQuestionGroupResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FINALQUESTIONGROUPRESULT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFinalQuestionGroupResult> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FINALQUESTIONGROUPRESULT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
