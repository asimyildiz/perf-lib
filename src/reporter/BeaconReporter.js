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
   * @param {Array<Object>} result - all metric data
   * @override
   */
  report(result) {
    const isSuccessfull = navigator.sendBeacon(
      this.url,
      JSON.stringify(result),
    );
    if (isSuccessfull) {
      result.splice(0, result.length);
    }
  }
}

export default BeaconReporter;
