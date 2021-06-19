import * as Listener from '../src/listener';

function doAsync(c) {
  setTimeout(() => {
    c();
  }, 10);
}

jest.useFakeTimers();

describe('listener function', () => {
  it('It should call onVisibilityChange when document visibility is hidden', () => {
    mockVisibilityState('hidden');
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.onVisibilityChange(collector);
    expect(mockFn).toHaveBeenCalled();
  });

  it('It should not call onVisibilityChange when document visibility is shown', () => {
    mockVisibilityState('visible');
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.onVisibilityChange(collector);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('It should call report when document visibility is hidden', () => {
    PerformanceObserver.supportedEntryTypes = ['layout-shift'];
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.listener(collector);
    jest.runAllTimers();
    mockVisibilityState('hidden');
    expect(mockFn).toHaveBeenCalled();
  });

  it('It should not call report when document visibility is shown', () => {
    PerformanceObserver.supportedEntryTypes = ['layout-shift'];
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.listener(collector);
    jest.runAllTimers();
    mockVisibilityState('visible');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('It should not call report when document visibility is shown', () => {
    PerformanceObserver.supportedEntryTypes = [];
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.listener(collector);
    jest.runAllTimers();
    mockVisibilityState('visible');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('It should call report when pagehide event is fired', () => {
    PerformanceObserver.supportedEntryTypes = [];
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.listener(collector);
    jest.runAllTimers();
    document.dispatchEvent(new Event('pagehide'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('It should not call report when PerformanceObserver is undefined', () => {
    delete PerformanceObserver.supportedEntryTypes;
    const mockFn = jest.fn();
    const collector = { reportData: mockFn };
    Listener.listener(collector);
    jest.runAllTimers();
    document.dispatchEvent(new Event('pagehide'));
    expect(mockFn).toHaveBeenCalled();
  });
});
