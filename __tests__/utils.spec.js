import * as Util from '../src/utils';

const getNow = () => new Date(Date.now());

describe('utils function', () => {
  it('It should create a unique id successfully', () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2021-06-14T11:03:28.135Z').valueOf(),
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
    ];

    const results = [
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
    ];

    metrics.forEach((item, index) => {
      expect(Util.mapVitalsMetric('1', item)).toStrictEqual(results[index]);
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

  it('should calculate resource metrics correctly', () => {
    const metric = {
      name: 'resource',
      initiatorType: 'img',
      decodedBodySize: 1000,
      encodedBodySize: 1000,
      transferSize: 1000,
      redirectEnd: 3,
      redirectStart: 2,
      domainLookupEnd: 3,
      domainLookupStart: 2,
      connectEnd: 3,
      connectStart: 2,
      responseEnd: 3,
      responseStart: 2,
      secureConnectionStart: 2,
      fetchStart: 2,
      startTime: 2,
    };

    const result = {
      resource: {
        id: '1',
        name: 'resource',
        initiatorType: 'img',
        decodedBodySize: 1000,
        encodedBodySize: 1000,
        transferSize: 1000,
        redirectTime: 1,
        dnsLookupTime: 1,
        tcpHandshakeTime: 1,
        responseTime: 1,
        secureConnectionTime: 1,
        fetchUntilResponseEndTime: 1,
        requestStartUntilResponseEndTime: 1,
        startUntilResponseEndTime: 1,
      },
    };

    expect(Util.mapResourceMetric('1', metric)).toStrictEqual(result);

    metric.secureConnectionStart = 0;
    result.resource.secureConnectionTime = 0;
    expect(Util.mapResourceMetric('1', metric)).toStrictEqual(result);

    metric.secureConnectionStart = 2;
    metric.fetchStart = 0;
    result.resource.secureConnectionTime = 1;
    result.resource.fetchUntilResponseEndTime = 0;
    result.resource.requestStartUntilResponseEndTime = 0;
    expect(Util.mapResourceMetric('1', metric)).toStrictEqual(result);

    metric.fetchStart = 2;
    metric.startTime = 0;
    result.resource.requestStartUntilResponseEndTime = 1;
    result.resource.fetchUntilResponseEndTime = 1;
    result.resource.startUntilResponseEndTime = 0;
    expect(Util.mapResourceMetric('1', metric)).toStrictEqual(result);
  });
});
