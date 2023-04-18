import { Container } from 'typedi';
import EventEmitter from 'eventemitter3';
import loggerInstance from './logger.js'

export default async () => {
  Container.set('logger', loggerInstance)
  Container.set('events', new EventEmitter());
  return;
}