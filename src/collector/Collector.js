import {getTTFB, getFCP, getLCP, getFID, getCLS} from 'web-vitals/base';

/**
 * Class representing a Collector
 * This is an abstract class
 */
class Collector {
  /**
   * Create a Collector
   * @param {String} sessionId - current session id
   * @param {Reporter} repoter - Reporter object
   */
  constructor(sessionId, reporter) {
    this.result = {id: sessionId, data: null};
    this.reporter = reporter;
  }

  /**
   * abstract handleData method
   * this method needs to be overriden by sub-classes
   * @param {Object} metric - current metric data
   */
  handleData(metric) {
    throw new Error('You have to implement the method handleData!');
  }

  /**
   * reportData method
   * this method reports current metrics
   */
  reportData() {
    this.reporter.report(this.result);
  }

  /**
   * handleData method
   * this method handles collecting of metrics for performance
   */
  collect() {
    const handler = this.handleData.bind(this);
    getTTFB(handler);
    getFCP(handler);
    getLCP(handler);
    getFID(handler);
    getCLS(handler);
  }
}

export default Collector;
