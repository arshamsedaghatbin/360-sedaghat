import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResulteQuestion, defaultValue } from 'app/shared/model/resulte-question.model';

export const ACTION_TYPES = {
  FETCH_RESULTEQUESTION_LIST: 'resulteQuestion/FETCH_RESULTEQUESTION_LIST',
  FETCH_RESULTEQUESTION: 'resulteQuestion/FETCH_RESULTEQUESTION',
  CREATE_RESULTEQUESTION: 'resulteQuestion/CREATE_RESULTEQUESTION',
  UPDATE_RESULTEQUESTION: 'resulteQuestion/UPDATE_RESULTEQUESTION',
  DELETE_RESULTEQUESTION: 'resulteQuestion/DELETE_RESULTEQUESTION',
  RESET: 'resulteQuestion/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResulteQuestion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ResulteQuestionState = Readonly<typeof initialState>;

// Reducer

export default (state: ResulteQuestionState = initialState, action): ResulteQuestionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESULTEQUESTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESULTEQUESTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RESULTEQUESTION):
    case REQUEST(ACTION_TYPES.UPDATE_RESULTEQUESTION):
    case REQUEST(ACTION_TYPES.DELETE_RESULTEQUESTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESULTEQUESTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESULTEQUESTION):
    case FAILURE(ACTION_TYPES.CREATE_RESULTEQUESTION):
    case FAILURE(ACTION_TYPES.UPDATE_RESULTEQUESTION):
    case FAILURE(ACTION_TYPES.DELETE_RESULTEQUESTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESULTEQUESTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESULTEQUESTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESULTEQUESTION):
    case SUCCESS(ACTION_TYPES.UPDATE_RESULTEQUESTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESULTEQUESTION):
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

const apiUrl = 'api/resulte-questions';

// Actions

export const getEntities: ICrudGetAllAction<IResulteQuestion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESULTEQUESTION_LIST,
  payload: axios.get<IResulteQuestion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IResulteQuestion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESULTEQUESTION,
    payload: axios.get<IResulteQuestion>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IResulteQuestion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESULTEQUESTION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResulteQuestion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESULTEQUESTION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResulteQuestion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESULTEQUESTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
