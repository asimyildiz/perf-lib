import Collector from './Collector';

/**
 * Class representing a GroupCollector
 * This class groups the data and then reports it from a single point
 * @extends Collector
 */
class GroupCollector extends Collector {
  /**
   * handleData method implementation for GroupCollector
   * this method merges all metrics into a single property
   * @param {Function} mapMetric - mapper function for metric
   * @param {Object} metric - current metric data
   * @override
   */
  _handleData(mapMetric, metric) {
    this.result.push(mapMetric(this.sessionId, metric));
  }
}

export default GroupCollector;
