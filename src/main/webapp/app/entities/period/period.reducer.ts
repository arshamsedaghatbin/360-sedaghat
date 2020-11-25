import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPeriod, defaultValue } from 'app/shared/model/period.model';

export const ACTION_TYPES = {
  FETCH_PERIOD_LIST: 'period/FETCH_PERIOD_LIST',
  FETCH_PERIOD: 'period/FETCH_PERIOD',
  CREATE_PERIOD: 'period/CREATE_PERIOD',
  UPDATE_PERIOD: 'period/UPDATE_PERIOD',
  DELETE_PERIOD: 'period/DELETE_PERIOD',
  RESET: 'period/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPeriod>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PeriodState = Readonly<typeof initialState>;

// Reducer

export default (state: PeriodState = initialState, action): PeriodState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERIOD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERIOD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PERIOD):
    case REQUEST(ACTION_TYPES.UPDATE_PERIOD):
    case REQUEST(ACTION_TYPES.DELETE_PERIOD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PERIOD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERIOD):
    case FAILURE(ACTION_TYPES.CREATE_PERIOD):
    case FAILURE(ACTION_TYPES.UPDATE_PERIOD):
    case FAILURE(ACTION_TYPES.DELETE_PERIOD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERIOD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERIOD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERIOD):
    case SUCCESS(ACTION_TYPES.UPDATE_PERIOD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERIOD):
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

const apiUrl = 'api/periods';

// Actions

export const getEntities: ICrudGetAllAction<IPeriod> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PERIOD_LIST,
  payload: axios.get<IPeriod>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPeriod> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERIOD,
    payload: axios.get<IPeriod>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPeriod> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERIOD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPeriod> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERIOD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPeriod> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERIOD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
