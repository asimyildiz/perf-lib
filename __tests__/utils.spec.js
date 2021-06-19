import * as Util from '../src/utils';

const getNow = () => new Date(Date.now());

describe('utils function', () => {
  it('It should create a unique id successfully', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-06-14T11:03:28.135Z').valueOf()
      );

    jest.spyOn(global.Math, 'random').mockImplementationOnce(() => 0.5);

    expect(Util.generateUniqueId()).toBe('v1-1623668608135-5499999999999');
  });

  it('should calculate metrics correctly', () => {
    const metrics = [
      {
        name: 'TTFB',
        value: 1.2,
        delta: 1.2,
      },
      {
        name: 'FCP',
        value: 2.3,
        delta: 2.3,
      },
      {
        name: 'https://css',
        value: 4.5,
      },
    ];

    const results = [
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
      {
        'https://css': {
          name: 'https://css',
          value: 4.5,
        },
      },
    ];

    metrics.forEach((item, index) => {
      expect(Util.mapMetric(item)).toStrictEqual(results[index]);
    });
  });

  it('should get device info correctly', () => {
    const deviceInfo = Util.getDeviceInfo();
    expect(Object.keys(deviceInfo)).toStrictEqual([
      'url',
      'referrer',
      'userAgent',
      'memory',
      'cpus',
      'connection',
    ]);
  });

  it('should get device info/connection correctly when empty', () => {
    mockNavigatorPerformance();
    const deviceInfo = Util.getDeviceInfo();
    expect(deviceInfo.connection).toBe(undefined);
  });

  it('should get device info/connection correctly when set', () => {
    mockNavigatorPerformance({
      effectiveType: '',
      rtt: '',
      downlink: '',
    });

    const deviceInfo = Util.getDeviceInfo();
    expect(Object.keys(deviceInfo.connection)).toStrictEqual([
      'effectiveType',
      'rtt',
      'downlink',
    ]);
  });
});
