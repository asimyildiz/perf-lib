import { collector } from './src/collector';
import { listener } from './src/listener';
import { reporter } from './src/reporter';

// entry point for performance measurement script
// create a reporter and then collector to collect and report data

const [type, url] = ['idle', 'https://service.asimyildiz.live/report/'];
// const [type, url] = ['beacon', 'https://service.asimyildiz.live/reportMany/'];
const currentReporter = reporter(type, url);
const currentCollector = collector(type, currentReporter);

// only listens for page visibility state change, when using beacon
if (type === 'beacon') {
  listener(currentCollector);
}
currentCollector.collect();
