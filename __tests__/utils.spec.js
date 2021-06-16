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

  it('It should round numbers correctly with precision', () => {
    expect(Util.round(3.49, 0)).toBe(3);
    expect(Util.round(3.49, 1)).toBe(3.5);
    expect(Util.round(3.4913, 2)).toBe(3.49);
  });

  it('should calculate metrics correctly', () => {
    const metrics = [
      {
        name: 'TTFB',
        value: 1.2,
        result: {
          TTFB: 1,
        },
      },
      {
        name: 'FCP',
        value: 2.3,
        result: {
          FCP: 2,
        },
      },
      {
        name: 'LCP',
        value: 4.5,
        result: {
          LCP: 5,
        },
      },
      {
        name: 'FID',
        value: 6.7,
        result: {
          FID: 7,
        },
      },
      {
        name: 'CLS',
        value: 8.9,
        result: {
          CLS: 8.9,
        },
      },
      {
        name: 'NON',
        value: 9.2,
        result: {
          NON: 9.2,
        },
      },
    ];

    metrics.forEach((item) => {
      expect(Util.mapMetric(item)).toStrictEqual(item.result);
    });
  });
});
