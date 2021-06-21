/**
 * generates a unique id for a reporting session
 * @method
 * @returns {String}
 */
export const generateUniqueId = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

/**
 * maps a generic metric to an object
 * @method
 * @param {String} sessionId - current session id
 * @param {Object} metric - current metric data
 * @returns {Object}
 */
export const mapVitalsMetric = (sessionId, metric) => {
  return {
    vital: {
      id: sessionId,
      name: metric.name,
      delta: metric.delta,
      value: metric.value,
    },
  };
};

/**
 * maps a response timing object (resource)
 * https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Timing_resource_loading_phases
 * @method
 * @param {String} sessionId - current session id
 * @param {Object} metric - current metric data
 * @returns {Object}
 */
export const mapResourceMetric = (sessionId, metric) => {
  return {
    resource: {
      id: sessionId,
      name: metric.name,
      initiatorType: metric.initiatorType,
      decodedBodySize: metric.decodedBodySize,
      encodedBodySize: metric.encodedBodySize,
      transferSize: metric.transferSize,
      redirectTime: metric.redirectEnd - metric.redirectStart,
      dnsLookupTime: metric.domainLookupEnd - metric.domainLookupStart,
      tcpHandshakeTime: metric.connectEnd - metric.connectStart,
      responseTime: metric.responseEnd - metric.responseStart,
      secureConnectionTime:
        metric.secureConnectionStart > 0
          ? metric.connectEnd - metric.secureConnectionStart
          : 0,
      fetchUntilResponseEndTime:
        metric.fetchStart > 0 ? metric.responseEnd - metric.fetchStart : 0,
      requestStartUntilResponseEndTime:
        metric.fetchStart > 0 ? metric.responseEnd - metric.fetchStart : 0,
      startUntilResponseEndTime:
        metric.startTime > 0 ? metric.responseEnd - metric.startTime : 0,
    },
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
