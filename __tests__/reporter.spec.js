import {reporter} from '../src/reporter';
import ReportFactory from '../src/reporter/ReportFactory';
import BeaconReporter from '../src/reporter/BeaconReporter';
import IdleReporter from '../src/reporter/IdleReporter';
import Reporter from '../src/reporter/Reporter';

describe('reporter function', () => {
  it('It should instantiate a Reporter object based on type parameter passed, idle', () => {
    expect(reporter('idle')).toBeInstanceOf(IdleReporter);
    expect(reporter('idle')).toBeInstanceOf(Reporter);

    const idleReporter = ReportFactory.createReporter('idle', 'http://test');
    expect(idleReporter).toBeInstanceOf(IdleReporter);
  });

  it('It should instantiate a Reporter object based on type parameter passed, beacon', () => {
    expect(reporter('beacon')).toBeInstanceOf(BeaconReporter);
    expect(reporter('idle')).toBeInstanceOf(Reporter);

    const beaconReporter = ReportFactory.createReporter(
      'beacon',
      'http://test',
    );
    expect(beaconReporter).toBeInstanceOf(BeaconReporter);
  });

  it('It should instantiate a Reporter object when no parameter passed', () => {
    expect(reporter()).toBeInstanceOf(BeaconReporter);
    expect(reporter()).toBeInstanceOf(Reporter);

    const beaconReporter = ReportFactory.createReporter();
    expect(beaconReporter).toBeInstanceOf(BeaconReporter);
  });
});
