import ReportFactory from './reporter/ReportFactory';

/**
 * creates a Reporter object
 * @method
 * @param {String} type - 'idle', 'beacon'
 * @param {String} url - current url to report
 * @returns {Reporter}
 */
export const reporter = (type, url) => {
  return ReportFactory.createReporter(type, url);
};
