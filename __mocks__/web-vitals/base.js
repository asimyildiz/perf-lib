/* eslint-disable no-undef */
jest.mock('web-vitals/base', () => {
  return {
    getTTFB: jest.fn((onReport) => {
      onReport();
    }),
    getFCP: jest.fn((onReport) => {
      onReport();
    }),
    getLCP: jest.fn((onReport) => {
      onReport();
    }),
    getFID: jest.fn((onReport) => {
      onReport();
    }),
    getCLS: jest.fn((onReport) => {
      onReport();
    }),
  };
});
