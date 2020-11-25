import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQuestionGroup, defaultValue } from 'app/shared/model/question-group.model';

export const ACTION_TYPES = {
  FETCH_QUESTIONGROUP_LIST: 'questionGroup/FETCH_QUESTIONGROUP_LIST',
  FETCH_QUESTIONGROUP: 'questionGroup/FETCH_QUESTIONGROUP',
  CREATE_QUESTIONGROUP: 'questionGroup/CREATE_QUESTIONGROUP',
  UPDATE_QUESTIONGROUP: 'questionGroup/UPDATE_QUESTIONGROUP',
  DELETE_QUESTIONGROUP: 'questionGroup/DELETE_QUESTIONGROUP',
  RESET: 'questionGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestionGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type QuestionGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestionGroupState = initialState, action): QuestionGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTIONGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTIONGROUP):
    case REQUEST(ACTION_TYPES.DELETE_QUESTIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONGROUP):
    case FAILURE(ACTION_TYPES.CREATE_QUESTIONGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTIONGROUP):
    case FAILURE(ACTION_TYPES.DELETE_QUESTIONGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTIONGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTIONGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTIONGROUP):
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

const apiUrl = 'api/question-groups';

// Actions

export const getEntities: ICrudGetAllAction<IQuestionGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_QUESTIONGROUP_LIST,
  payload: axios.get<IQuestionGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IQuestionGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTIONGROUP,
    payload: axios.get<IQuestionGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IQuestionGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTIONGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuestionGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTIONGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestionGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTIONGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
