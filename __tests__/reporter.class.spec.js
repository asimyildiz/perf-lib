import ReportFactory from '../src/reporter/ReportFactory';
import Reporter from '../src/reporter/Reporter';
import BeaconReporter from '../src/reporter/BeaconReporter';
import IdleReporter from '../src/reporter/IdleReporter';

describe('reporterd classes', () => {
  // !TODO remove it after xmlHttpRequest is start being used
  it.skip('It should not have called xmlhttprequest if there is no data passed to report on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(window, 'XMLHttpRequest');
    const result = {
      data: [],
    };
    idleReporter.makeRequest(result);
    expect(spy).not.toHaveBeenCalled();
  });

  // !TODO remove it after xmlHttpRequest is start being used
  it.skip('It should have pop data after makeRequest is called on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(window, 'XMLHttpRequest');
    const result = {
      data: [{name: 'TTFB', value: 1.2}],
    };
    idleReporter.makeRequest(result);
    expect(result.data.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('It should have call makeRequest using requestIdleCallback on IdleReporter after report is called, idle', () => {
    window.requestIdleCallback = jest.fn((report) => {
      report();
    });

    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(idleReporter, 'makeRequest');
    const result = {
      data: [{name: 'TTFB', value: 1.2}],
    };
    idleReporter.report(result);
    expect(spy).toHaveBeenCalled();
  });

  it('It should not have called makeRequest if there is an ongoing request on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    idleReporter.reportInProgress = true;
    const spy = jest.spyOn(idleReporter, 'makeRequest');
    const result = {
      data: [{name: 'TTFB', value: 1.2}],
    };
    idleReporter.report(result);
    expect(spy).not.toHaveBeenCalled();
  });

  it('It should have pop data after makeRequest is called on IdleReporter and call report again if data length > 0, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    idleReporter.report = jest.fn();
    const result = {
      data: [
        {name: 'TTFB', value: 1.2},
        {name: 'FCP', value: 2.3},
      ],
    };
    idleReporter.makeRequest(result);
    expect(result.data.length).toBe(1);
    expect(idleReporter.report).toHaveBeenCalled();
  });

  // !TODO remove it after navigator.sendBeacon is start being used
  it.skip('It should have call navigator.sendBeacon on IdleReporter after report is called, beacon', () => {
    const beaconReporter = ReportFactory.createReporter(
      'beacon',
      'http://test',
    );
    const spy = jest.spyOn(navigator, 'sendBeacon');
    const result = {
      data: [{name: 'TTFB', value: 1.2}],
    };
    beaconReporter.report(result);
    expect(spy).toHaveBeenCalled();
  });

  it('It should throw an error when report is called, if Reporter class is instantiated directly', () => {
    const reporter = new Reporter();
    try {
      reporter.report();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('You have to implement the method report!');
    }
  });
});
