/**
 * generates a unique id for a reporting session
 * @method
 * @returns {String}
 */
export const generateUniqueId = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

/**
 * round number with precision
 * @param {Number} value - number to be rounded
 * @param {Number} precision - precision
 * @returns {Number}
 */
export const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

/**
 * maps a metric to an object
 * @method
 * @param {Object} metric - current metric data
 * @returns {Object}
 */
export const mapMetric = (metric) => {
  const isWebVital =
    ['TTFB', 'FCP', 'LCP', 'FID', 'CLS'].indexOf(metric.name) !== -1;

  return {
    [metric.name]: isWebVital
      ? round(metric.value, metric.name === 'CLS' ? 4 : 0)
      : metric.value,
  };
};
