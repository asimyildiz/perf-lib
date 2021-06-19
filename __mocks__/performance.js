const entries = [
  { name: 'https://css', startTime: 1 },
  { name: 'https://img', startTime: 1 },
  { name: 'https://js', duration: 4 },
];

class MockPerformanceObserver {
  static simulateErrorOnObserve = false;
  static supportedEntryTypes = {};

  constructor(cb) {
    this.observe = (options) => {
      if (MockPerformanceObserver.simulateErrorOnObserve) {
        MockPerformanceObserver.simulateErrorOnObserve = false;
        throw new Error('Simulated Error');
      }
      cb({ getEntries: () => [...entries] });
      return {};
    };
  }

  disconnect() {}
}

export default {
  PerformanceObserver: MockPerformanceObserver,
};
