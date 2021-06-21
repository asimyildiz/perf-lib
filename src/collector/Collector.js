import { getTTFB, getFCP, getLCP, getFID, getCLS } from 'web-vitals/base';
import { mapVitalsMetric, mapResourceMetric } from '../utils';

/**
 * Class representing a Collector
 * This is an abstract class
 */
class Collector {
  /**
   * Create a Collector
   * @param {String} sessionId - current session id
   * @param {Object} sessionData - current session data
   * @param {Reporter} repoter - Reporter object
   */
  constructor(sessionId, sessionData, reporter) {
    this.sessionId = sessionId;
    this.result = [sessionData];
    this.reporter = reporter;
  }

  /**
   * abstract handleData method
   * this method needs to be overriden by sub-classes
   * @param {Function} mapMetric - mapper function for metric
   * @param {Object} metric - current metric data
   */
  handleData(mapMetric, metric) {
    if (metric.name !== this.reporter.getUrl()) {
      this._handleData(mapMetric, metric);
    }
  }

  /**
   * abstract _handleData method
   * this method needs to be overriden by sub-classes
   * @param {Function} mapMetric - mapper function for metric
   * @param {Object} metric - current metric data
   */
  _handleData(mapMetric, metric) {
    throw new Error('You have to implement the method _handleData!');
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
    const handler = this.handleData.bind(this, mapResourceMetric);
    const performanceObserver = new PerformanceObserver((items, observer) => {
      items.getEntries().forEach(handler);
    });

    performanceObserver.observe({ entryTypes: ['resource'] });
  }

  /**
   * collect timing values from web-vitals/base
   */
  _collectTimings() {
    const handler = this.handleData.bind(this, mapVitalsMetric);
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
