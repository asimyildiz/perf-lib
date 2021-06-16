import 'requestidlecallback-polyfill';
import Reporter from './Reporter';

/**
 * Class representing a IdleReporter
 * This class reports the data using window.requestIdleCallback method
 * window.requestIdleCallback method is designed to send data when
 *  browser is idle
 * @extends Reporter
 */
class IdleReporter extends Reporter {
  /**
   * if there are more data to be sent
   *  send the data using XmlHttpRequest
   *  then pop the data which is sent
   *  if there are still data to be sent
   *  continue reporting
   * @param {Object} result - all metric data
   */
  makeRequest(result) {
    if (result?.data?.length > 0) {
      console.info('idle report', result.data.pop());
      /**
       const client = new XMLHttpRequest();
       client.open('POST', this.url, false);
       client.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
       client.send(JSON.stringify({id: result.id, data: [result.data.pop()]}));
       **/
      this.reportInProgress = false;

      if (result.data.length > 0) {
        this.report(result);
      }
    }
  }

  /**
   * report method implementation for IdleReporter
   * this method reports the data using window.requestIdleCallback
   * @param {Object} result - all metric data
   * @override
   */
  report(result) {
    if (this.reportInProgress) {
      return;
    }

    this.reportInProgress = true;
    window.requestIdleCallback(this.makeRequest.bind(this, result), {
      timeout: 3000,
    });
  }
}

export default IdleReporter;
