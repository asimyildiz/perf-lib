import CollectFactory from '../src/collector/CollectFactory';
import Collector from '../src/collector/Collector';
import GroupCollector from '../src/collector/GroupCollector';
import SingleCollector from '../src/collector/SingleCollector';

describe('collector classes', () => {
  it('It should have call reportData immediately on SingleCollector, idle', () => {
    const reportCollector = { report: jest.fn() };
    const singleCollector = CollectFactory.createCollector(
      'idle',
      { id: 1, init: { url: 'https://www' } },
      reportCollector
    );
    expect(singleCollector).toBeInstanceOf(SingleCollector);
    const spy = jest.spyOn(singleCollector, 'reportData');
    singleCollector.handleData({
      name: 'TTFB',
      value: 1.2,
      delta: 1.2,
    });
    expect(spy).toHaveBeenCalled();
    expect(reportCollector.report).toHaveBeenCalled();
  });

  it('It should group metrics together on GroupCollector, beacon', () => {
    const groupCollector = CollectFactory.createCollector('beacon', {
      id: 1,
      init: { url: 'https://www' },
    });
    expect(groupCollector).toBeInstanceOf(GroupCollector);
    groupCollector.handleData({
      name: 'TTFB',
      value: 1.2,
      delta: 1.2,
    });
    groupCollector.handleData({
      name: 'FCP',
      value: 2.3,
      delta: 2.3,
    });
    expect(groupCollector.result).toStrictEqual([
      { id: 1, init: { url: 'https://www' } },
      {
        TTFB: {
          name: 'TTFB',
          value: 1.2,
          delta: 1.2,
        },
      },
      {
        FCP: {
          name: 'FCP',
          value: 2.3,
          delta: 2.3,
        },
      },
    ]);
  });

  it('It should throw an error when handleData is called, if Collector class is instantiated directly', () => {
    const collector = new Collector();
    try {
      collector.handleData();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('You have to implement the method handleData!');
    }
  });

  it('It should start listening for web-vitals methods when collect method is called on a Collector object', () => {
    const collector = new Collector();
    collector.handleData = jest.fn();
    collector.collect();

    expect(collector.handleData).toHaveBeenCalledTimes(8);
  });
});
