import { getTTFB, getFCP, getLCP, getFID, getCLS } from 'web-vitals/base';

/**
 * Class representing a Collector
 * This is an abstract class
 */
class Collector {
  /**
   * Create a Collector
   * @param {Object} sessionData - current session data
   * @param {Reporter} repoter - Reporter object
   */
  constructor(sessionData, reporter) {
    this.result = [sessionData];
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
   * collect performance values from perf_hooks
   */
  _collectPerformance() {
    const handler = this.handleData.bind(this);
    const performanceObserver = new PerformanceObserver((items, observer) => {
      items.getEntries().forEach(handler);
    });

    performanceObserver.observe({ entryTypes: ['resource'] });
  }

  /**
   * collect timing values from web-vitals/base
   */
  _collectTimings() {
    const handler = this.handleData.bind(this);
    getTTFB(handler);
    getFCP(handler);
    getLCP(handler);
    getFID(handler);
    getCLS(handler);
  }

  /**
   * handleData method
   * this method handles collecting of metrics for performance
   */
  collect() {
    this._collectTimings();
    this._collectPerformance();
  }
}

export default Collector;
