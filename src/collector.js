import { generateUniqueId, getDeviceInfo } from './utils';
import CollectFactory from './collector/CollectFactory';

/**
 * creates a Collector object
 * @method
 * @param {String} type - 'idle', 'beacon'
 * @param {Reporter} reporter - Reporter object
 * @returns {Collector}
 */
export const collector = (type, reporter) => {
  const sessionData = { id: generateUniqueId(), init: { ...getDeviceInfo() } };
  return CollectFactory.createCollector(type, sessionData, reporter);
};
