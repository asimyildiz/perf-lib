/**
 * Class representing a Reporter
 * This is an abstract class
 */
class Reporter {
  /**
   * Create a Reporter
   * @param {String} url - current url to report
   */
  constructor(url) {
    this.url = url;
    this.reportInProgress = false;
  }

  /**
   * abstract report method
   * this method needs to be overriden by sub-classes
   * @param {Object} result - all metric data
   */
  report(result) {
    throw new Error('You have to implement the method report!');
  }
}

export default Reporter;
