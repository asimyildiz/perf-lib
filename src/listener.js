/**
 * reports data when visibility is changed to hidden
 * then removes event listener
 * @method
 * @param {Collector} collector - Collector object
 */
export const onVisibilityChange = (collector) => {
  if (document.visibilityState === 'hidden') {
    collector.reportData();
    removeEventListener('visibilitychange', onVisibilityChange, true);
  }
};

/**
 * creates a new listener for page visibility state change
 * after page visibility state changed to hidden, reports data
 * @method
 * @param {Collector} collector - Collector object
 */
export const listener = (collector) => {
  setTimeout(() => {
    // Safari does not fire "visibilitychange" on the tab close
    // So we have 2 options:
    // loose Safari data
    // or loose LCP/CLS that depends on "visibilitychange" logic

    // Current solution:
    // if LCP/CLS supported, use `onHidden` otherwise,
    // use `pagehide` to fire the callback in the end.
    // More details: https://github.com/treosh/web-vitals-reporter/issues/3
    const supportedEntryTypes = PerformanceObserver?.supportedEntryTypes || [];
    if (supportedEntryTypes.indexOf('layout-shift') !== -1) {
      addEventListener(
        'visibilitychange',
        onVisibilityChange.bind(null, collector),
        true,
      );
    } else {
      addEventListener('pagehide', collector.reportData, {
        capture: true,
        once: true,
      });
    }
  }, 0);
};
