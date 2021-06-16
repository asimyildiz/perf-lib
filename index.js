import {collector} from './src/collector';
import {listener} from './src/listener';
import {reporter} from './src/reporter';

// entry point for performance measurement script
// create a reporter and then collector to collect and report data

// const [type, url] = ['beacon', 'https://test'];
const [type, url] = ['idle', 'https://test'];
const currentReporter = reporter(type, url);
const currentCollector = collector(type, currentReporter);

// only listens for page visibility state change, when using beacon
if (type === 'beacon') {
  listener(currentCollector);
}
currentCollector.collect();
