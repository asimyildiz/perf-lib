/* eslint-disable no-undef */
const mockSendBeacon = {
  sendBeacon: jest.fn(),
};

global.navigator.sendBeacon = mockSendBeacon;
