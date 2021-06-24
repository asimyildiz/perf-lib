# CHANGELOG

## History

### v1.0.4 (CURRENT RELEASE)

* Update live url of the service
* `#19` : Update live url of the service

### v1.0.3 (PREVIOUS RELEASE)

* Update code based on failling real-life tests
* `#15` : Fix sending data using navigator.sendBeacon as bulk
* `#16` : Reset data array after navigator.sendBeacon call is successfull
* `#17` : Update tests, add new tests to keep coverage 100%
* `#18` : Update jsdocs

### v1.0.2 (PREVIOUS RELEASE)

* Update code based on requirements (service dependency)
* `#11` : Map metric data as service expected
* `#12` : Add session id into all metrics data
* `#13` : Update all tests for all updated code, revert back skipped tests
* `#14` : Connect library to service

### v1.0.1 (PREVIOUS RELEASE)

* Add missing requirements (validate)
* `#2` : Measure assets loading performances (img, js, css, fonts etc.)
* `#3` : Validate measured values against other Google Tools
* `#8` : Add session id and device info as first reported item
* `#9` : Report whole data instead of mapped values (dashboard will decide which data to use)
* `#10`: Update tests, cover all if-else statements

### v1.0.0 (PREVIOUS RELEASE)

* Initial version that has two different implementations
* `#0` : IdleReporter with SingleCollector
* `#1` : BeaconReporter with GroupCollector

## Feature

### v1.1.0 (30.06.2021) (NEXT RELEASE)

* Add new custom reporters
* `#4` : Add an Analytics Repoter

### v2.0.0 (01.07.2021) (NEXT MAJOR RELEASE)

* Create two different npm libraries for each strategy implemented
* `#5` : Create a common library for collecting data (make data collecting common)
* `#6` : Create a library for reporting data using different strategies
* `#7` : Integrate with [release-it](https://github.com/release-it/release-it) to publish packages