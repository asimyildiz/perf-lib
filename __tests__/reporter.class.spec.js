import ReportFactory from '../src/reporter/ReportFactory';
import Reporter from '../src/reporter/Reporter';
import BeaconReporter from '../src/reporter/BeaconReporter';
import IdleReporter from '../src/reporter/IdleReporter';

describe('reporterd classes', () => {
  it('It should not have called xmlhttprequest if there is no data passed to report on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(window, 'XMLHttpRequest');
    idleReporter.makeRequest(null);
    expect(spy).not.toHaveBeenCalled();

    idleReporter.makeRequest([]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('It should have pop data after makeRequest is called on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(window, 'XMLHttpRequest');
    const result = [{ name: 'TTFB', value: 1.2, delta: 1.2 }];
    idleReporter.makeRequest(result);
    expect(result.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('It should have call makeRequest using requestIdleCallback on IdleReporter after report is called, idle', () => {
    window.requestIdleCallback = jest.fn((report) => {
      report();
    });

    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    const spy = jest.spyOn(idleReporter, 'makeRequest');
    const result = [{ name: 'TTFB', value: 1.2, delta: 1.2 }];
    idleReporter.report(result);
    expect(spy).toHaveBeenCalled();
  });

  it('It should not have called makeRequest if there is an ongoing request on IdleReporter, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    idleReporter.reportInProgress = true;
    const spy = jest.spyOn(idleReporter, 'makeRequest');
    const result = [{ name: 'TTFB', value: 1.2, delta: 1.2 }];
    idleReporter.report(result);
    expect(spy).not.toHaveBeenCalled();
  });

  it('It should have pop data after makeRequest is called on IdleReporter and call report again if data length > 0, idle', () => {
    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    idleReporter.report = jest.fn();
    const result = [
      { name: 'TTFB', value: 1.2, delta: 1.2 },
      { name: 'FCP', value: 2.3, delta: 2.3 },
    ];
    idleReporter.makeRequest(result);
    expect(result.length).toBe(1);
    expect(idleReporter.report).toHaveBeenCalled();
  });

  it('It should have call navigator.sendBeacon on IdleReporter after report is called, beacon', () => {
    const beaconReporter = ReportFactory.createReporter(
      'beacon',
      'http://test',
    );
    const spy = jest.spyOn(navigator, 'sendBeacon');
    const result = [{ name: 'TTFB', value: 1.2, delta: 1.2 }];
    beaconReporter.report(result);
    expect(spy).toHaveBeenCalled();
    expect(result.length).toBe(0);
  });

  it('It should have call navigator.sendBeacon on IdleReporter after report is called, beacon', () => {
    const beaconReporter = ReportFactory.createReporter(
      'beacon',
      'http://test',
    );
    navigator.sendBeacon = jest.fn(() => false);
    const spy = jest.spyOn(navigator, 'sendBeacon');
    const result = [{ name: 'TTFB', value: 1.2, delta: 1.2 }];
    beaconReporter.report(result);
    expect(spy).toHaveBeenCalled();
    expect(result.length).toBe(1);
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
