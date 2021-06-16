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
    const collector = {reportData: mockFn};
    Listener.onVisibilityChange(collector);
    expect(mockFn).toHaveBeenCalled();
  });

  it('It should not call onVisibilityChange when document visibility is shown', () => {
    mockVisibilityState('visible');
    const mockFn = jest.fn();
    const collector = {reportData: mockFn};
    Listener.onVisibilityChange(collector);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('It should call report when document visibility is hidden', () => {
    mockPerformanceObserver(['layout-shift']);
    const mockFn = jest.fn();
    const collector = {reportData: mockFn};
    Listener.listener(collector);
    mockVisibilityState('hidden');

    function callback() {
      expect(mockFn).toHaveBeenCalled();
    }
    doAsync(callback);
  });

  it('It should not call report when document visibility is shown', () => {
    mockPerformanceObserver(['layout-shift']);
    const mockFn = jest.fn();
    const collector = {reportData: mockFn};
    Listener.listener(collector);
    mockVisibilityState('visible');

    function callback() {
      expect(mockFn).not.toHaveBeenCalled();
    }
    doAsync(callback);
  });

  it('It should not call report when document visibility is shown', () => {
    mockPerformanceObserver([]);
    const mockFn = jest.fn();
    const collector = {reportData: mockFn};
    Listener.listener(collector);
    mockVisibilityState('visible');

    function callback() {
      expect(mockFn).not.toHaveBeenCalled();
    }
    doAsync(callback);
  });

  it('It should call report when pagehide event is fired', () => {
    mockPerformanceObserver([]);
    const mockFn = jest.fn();
    const collector = {reportData: mockFn};
    Listener.listener(collector);
    document.dispatchEvent(new Event('pagehide'));

    function callback() {
      expect(mockFn).toHaveBeenCalled();
    }
    doAsync(callback);
  });
});
