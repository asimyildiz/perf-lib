import SingleCollector from './SingleCollector';
import GroupCollector from './GroupCollector';

/**
 * Class representing Collect Factory
 * This class will create the instance of Collector class
 *  based on the parameter passed to this
 */
class CollectFactory {
  /**
   * create an instance of Collector class based on type
   * @param {String} type - 'idle', 'beacon'
   * @param {String} sessionId - current session id
   * @param {Reporter} reporter - active reporter object
   * @returns {Collector} - Collector object
   * @static
   */
  static createCollector(type, sessionId, reporter) {
    switch (type) {
      case 'idle':
        return new SingleCollector(sessionId, reporter);
      case 'beacon':
      default:
        return new GroupCollector(sessionId, reporter);
    }
  }
}

export default CollectFactory;
