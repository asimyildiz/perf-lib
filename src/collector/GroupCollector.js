import { mapMetric } from '../utils';
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
   * @param {Object} metric - current metric data
   * @override
   */
  handleData(metric) {
    this.result.push(mapMetric(metric));
  }
}

export default GroupCollector;
