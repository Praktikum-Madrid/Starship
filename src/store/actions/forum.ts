/* eslint-disable import/prefer-default-export */

import { forum } from 'api/frontend';
import { AxiosResponse } from 'axios';
import { TPostgresMessage, TPostgresThread } from 'types';

export const ACTIONS = {
  GET_THREADS: 'GET_THREADS',
  GET_THREAD: 'GET_THREAD',
  GET_MESSAGES: 'GET_MESSAGES',
  RESET_THREAD: 'RESET_THREAD',
  CREATE_THREAD: 'CREATE_THREAD',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  CREATE_COMMENT: 'CREATE_COMMENT',
  GET_COMMENTS_BY_MESSAGE: 'GET_COMMENTS_BY_MESSAGE',
  GET_EMOTIONS: 'GET_EMOTIONS',
};

// получение всех тем
export const getThreads = () => async (dispatch: any) => {
  await forum
    .getThreads()
    .then((response: AxiosResponse) => {
      dispatch({
        type: ACTIONS.GET_THREADS,
        payload: {
          threads: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// получение темы и ее сообщений
export const getThreadWithMessages = (threadId: number) => async (dispatch: any) => {
  try {
    const responseThread = await forum.getThreadById(threadId);
    if (responseThread.status === 200) {
      dispatch({
        type: ACTIONS.GET_THREAD,
        payload: {
          thread: responseThread.data,
        },
      });
      const responseMessages = await forum.getMessagesByThread(threadId);
      if (responseMessages.status === 200) {
        dispatch({
          type: ACTIONS.GET_MESSAGES,
          payload: {
            messages: responseMessages.data,
          },
        });
      }
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

// очистка темы и ее сообщений
export const resetThread = () => async (dispatch: any) => {
  dispatch({
    type: ACTIONS.RESET_THREAD,
  });
};

// создание темы
export const createThread = ({
  name,
  text,
}: TPostgresThread) => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const authorId = state.settings.userIdDB;
    const data = {
      name,
      text,
      authorId,
    };
    const responseThread = await forum.createThread(data);
    if (responseThread.status === 200) {
      dispatch({
        type: ACTIONS.CREATE_THREAD,
        payload: {
          thread: responseThread.data,
          messages: [],
        },
      });
      const responseThreads = await forum.getThreads();
      dispatch({
        type: ACTIONS.GET_THREADS,
        payload: {
          threads: responseThreads.data,
        },
      });
    }
    return responseThread.data;
  } catch (error) {
    console.log(error);
  }
};

// создание сообщения
export const createMessage = ({
  text, emotionId,
}: TPostgresMessage) => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const authorId = state.settings.userIdDB;
    const { id: threadId } = state.forum.thread || {};
    const data = {
      text,
      threadId,
      emotionId,
      authorId,
    };
    const responseMessage = await forum.createMessage(data);
    if (responseMessage.status === 200) {
      dispatch({
        type: ACTIONS.CREATE_MESSAGE,
      });
    }
    const responseMessages = await forum.getMessagesByThread(threadId);
    if (responseMessages.status === 200) {
      dispatch({
        type: ACTIONS.GET_MESSAGES,
        payload: {
          messages: responseMessages.data,
        },
      });
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

// создание коммента
export const createMessageToMessage = ({
  text, emotionId, replyToMessageId,
}: TPostgresMessage) => async (dispatch: any, getState: any) => {
  try {
    const state = getState();
    const authorId = state.settings.userIdDB;
    const { id: threadId } = state.forum.thread || {};
    const data = {
      text,
      threadId,
      emotionId,
      authorId,
      replyToMessageId,
    };
    const responseMessage = await forum.createMessageToMessage(data);
    if (responseMessage.status === 200) {
      dispatch({
        type: ACTIONS.CREATE_COMMENT,
      });
    }
    const responseMessages = await forum.getMessagesByThread(threadId);
    if (responseMessages.status === 200) {
      dispatch({
        type: ACTIONS.GET_MESSAGES,
        payload: {
          messages: responseMessages.data,
        },
      });
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

// получение эмоций
export const getEmotions = () => async (dispatch: any) => {
  await forum
    .getEmotions()
    .then((response: AxiosResponse) => {
      dispatch({
        type: ACTIONS.GET_EMOTIONS,
        payload: {
          emotions: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
