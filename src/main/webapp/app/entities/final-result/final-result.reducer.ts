import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFinalResult, defaultValue } from 'app/shared/model/final-result.model';

export const ACTION_TYPES = {
  FETCH_FINALRESULT_LIST: 'finalResult/FETCH_FINALRESULT_LIST',
  FETCH_FINALRESULT: 'finalResult/FETCH_FINALRESULT',
  CREATE_FINALRESULT: 'finalResult/CREATE_FINALRESULT',
  UPDATE_FINALRESULT: 'finalResult/UPDATE_FINALRESULT',
  DELETE_FINALRESULT: 'finalResult/DELETE_FINALRESULT',
  RESET: 'finalResult/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFinalResult>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FinalResultState = Readonly<typeof initialState>;

// Reducer

export default (state: FinalResultState = initialState, action): FinalResultState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FINALRESULT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FINALRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FINALRESULT):
    case REQUEST(ACTION_TYPES.UPDATE_FINALRESULT):
    case REQUEST(ACTION_TYPES.DELETE_FINALRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FINALRESULT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FINALRESULT):
    case FAILURE(ACTION_TYPES.CREATE_FINALRESULT):
    case FAILURE(ACTION_TYPES.UPDATE_FINALRESULT):
    case FAILURE(ACTION_TYPES.DELETE_FINALRESULT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FINALRESULT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FINALRESULT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FINALRESULT):
    case SUCCESS(ACTION_TYPES.UPDATE_FINALRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FINALRESULT):
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

const apiUrl = 'api/final-results';

// Actions

export const getEntities: ICrudGetAllAction<IFinalResult> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FINALRESULT_LIST,
  payload: axios.get<IFinalResult>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFinalResult> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FINALRESULT,
    payload: axios.get<IFinalResult>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFinalResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FINALRESULT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFinalResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FINALRESULT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFinalResult> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FINALRESULT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
