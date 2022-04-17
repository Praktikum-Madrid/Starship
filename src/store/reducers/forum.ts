import { ACTIONS } from 'store/actions/forum';
import { TForumData } from 'types';

const defaultState = {
  threads: [],
  messages: [],
  emotions: [],
  thread: null,
};

// eslint-disable-next-line import/prefer-default-export
export function forumReducer(state: TForumData = defaultState, { type, payload }: Record<string, any> = {}) {
  switch (type) {
    case ACTIONS.GET_THREADS:
      return {
        ...state,
        ...payload,
      };
    case ACTIONS.GET_THREAD:
      return {
        ...state,
        ...payload,
      };
    case ACTIONS.GET_MESSAGES:
      return {
        ...state,
        ...payload,
      };
    case ACTIONS.RESET_THREAD:
      return {
        ...state,
        thread: null,
        messages: [],
      };
    case ACTIONS.CREATE_THREAD:
      return {
        ...state,
        ...payload,
      };
    case ACTIONS.CREATE_MESSAGE:
      return {
        ...state,
      };
    case ACTIONS.CREATE_COMMENT:
      return {
        ...state,
      };
    case ACTIONS.GET_EMOTIONS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
