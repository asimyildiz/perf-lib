global.mockVisibilityState = (visibilityState) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => {
      return visibilityState;
    },
  });
  document.dispatchEvent(new Event('visibilitychange'));
};

global.mockNavigatorPerformance = (connection) => {
  if (!connection) {
    delete global.navigator.connection;
  } else {
    global.navigator.connection = connection;
  }
};
