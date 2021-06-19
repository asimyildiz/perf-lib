import { JSDOM } from 'jsdom';
import mock from './performance';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.window.PerformanceObserver = mock.PerformanceObserver;
