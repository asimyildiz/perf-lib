import { mapMetric } from '../utils';
import Collector from './Collector';

/**
 * Class representing a SingleCollector
 * This class pushes the data and then start reporting it immediately
 * @extends Collector
 */
class SingleCollector extends Collector {
  /**
   * handleData method implementation for SingleCollector
   * this method pushes new metrics into a single property,
   *  then it will call reportdata immediateliy to start reporting
   *  the reporting depends on the browser's idle state
   * these metrics will be popped out later after reported
   * @param {Object} metric - current metric data
   * @override
   */
  handleData(metric) {
    this.result.push(mapMetric(metric));
    this.reportData();
  }
}

export default SingleCollector;
