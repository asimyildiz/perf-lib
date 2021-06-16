import 'navigator.sendbeacon';
import Reporter from './Reporter';

/**
 * Class representing a BeaconReporter
 * This class reports the data using navigator.sendBeacon method
 * navigator.sendBeacon method is designed for analytics purpose
 * @extends Reporter
 */
class BeaconReporter extends Reporter {
  /**
   * report method implementation for BeaconReporter
   * this method reports the data using navigator.sendBeacon
   * @param {Object} result - all metric data
   * @override
   */
  report(result) {
    console.info('beacon report', result);
    // navigator.sendBeacon(this.url, JSON.stringify(result));
  }
}

export default BeaconReporter;
