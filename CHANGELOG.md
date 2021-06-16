# CHANGELOG

## History

### v1.0.0 (CURRENT RELEASE)

* Initial version that has two different implementations
* `#0` : IdleReporter with SingleCollector
* `#1` : BeaconReporter with GroupCollector

## Feature

### v1.0.1 (23.06.2021) (NEXT MINOR RELEASE)

* Add missing requirements (validate)
* `#2` : Measure assets loading performances (img, js, css, fonts etc.)
* `#3` : Validate measured values against other Google Tools

### v1.1.0 (30.06.2021) (NEXT RELEASE)

* Add new custom reporters
* `#4` : Add an Analytics Repoter

### v2.0.0 (01.07.2021) (NEXT MAJOR RELEASE)

* Create two different npm libraries for each strategy implemented
* `#5` : Create a common library for collecting data (make data collecting common)
* `#6` : Create a library for reporting data using different strategies
* `#7` : Integrate with [release-it](https://github.com/release-it/release-it) to publish packages