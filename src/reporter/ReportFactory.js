import IdleReporter from './IdleReporter';
import BeaconReporter from './BeaconReporter';

/**
 * Class representing Report Factory
 * This class will create the instance of Reporter class
 *  based on the parameter passed to this
 */
class ReportFactory {
  /**
   * create an instance of Reporter class based on type
   * @param {String} type - 'idle', 'beacon'
   * @param {String} url - current url to report
   * @returns {Reporter} - Reporter object
   * @static
   */
  static createReporter(type, url) {
    switch (type) {
      case 'idle':
        return new IdleReporter(url);
      case 'beacon':
      default:
        return new BeaconReporter(url);
    }
  }
}

export default ReportFactory;
