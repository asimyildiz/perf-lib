import {generateUniqueId} from './utils';
import CollectFactory from './collector/CollectFactory';

/**
 * creates a Collector object
 * @method
 * @param {String} type - 'idle', 'beacon'
 * @param {Reporter} reporter - Reporter object
 * @returns {Collector}
 */
export const collector = (type, reporter) => {
  const sessionId = generateUniqueId();
  return CollectFactory.createCollector(type, sessionId, reporter);
};
