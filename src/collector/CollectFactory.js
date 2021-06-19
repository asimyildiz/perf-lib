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
   * @param {Object} sessionData - current session data
   * @param {Reporter} reporter - active reporter object
   * @returns {Collector} - Collector object
   * @static
   */
  static createCollector(type, sessionData, reporter) {
    switch (type) {
      case 'idle':
        return new SingleCollector(sessionData, reporter);
      case 'beacon':
      default:
        return new GroupCollector(sessionData, reporter);
    }
  }
}

export default CollectFactory;
