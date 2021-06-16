global.mockVisibilityState = (visibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => {
      return visibilityState;
    },
  });
  document.dispatchEvent(new Event('visibilitychange'));
};

global.mockPerformanceObserver = (supportedEntryTypes) => {
  global.PerformanceObserver = {
    supportedEntryTypes,
  };
};
