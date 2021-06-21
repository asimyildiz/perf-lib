import * as Util from '../src/utils';
import CollectFactory from '../src/collector/CollectFactory';
import Reporter from '../src/reporter/Reporter';
import Collector from '../src/collector/Collector';
import GroupCollector from '../src/collector/GroupCollector';
import SingleCollector from '../src/collector/SingleCollector';

describe('collector classes', () => {
  it('It should have call reportData immediately on SingleCollector, idle', () => {
    const idleReporter = new Reporter('http://url');
    idleReporter.report = jest.fn();

    const singleCollector = new SingleCollector('1', {}, idleReporter);
    const spy = jest.spyOn(singleCollector, 'reportData');
    singleCollector.handleData(Util.mapVitalsMetric, {
      name: 'TTFB',
      value: 1.2,
      delta: 1.2,
    });
    expect(spy).toHaveBeenCalled();
    expect(idleReporter.report).toHaveBeenCalled();
  });

  it('It should not have call reportData immediately on SingleCollector when url is the same, idle', () => {
    const idleReporter = new Reporter('http://url');
    idleReporter.report = jest.fn();

    const singleCollector = new SingleCollector('1', {}, idleReporter);
    const spy = jest.spyOn(singleCollector, '_handleData');
    singleCollector.handleData(Util.mapVitalsMetric, {
      name: 'http://url',
      value: 1.2,
      delta: 1.2,
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it('It should group metrics together on GroupCollector, beacon', () => {
    const beaconReporter = new Reporter('http://url');
    beaconReporter.report = jest.fn();

    const groupCollector = CollectFactory.createCollector(
      'beacon',
      '1',
      { device: { id: '1', url: 'http://test' } },
      beaconReporter,
    );
    expect(groupCollector).toBeInstanceOf(GroupCollector);
    groupCollector.handleData(Util.mapVitalsMetric, {
      name: 'TTFB',
      value: 1.2,
      delta: 1.2,
    });
    groupCollector.handleData(Util.mapVitalsMetric, {
      name: 'FCP',
      value: 2.3,
      delta: 2.3,
    });
    expect(groupCollector.result).toStrictEqual([
      { device: { id: '1', url: 'http://test' } },
      {
        vital: {
          id: '1',
          name: 'TTFB',
          value: 1.2,
          delta: 1.2,
        },
      },
      {
        vital: {
          id: '1',
          name: 'FCP',
          value: 2.3,
          delta: 2.3,
        },
      },
    ]);
  });

  it('It should start listening for web-vitals methods when collect method is called on a Collector object', () => {
    const collector = new Collector();
    collector.handleData = jest.fn();
    collector.collect();

    expect(collector.handleData).toHaveBeenCalledTimes(8);
  });

  it('It should throw an error when _handleData is called, if Collector class is instantiated directly', () => {
    const collector = new Collector();
    try {
      collector._handleData();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('You have to implement the method _handleData!');
    }
  });
});
