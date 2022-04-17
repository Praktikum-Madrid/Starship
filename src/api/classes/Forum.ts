import { TRequestData } from 'types';
import Api from './Api';

// запросы с фронта к форуму
class Forum extends Api {
  private readonly _getThreadsURL: string;

  private readonly _getThreadByIdURL: string;

  private readonly _createThreadURL: string;

  private readonly _getMessagesByThreadURL: string;

  private readonly _createMessageURL: string;

  private readonly _createMessageToMessageURL: string;

  private readonly _getMessagesByParentIdMessageURL: string;

  private readonly _getEmotionsURL: string;

  constructor({
    apiURL,
    getThreads,
    getThreadById,
    createThread,
    getMessagesByThread,
    createMessage,
    createMessageToMessage,
    getMessagesByParentIdMessage,
    getEmotions,
  }: Record<string, string>) {
    super(apiURL);
    this._getThreadsURL = this.apiUrl + getThreads;
    this._getThreadByIdURL = this.apiUrl + getThreadById;
    this._createThreadURL = this.apiUrl + createThread;
    this._getMessagesByThreadURL = this.apiUrl + getMessagesByThread;
    this._createMessageURL = this.apiUrl + createMessage;
    this._createMessageToMessageURL = this.apiUrl + createMessageToMessage;
    this._getMessagesByParentIdMessageURL = this.apiUrl + getMessagesByParentIdMessage;
    this._getEmotionsURL = this.apiUrl + getEmotions;
  }

  getThreads() {
    return this.get(this._getThreadsURL);
  }

  getEmotions() {
    return this.get(this._getEmotionsURL);
  }

  getThreadById(threadId: number) {
    return this.get(`${this._getThreadByIdURL}${threadId}`);
  }

  getMessagesByThread(threadId: number) {
    return this.get(`${this._getMessagesByThreadURL}${threadId}`);
  }

  getMessagesByParentIdMessage(replyToMessageId: number) {
    return this.get(`${this._getMessagesByParentIdMessageURL}${replyToMessageId}`);
  }

  createThread(data: TRequestData) {
    return this.post(this._createThreadURL, data);
  }

  createMessage(data: TRequestData) {
    return this.post(this._createMessageURL, data);
  }

  createMessageToMessage(data: TRequestData) {
    return this.post(this._createMessageToMessageURL, data);
  }
}

export default Forum;
