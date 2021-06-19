/**
 * generates a unique id for a reporting session
 * @method
 * @returns {String}
 */
export const generateUniqueId = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

/**
 * maps a metric to an object
 * @method
 * @param {Object} metric - current metric data
 * @returns {Object}
 */
export const mapMetric = (metric) => {
  return {
    [metric.name]: metric,
  };
};

/**
 * get current device info
 * @method
 * @returns {Object}
 */
export const getDeviceInfo = () => {
  return {
    url: location?.href,
    referrer: document?.referrer,
    userAgent: navigator?.userAgent,
    memory: navigator?.deviceMemory,
    cpus: navigator?.hardwareConcurrency,
    connection: navigator?.connection && {
      effectiveType: navigator.connection?.effectiveType,
      rtt: navigator.connection?.rtt,
      downlink: navigator.connection?.downlink,
    },
  };
};
