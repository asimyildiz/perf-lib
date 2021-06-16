import {collector} from '../src/collector';
import CollectFactory from '../src/collector/CollectFactory';
import Collector from '../src/collector/Collector';
import GroupCollector from '../src/collector/GroupCollector';
import SingleCollector from '../src/collector/SingleCollector';

describe('collector function', () => {
  it('It should instantiate a Collector object based on type parameter passed, idle', () => {
    expect(collector('idle')).toBeInstanceOf(SingleCollector);
    expect(collector('idle')).toBeInstanceOf(Collector);

    const singleCollector = CollectFactory.createCollector('idle');
    expect(singleCollector).toBeInstanceOf(SingleCollector);
  });

  it('It should instantiate a Collector object based on type parameter passed, beacon', () => {
    expect(collector('beacon')).toBeInstanceOf(GroupCollector);
    expect(collector('idle')).toBeInstanceOf(Collector);

    const groupCollector = CollectFactory.createCollector('beacon');
    expect(groupCollector).toBeInstanceOf(GroupCollector);
  });

  it('It should instantiate a Collector object when no parameter passed', () => {
    expect(collector()).toBeInstanceOf(GroupCollector);
    expect(collector()).toBeInstanceOf(Collector);

    const groupCollector = CollectFactory.createCollector('');
    expect(groupCollector).toBeInstanceOf(GroupCollector);
  });
});
