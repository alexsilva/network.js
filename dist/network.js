(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Network = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _utilsDecorators = require('../utils/decorators');

/**
 * A callback used as an event handler.
 * @public
 * @callback EventDispatcher~eventHandler
 * @param {...*} args The extra parameters provided to the `trigger` method.
 * @returns {?boolean} If `false` is explicitly returned, the `trigger` method will return `false`.
 */

/**
 * @class EventDispatcher
 */

var EventDispatcher = (function () {
    var _instanceInitializers = {};

    function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);

        _defineDecoratedPropertyDescriptor(this, '_eventCallbacks', _instanceInitializers);
    }

    _createDecoratedClass(EventDispatcher, [{
        key: 'on',

        /**
         * Attach a callback to one or more events.
         * @public
         * @method EventDispatcher#on
         * @param {string|string[]} events One or multiple event names.
         * @param {EventDispatcher~eventHandler} callback An event handler.
         * @returns {EventDispatcher}
         */
        value: function on(events, callback) {
            var _this = this;

            events = Array.isArray(events) ? events : [events];

            events.forEach(function (event) {
                var eventCallbacks = _this._eventCallbacks[event] = _this._eventCallbacks[event] || [];

                // If the callback isn't already registered, store it.
                if (! ~eventCallbacks.indexOf(callback)) {
                    eventCallbacks.push(callback);
                }
            });

            return this;
        }

        /**
         * Detach a callback from one or more events.
         * @public
         * @method EventDispatcher#off
         * @param {string|string[]} events One or multiple event names.
         * @param {EventDispatcher~eventHandler} [callback=null] An event handler.
         * @returns {EventDispatcher}
         */
    }, {
        key: 'off',
        value: function off(events) {
            var _this2 = this;

            var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            events = Array.isArray(events) ? events : [events];

            events.forEach(function (event) {
                var eventCallbacks = _this2._eventCallbacks[event];

                // If there is no specified callback, simply delete all the callbacks binded to the provided event.
                if (!callback && eventCallbacks) {
                    delete _this2._eventCallbacks[event];
                } else {
                    var callbackIndex = eventCallbacks ? eventCallbacks.indexOf(callback) : -1;

                    // If the callback is registered, remove it from the array.
                    if (callbackIndex != -1) {
                        eventCallbacks.splice(callbackIndex, 1);
                    }
                }
            });

            return this;
        }

        /**
         * Trigger an event.
         * @public
         * @method EventDispatcher#trigger
         * @param {string} event An event name.
         * @param {...*} extraParameters Some extra parameters to pass to the event handlers.
         * @returns {boolean} Returns `false` if one of the event handlers explicitly returned `false`.
         */
    }, {
        key: 'trigger',
        value: function trigger(event) {
            for (var _len = arguments.length, extraParameters = Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
                extraParameters[_key2 - 1] = arguments[_key2];
            }

            var eventCallbacks = this._eventCallbacks[event] || [];

            // A callback can return a boolean value which will be logically compared to the other callbacks values before
            // being returned by the trigger() method. This allows a callback to send a "signal" to the caller, like
            // cancelling an action.
            var returnValue = true;

            eventCallbacks.forEach(function (eventCallback) {
                // A callback must explicitly return false if it wants the trigger() method to return false, undefined will
                // not work. This avoids crappy callbacks to mess up with the triggering system.
                var value = eventCallback.apply(undefined, extraParameters);
                value = value !== false ? true : false;

                returnValue = returnValue && value; // Compare the result of the callback to the actual return value
            });

            return returnValue;
        }
    }, {
        key: '_eventCallbacks',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },
        enumerable: true
    }], null, _instanceInitializers);

    return EventDispatcher;
})();

exports['default'] = EventDispatcher;
module.exports = exports['default'];

/**
 * All the registered event callbacks, organized by events.
 * @private
 * @member {Object} EventDispatcher#_eventCallbacks
 */

},{"../utils/decorators":44}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _HttpModule2 = require('./HttpModule');

var _HttpModule3 = _interopRequireDefault(_HttpModule2);

var _Timing = require('../Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} BandwidthModule~settingsObject
 * @extends HttpModule~settingsObject
 * @property {Object} data
 * @property {number} data.size The amount of data to initially use.
 * @property {number} [data.multiplier=2] If the measure period can't reach the delay defined in the settings, the data amount is multiplied by the following value.
 */

/**
 * Apply a new set of custom settings.
 * @public
 * @method BandwidthModule#settings
 * @param {BandwidthModule~settingsObject} settings A set of custom settings.
 * @returns {BandwidthModule}
 */
/**
 * Return the current set of settings.
 * @public
 * @method BandwidthModule#settings^2
 * @returns {BandwidthModule~settingsObject}
 */

/**
 * @class BandwidthModule
 * @extends HttpModule
 * @param {string} loadingType The loading type, `upload` or `download`.
 * @param {BandwidthModule~settingsObject} [settings={}] A set of custom settings.
 */

var BandwidthModule = (function (_HttpModule) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(BandwidthModule, _HttpModule);

    _createDecoratedClass(BandwidthModule, [{
        key: '_loadingType',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         *
         * @private
         * @member {boolean} BandwidthModule#_intendedEnd
         */
        enumerable: true
    }, {
        key: '_intendedEnd',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         *
         * @private
         * @member {boolean} BandwidthModule#_isRestarting
         */
        enumerable: true
    }, {
        key: '_isRestarting',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Tracks the value of the `loaded` property for each progress event.
         * @private
         * @member {?number} BandwidthModule#_lastLoadedValue
         */
        enumerable: true
    }, {
        key: '_lastLoadedValue',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The recorded measures of speed.
         * @private
         * @member {number[]} BandwidthModule#_speedRecords
         */
        enumerable: true
    }, {
        key: '_speedRecords',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return [];
        },

        /**
         * The average speed.
         * @private
         * @member {number} BandwidthModule#_avgSpeed
         */
        enumerable: true
    }, {
        key: '_avgSpeed',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The ID of the current request.
         * @private
         * @member {number} BandwidthModule#_requestID
         */
        enumerable: true
    }, {
        key: '_requestID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * The ID of the current progress event.
         * @private
         * @member {number} BandwidthModule#_progressID
         */
        enumerable: true
    }, {
        key: '_progressID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * Defines if measures have started.
         * @private
         * @member {boolean} BandwidthModule#_started
         */
        enumerable: true
    }, {
        key: '_started',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Defines if the current progress event is the first one triggered for the current request.
         * @private
         * @member {boolean} BandwidthModule#_firstProgress
         */
        enumerable: true
    }, {
        key: '_firstProgress',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return true;
        },

        /**
         * @private
         * @member {Defer} BandwidthModule#_deferredProgress
         */
        enumerable: true
    }, {
        key: '_deferredProgress',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * Unique labels for each request, exclusively used to make measures.
         * @private
         * @member {Object} BandwidthModule#_timingLabels
         * @property {?string} start
         * @property {?string} progress
         * @property {?string} end
         * @property {?string} measure
         */
        enumerable: true
    }, {
        key: '_timingLabels',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {
                start: null,
                progress: null,
                end: null,
                measure: null
            };
        },
        enumerable: true
    }], null, _instanceInitializers);

    function BandwidthModule(loadingType) {
        var _this = this;

        var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, BandwidthModule);

        loadingType = ~['upload', 'download'].indexOf(loadingType) ? loadingType : 'download';

        _get(Object.getPrototypeOf(BandwidthModule.prototype), 'constructor', this).call(this, loadingType);

        _defineDecoratedPropertyDescriptor(this, '_loadingType', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_intendedEnd', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_isRestarting', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_lastLoadedValue', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_speedRecords', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_avgSpeed', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_progressID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_started', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_firstProgress', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_deferredProgress', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_timingLabels', _instanceInitializers);

        this._extendDefaultSettings({
            data: {
                // 2 MB for upload, 10 MB for download
                size: loadingType == 'upload' ? 2 * 1024 * 1024 : 10 * 1024 * 1024,
                multiplier: 2
            }
        }).settings(settings);

        this._loadingType = loadingType;

        // Bind to XHR events
        this.on('xhr-upload-loadstart', function () {
            return _Timing2['default'].mark(_this._timingLabels.start);
        });
        this.on('xhr-readystatechange', function (xhr) {
            if (!_this._started && xhr.readyState == XMLHttpRequest.LOADING) {
                _Timing2['default'].mark(_this._timingLabels.start);
                _this._started = true;
            }
        });

        var eventsPrefix = loadingType == 'upload' ? 'xhr-upload' : 'xhr';

        this.on(eventsPrefix + '-progress', function (xhr, event) {
            return _this._progress(event);
        });
        this.on(eventsPrefix + '-timeout', function () {
            return _this._timeout();
        });
        this.on(eventsPrefix + '-loadend', function () {
            return _this._end();
        });
    }

    /**
     * Start requesting the server to make measures.
     * @public
     * @method BandwidthModule#start
     * @returns {BandwidthModule}
     */

    _createDecoratedClass(BandwidthModule, [{
        key: 'start',
        value: function start() {
            var loadingType = this._loadingType,
                dataSettings = this.settings().data,
                reqID = this._requestID++;

            this._intendedEnd = false;
            this._lastLoadedValue = null;
            this._speedRecords = [];
            this._started = false;
            this._firstProgress = true;
            this._deferredProgress = (0, _utilsHelpers.defer)();

            // Trigger the start event
            if (!this._isRestarting) {
                this.trigger('start', dataSettings.size);
            }

            // Create unique timing labels for the new request
            var labels = this._timingLabels;
            labels.start = loadingType + '-' + reqID + '-start';
            labels.progress = loadingType + '-' + reqID + '-progress';
            labels.end = loadingType + '-' + reqID + '-end';
            labels.measure = loadingType + '-' + reqID + '-measure';

            // Generate some random data to upload to the server. Here we're using a Blob instead of an ArrayBuffer because
            // of a bug in Chrome (tested in v33.0.1750.146), causing a freeze of the page while trying to directly upload
            // an ArrayBuffer (through an ArrayBufferView). The freeze lasts nearly 4.5s for 10MB of data. Using a Blob
            // seems to solve the problem.
            var blob = undefined;
            if (loadingType === 'upload') {
                blob = new Blob([new ArrayBuffer(dataSettings.size)]);
                var form = new FormData();
                form.append("upload-file.raw", blob);
                blob = form;
            } else {
                blob = null;
            }

            var type = loadingType === 'download' ? 'GET' : 'POST';

            // Initiate and send a new request
            this._newRequest(type, {
                size: dataSettings.size
            })._sendRequest(blob);

            return this;
        }

        /**
         * Abort the measures.
         * @public
         * @method BandwidthModule#abort
         * @returns {BandwidthModule}
         */
    }, {
        key: 'abort',
        value: function abort() {
            this._intendedEnd = true;
            return this._abort();
        }

        /**
         * Make bandwidth measures for the current request.
         * @private
         * @method BandwidthModule#_progress
         * @param {ProgressEvent} event The event associated with the progress event of the current request.
         * @returns {BandwidthModule}
         */
    }, {
        key: '_progress',
        value: function _progress(event) {
            var _this2 = this;

            // Ignore the first progress event, it generally contributes to get incoherent values.
            if (this._firstProgress) return this._firstProgress = false;

            // Execute the previous progress trigger
            this._deferredProgress.run();

            var labels = this._timingLabels,
                progressID = this._progressID++,
                markLabel = labels.progress + '-' + progressID,
                loaded = event.loaded;

            _Timing2['default'].mark(markLabel);

            // Measure the average speed (B/s) since the request started
            var avgMeasure = _Timing2['default'].measure(labels.measure + '-avg-' + progressID, labels.start, markLabel),
                avgSpeed = loaded / avgMeasure * 1000;

            var instantSpeed;

            if (this._lastLoadedValue === null) {
                // We are executing the first progress event of the current request
                instantSpeed = avgSpeed; // The instant speed of the first progress event is equal to the average one
            } else {
                    // Measure the instant speed (B/s), which defines the speed between two progress events.
                    var instantMeasure = _Timing2['default'].measure(labels.measure + '-instant-' + progressID,
                    // Set the mark of the previous progress event as the starting point
                    labels.progress + '-' + (progressID - 1), markLabel);
                    instantSpeed = (loaded - this._lastLoadedValue) / instantMeasure * 1000;
                }

            // Save the `loaded` property of the event for the next progress event
            this._lastLoadedValue = loaded;

            // Defer measures saving and event triggering, this allows to cancel the last progress event, which can generate
            // incoherent values.
            this._deferredProgress = (0, _utilsHelpers.defer)(function () {
                _this2._avgSpeed = avgSpeed;
                _this2._speedRecords.push(instantSpeed);

                _this2.trigger('progress', avgSpeed, instantSpeed);
            });

            return this;
        }

        /**
         * Mark the current request as entirely finished (this means it ended after a time out).
         * @private
         * @method BandwidthModule#_timeout
         * @returns {BandwidthModule}
         */
    }, {
        key: '_timeout',
        value: function _timeout() {
            this._intendedEnd = true;
            return this;
        }

        /**
         * End the measures.
         * @private
         * @method BandwidthModule#_end
         * @returns {BandwidthModule}
         */
    }, {
        key: '_end',
        value: function _end() {
            // A timeout or an abort occured, bypass the further requests and trigger the "end" event.
            if (this._intendedEnd) {
                this._isRestarting = false;
                this.trigger('end', this._avgSpeed, this._speedRecords);
            }

            // The request ended to early, restart it with an increased data size.
            else {
                    var dataSettings = this.settings().data,
                        size = dataSettings.size * dataSettings.multiplier;

                    this.settings({ data: { size: size } });
                    this.trigger('restart', size);

                    // End can be called in the restart event
                    if (!this._intendedEnd) {
                        this._isRestarting = true;
                        this.start();
                    } else {
                        this._isRestarting = false;
                        this.trigger('end', this._avgSpeed, this._speedRecords);
                    }
                }

            return this;
        }
    }], null, _instanceInitializers);

    return BandwidthModule;
})(_HttpModule3['default']);

exports['default'] = BandwidthModule;
module.exports = exports['default'];

/**
 *
 * @private
 * @member {string} BandwidthModule#_loadingType
 */

},{"../../utils/decorators":44,"../../utils/helpers":45,"../Timing":6,"./HttpModule":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _EventDispatcher2 = require('../EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _lodashMerge = require('lodash.merge');

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} HttpModule~settingsObject
 * @property {string} [endpoint=./network.php] Where is located your `network.php` file.
 * @property {number} [delay=8000] The delay while you want to take measures.
 */

/**
 * @class HttpModule
 * @extends EventDispatcher
 * @param {string} moduleName The name of the instanciated module.
 * @param {HttpModule~settingsObject} [settings={}] A set of custom settings.
 */

var HttpModule = (function (_EventDispatcher) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(HttpModule, _EventDispatcher);

    _createDecoratedClass(HttpModule, [{
        key: '_defaultSettings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The current settings.
         * @private
         * @member {?Object} HttpModule#_settings
         */
        enumerable: true
    }, {
        key: '_settings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * The module name, will be send to the server.
         * @private
         * @member {string} HttpModule#_moduleName
         */
        enumerable: true
    }, {
        key: '_moduleName',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The current XMLHttpRequest object.
         * @private
         * @member {?XMLHttpRequest} HttpModule#_xhr
         */
        enumerable: true
    }, {
        key: '_xhr',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * An URL token to avoid any caching issues. Also allows to identify the request in the Resource Timing entries.
         * @private
         * @member {?string} HttpModule#_lastURLToken
         */
        enumerable: true
    }, {
        key: '_lastURLToken',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return null;
        },

        /**
         * Defines if the module is currently running an HTTP request.
         * @private
         * @member {boolean} HttpModule#_requesting
         */
        enumerable: true
    }, {
        key: '_requesting',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * Defines if the requesting status has been overridden by the `_setRequesting` method.
         * @private
         * @member {boolean} HttpModule#_requestingOverridden
         */
        enumerable: true
    }, {
        key: '_requestingOverridden',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },
        enumerable: true
    }], null, _instanceInitializers);

    function HttpModule(moduleName) {
        var _this = this;

        var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, HttpModule);

        _get(Object.getPrototypeOf(HttpModule.prototype), 'constructor', this).call(this);

        _defineDecoratedPropertyDescriptor(this, '_defaultSettings', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_settings', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_moduleName', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_xhr', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_lastURLToken', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requesting', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestingOverridden', _instanceInitializers);

        this._extendDefaultSettings({
            endpoint: './network.php',
            delay: 8000
        });

        this.settings(settings);

        this._moduleName = moduleName;

        // Each time a request starts or ends, set the requesting value unless it has been overridden with the
        // _setRequesting() method.
        this.on(['xhr-loadstart', 'xhr-upload-loadstart'], function () {
            if (!_this._requestingOverridden) {
                _this._requesting = true;
            }
        });

        this.on(['xhr-loadend', 'xhr-upload-loadend'], function () {
            if (!_this._requestingOverridden) {
                _this._requesting = false;
            }
        });
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method HttpModule#settings
     * @param {HttpModule~settingsObject} settings A set of custom settings.
     * @returns {HttpModule}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method HttpModule#settings^2
     * @returns {HttpModule~settingsObject}
     */

    _createDecoratedClass(HttpModule, [{
        key: 'settings',
        value: function settings() {
            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var finalSettings = (0, _lodashMerge2['default'])({}, this._defaultSettings, this._settings, _settings);

            if ((0, _lodashIsplainobject2['default'])(_settings)) {
                this._settings = finalSettings;
                return this;
            } else {
                return finalSettings;
            }
        }

        /**
         * Return if the module is currently making a request.
         * @public
         * @method HttpModule#isRequesting
         * @returns {boolean} `true` if the module is requesting, otherwise `false`.
         */
    }, {
        key: 'isRequesting',
        value: function isRequesting() {
            return this._requesting;
        }

        /**
         * Extend the set of default settings.
         * @protected
         * @method HttpModule#_extendDefaultSettings
         * @param {Object} settings The new properties to add to the default settings.
         * @returns {HttpModule}
         */
    }, {
        key: '_extendDefaultSettings',
        value: function _extendDefaultSettings(settings) {
            this._defaultSettings = (0, _lodashMerge2['default'])({}, this._defaultSettings, settings);
            return this;
        }

        /**
         * Create a new XHR request.
         * @protected
         * @method HttpModule#_newRequest
         * @param {string} httpMethod The HTTP method to use with the request, GET or POST.
         * @param {Object} queryParams The query parameters to use with the request.
         * @returns {HttpModule}
         */
    }, {
        key: '_newRequest',
        value: function _newRequest(httpMethod, queryParams) {
            var _this2 = this;

            // Check if a callback binded to the "_newRequest" event returns false, if it's the case, cancel the request
            // creation. If the requesting status has been overridden, there's no need to cancel the request since the user
            // should know what he's doing.
            if (!this.trigger('_newRequest') && !this._requestingOverridden) {
                console.warn('To ensure accurate measures, you can only make one request at a time.');
                return this;
            }

            var settings = this.settings(),
                xhr = new XMLHttpRequest(),
                validHttpMethods = ['GET', 'POST'];

            // Prepare the new request.
            if (! ~validHttpMethods.indexOf(httpMethod)) {
                console.warn('The HTTP method must be GET or POST.');
                return this;
            }

            queryParams = queryParams || {};

            var tokenSuffix = new Date().getTime();
            this._lastURLToken = 'network-' + tokenSuffix;

            // Append the query parameters
            var url = settings.endpoint;
            url += ~url.indexOf('?') ? '&' : '?';
            url += 'module=' + this._moduleName;

            Object.keys(queryParams).forEach(function (param) {
                var value = encodeURIComponent(queryParams[param]);
                url += '&' + param + '=' + value;
            });

            url += '&' + this._lastURLToken;

            xhr.open(httpMethod, url);

            // Abort the previous request if it hasn't been sent
            if (this._xhr && this._xhr.readyState == XMLHttpRequest.OPENED) {
                this._xhr.abort();
            }

            // Replace the old request by the new one
            this._xhr = xhr;

            // Bind all the XHR events
            var events = ['loadstart', 'progress', 'abort', 'error', 'load', 'timeout', 'loadend', 'readystatechange'];

            events.forEach(function (eventType) {
                xhr.addEventListener(eventType, function () {
                    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    // A last progress event can be triggered once a request has timed out, ignore it.
                    if (eventType == 'progress' && !_this2._requesting) return;

                    _this2.trigger.apply(_this2, ['xhr-' + eventType, xhr].concat(args));
                });

                // The XMLHttpRequestUpload interface supports all the above event types except the "readystatechange" one
                if (eventType != 'readystatechange') {
                    xhr.upload.addEventListener(eventType, function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        _this2.trigger.apply(_this2, ['xhr-upload-' + eventType, xhr].concat(args));
                    });
                }
            });

            // Define the timeout of the request. We don't use the native `timeout` property since it can distort the
            // measures.
            // See: https://github.com/nesk/network.js/issues/26
            var startTimeout = function startTimeout(xhr) {
                setTimeout(function () {
                    if (xhr.readyState != XMLHttpRequest.UNSENT && xhr.readyState != XMLHttpRequest.DONE) {
                        _this2.trigger('xhr-timeout');
                        _this2.trigger('xhr-upload-timeout');
                        xhr.abort();
                    }
                }, settings.delay);
            };

            this.on('xhr-upload-loadstart', startTimeout).on('xhr-readystatechange', (function (timeoutStarted) {
                return function (xhr) {
                    if (!timeoutStarted && xhr.readyState == XMLHttpRequest.LOADING) {
                        timeoutStarted = true;
                        startTimeout(xhr);
                    }
                };
            })(false));

            return this;
        }

        /**
         * Send a newly created XHR request.
         * @protected
         * @method HttpModule#_sendRequest
         * @param {?*} [data=null] The data to send with the request.
         * @returns {HttpModule}
         */
    }, {
        key: '_sendRequest',
        value: function _sendRequest() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (this._xhr && this._xhr.readyState == XMLHttpRequest.OPENED) {
                this._xhr.send(data);
            } else {
                console.warn('A request must have been created before sending any data.');
            }

            return this;
        }

        /**
         * Abort the current request.
         * @protected
         * @method HttpModule#_abort
         * @returns {HttpModule}
         */
    }, {
        key: '_abort',
        value: function _abort() {
            if (this._xhr) {
                this._xhr.abort();
            }

            return this;
        }

        /**
         * Get the Resource Timing entry associated to the current request.
         * @protected
         * @method HttpModule#_getTimingEntry
         * @param {HttpModule~timingCallback} callback A callback used to send back the timing entry.
         * @returns {HttpModule}
         */
    }, {
        key: '_getTimingEntry',
        value: function _getTimingEntry(callback) {
            // The Resource Timing entries aren't immediately available once the 'load' event is triggered by an
            // XMLHttpRequest, we must wait for another process tick to check for a refreshed list.
            setTimeout((function (lastURLToken) {
                return function () {
                    // Filter the timing entries to return only the one concerned by the last request made
                    var entries = performance.getEntriesByType('resource').filter(function (entry) {
                        return ~entry.name.indexOf(lastURLToken);
                    });

                    /**
                     * A callback used to send back the timing entry.
                     * @private
                     * @callback HttpModule~timingCallback
                     * @param {PerformanceResourceTiming} entry The Resource Timing entry associated to the current request.
                     */
                    callback(entries.length ? entries[0] : null);
                };
            })(this._lastURLToken), 0);

            return this;
        }

        /**
         * Override the requesting status of the module.
         * @protected
         * @method HttpModule#_setRequesting
         * @param {boolean} isRequesting The requesting status.
         * @returns {HttpModule}
         */
    }, {
        key: '_setRequesting',
        value: function _setRequesting(isRequesting) {
            this._requestingOverridden = true;
            this._requesting = isRequesting;
            return this;
        }
    }], null, _instanceInitializers);

    return HttpModule;
})(_EventDispatcher3['default']);

exports['default'] = HttpModule;
module.exports = exports['default'];

/**
 * The default settings.
 * @private
 * @member {?Object} HttpModule#_defaultSettings
 */

},{"../../utils/decorators":44,"../../utils/helpers":45,"../EventDispatcher":1,"lodash.isplainobject":37,"lodash.merge":41}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _HttpModule2 = require('./HttpModule');

var _HttpModule3 = _interopRequireDefault(_HttpModule2);

var _Timing = require('../Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _lodashIsboolean = require('lodash.isboolean');

var _lodashIsboolean2 = _interopRequireDefault(_lodashIsboolean);

var _lodashMerge = require('lodash.merge');

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var _utilsHelpers = require('../../utils/helpers');

var _utilsDecorators = require('../../utils/decorators');

/**
 * @public
 * @typedef {Object} LatencyModule~settingsObject
 * @property {string} [endpoint=./network.php] Where is located your `network.php` file.
 * @property {number} [measures=5] How many measures should be returned.
 * @property {number} [attempts=3] How much attempts to get a valid value should be done for each measure.
 */

/**
 * @class LatencyModule
 * @extends HttpModule
 * @param {LatencyModule~settingsObject} [settings={}] A set of custom settings.
 */

var LatencyModule = (function (_HttpModule) {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _inherits(LatencyModule, _HttpModule);

    _createDecoratedClass(LatencyModule, [{
        key: '_supportsResourceTiming',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The total number of requests left.
         * @private
         * @member {number} LatencyModule#_requestsLeft
         */
        enumerable: true
    }, {
        key: '_requestsLeft',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The total number of attempts left.
         * @private
         * @member {number} LatencyModule#_attemptsLeft
         */
        enumerable: true
    }, {
        key: '_attemptsLeft',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The measured latencies.
         * @private
         * @member {number[]} LatencyModule#_latencies
         */
        enumerable: true
    }, {
        key: '_latencies',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return undefined;
        },

        /**
         * The ID of the current request.
         * @private
         * @member {number} LatencyModule#_requestID
         */
        enumerable: true
    }, {
        key: '_requestID',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return 0;
        },

        /**
         * Unique labels for each request, exclusively used to make measures.
         * @private
         * @member {Object} LatencyModule#_requestID
         * @property {?string} start
         * @property {?string} end
         * @property {?string} measure
         */
        enumerable: true
    }, {
        key: '_timingLabels',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {
                start: null,
                end: null,
                measure: null
            };
        },
        enumerable: true
    }], null, _instanceInitializers);

    function LatencyModule() {
        var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, LatencyModule);

        _get(Object.getPrototypeOf(LatencyModule.prototype), 'constructor', this).call(this, 'latency');

        _defineDecoratedPropertyDescriptor(this, '_supportsResourceTiming', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestsLeft', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_attemptsLeft', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_latencies', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_requestID', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_timingLabels', _instanceInitializers);

        this._extendDefaultSettings({
            measures: 5,
            attempts: 3
        }).settings(settings);

        this._defineResourceTimingSupport();
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method LatencyModule#settings
     * @param {LatencyModule~settingsObject} settings A set of custom settings.
     * @returns {LatencyModule}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method LatencyModule#settings^2
     * @returns {LatencyModule~settingsObject}
     */

    _createDecoratedClass(LatencyModule, [{
        key: 'settings',
        value: function settings() {
            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if ((0, _lodashIsplainobject2['default'])(_settings)) {
                return _get(Object.getPrototypeOf(LatencyModule.prototype), 'settings', this).call(this, (0, _lodashMerge2['default'])({}, _settings, {
                    delay: 0 // We dont want any timeout during a latency calculation
                }));
            } else {
                    return (0, _utilsHelpers.except)(_get(Object.getPrototypeOf(LatencyModule.prototype), 'settings', this).call(this), ['delay']);
                }
        }

        /**
         * Start requesting the server to make measures.
         * @public
         * @method LatencyModule#start
         * @returns {LatencyModule}
         */
    }, {
        key: 'start',
        value: function start() {
            var _settings2 = this.settings();

            var measures = _settings2.measures;
            var attempts = _settings2.attempts;

            // Set the number of requests required to establish the network latency.
            this._requestsLeft = measures;
            this._attemptsLeft = attempts * measures;

            // If the browser doesn't support the Resource Timing API, add a request that will be ignored to avoid a longer
            // request due to a possible DNS/whatever fetch.
            if (!this._supportsResourceTiming) {
                this._requestsLeft++;
                this._attemptsLeft++;
            }

            // Override the requesting value since a complete latency request consists off multiple ones
            this._setRequesting(true);

            this._latencies = [];
            this._nextRequest();

            return this;
        }

        /**
         * Define if the module should support the Resource Timing API.
         * @private
         * @method LatencyModule#_defineResourceTimingSupport
         * @param {boolean} supportsResourceTiming If `undefined`, the support will be determined by feature detection.
         * @returns {LatencyModule}
         */
    }, {
        key: '_defineResourceTimingSupport',
        value: function _defineResourceTimingSupport(supportsResourceTiming) {
            var _this = this;

            if (!(0, _lodashIsboolean2['default'])(supportsResourceTiming)) supportsResourceTiming = _Timing2['default'].supportsResourceTiming;
            this._supportsResourceTiming = supportsResourceTiming;

            // Unregisters all the previously registered events, since this method can be called multiple times.
            this.off(['xhr-load', 'xhr-loadstart', 'xhr-readystatechange']);

            // Measure the latency with the Resource Timing API once the request is finished
            if (supportsResourceTiming) {
                this.on('xhr-load', function () {
                    return _this._measure();
                });
            }

            // If the browser doesn't support the Resource Timing API, we fallback on a Datetime solution.
            else {
                    // Set a mark when the request starts
                    this.on('xhr-loadstart', function () {
                        return _Timing2['default'].mark(_this._timingLabels.start);
                    });

                    // Then make a measure with the previous mark
                    this.on('xhr-readystatechange', function (xhr) {
                        return _this._measure(xhr);
                    });
                }
        }

        /**
         * Initiate the next request used for latency measures.
         * @private
         * @method LatencyModule#_nextRequest
         * @param {boolean} [retry=false] Defines if the next request is a retry due to a failing request or not.
         * @returns {LatencyModule}
         */
    }, {
        key: '_nextRequest',
        value: function _nextRequest() {
            var _this2 = this;

            var retry = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var reqID = this._requestID++;
            var requestsLeft = retry ? this._requestsLeft : this._requestsLeft--;

            if (this._attemptsLeft-- && (requestsLeft || retry)) {
                // Create unique timing labels for the new request
                var labels = this._timingLabels;
                labels.start = 'latency-' + reqID + '-start';
                labels.end = 'latency-' + reqID + '-end';
                labels.measure = 'latency-' + reqID + '-measure';

                // Create the new request and send it
                this._newRequest('GET')._sendRequest();
            } else {
                // All the requests are finished, set the requesting status to false.
                this._setRequesting(false);

                // If all the requests have been executed, calculate the average latency. Since the _getTimingEntry() method
                // is asynchronous, wait for the next process tick to execute the _end() method, to be sure that all the
                // latencies have been retrieved.
                setTimeout(function () {
                    return _this2._end();
                }, 0);
            }

            return this;
        }

        /**
         * Make latency measures for the last request.
         * @private
         * @method LatencyModule#_measure
         * @param {?XMLHttpRequest} [xhr=null] The concerned XMLHttpRequest if the browser doesn't support the Resource Timing API.
         * @returns {LatencyModule}
         */
    }, {
        key: '_measure',
        value: function _measure() {
            var _this3 = this;

            var xhr = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            // With Resource Timing API
            if (!xhr) {
                this._getTimingEntry(function (entry) {
                    // The latency calculation differs between an HTTP and an HTTPS connection
                    // See: http://www.w3.org/TR/resource-timing/#processing-model
                    var latency = !entry.secureConnectionStart ? entry.connectEnd - entry.connectStart : entry.secureConnectionStart - entry.connectStart;

                    if (latency) _this3._latencies.push(latency);
                    _this3._nextRequest(!latency);
                });
            }

            // Without Resource Timing API
            else if (this._requestsLeft < this.settings().measures) {

                    // Measure and save the latency if the headers have been received
                    if (xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
                        var labels = this._timingLabels;

                        _Timing2['default'].mark(labels.end);
                        var latency = _Timing2['default'].measure(labels.measure, labels.start, labels.end);

                        if (latency) this._latencies.push(latency);

                        // Abort the current request before we run a new one
                        this._abort();
                        this._nextRequest(!latency);
                    }
                }

                // Ignore the first request when using the XHR states. See the comments in the start() method for explanations.
                else {
                        this._nextRequest();
                    }

            return this;
        }

        /**
         * End the measures.
         * @private
         * @method LatencyModule#_end
         * @returns {LatencyModule}
         */
    }, {
        key: '_end',
        value: function _end() {
            var latencies = this._latencies;

            // Get the average latency
            var avgLatency = latencies.reduce(function (a, b) {
                return a + b;
            }, 0) / (latencies.length || 1);
            avgLatency = avgLatency || null;

            // If there is no measures, restart with the polyfill.
            if (!latencies.length) {
                this._defineResourceTimingSupport(false);
                this.start();
                return this;
            }

            // If there is not enough measures, display a warning.
            if (latencies.length < this.settings().measures) {
                var _settings3 = this.settings();

                var measures = _settings3.measures;
                var attempts = _settings3.attempts;

                console.warn('\n                An insufficient number of measures have been processed, this could be due to your web server using\n                persistant connections or to your client settings (measures: ' + measures + ', attempts: ' + attempts + ').\n            ');
            }

            // Trigger the "end" event with the average latency and the latency list as parameters
            this.trigger('end', avgLatency, latencies);

            return this;
        }
    }], null, _instanceInitializers);

    return LatencyModule;
})(_HttpModule3['default']);

exports['default'] = LatencyModule;
module.exports = exports['default'];

/**
 * Defines if the module supports the Resource Timing API.
 * @private
 * @member {number} LatencyModule#_requestsLeft
 */

},{"../../utils/decorators":44,"../../utils/helpers":45,"../Timing":6,"./HttpModule":3,"lodash.isboolean":35,"lodash.isplainobject":37,"lodash.merge":41}],5:[function(require,module,exports){
// ES6 polyfills
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _EventDispatcher = require('./EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _HttpHttpModule = require('./Http/HttpModule');

var _HttpHttpModule2 = _interopRequireDefault(_HttpHttpModule);

var _HttpLatencyModule = require('./Http/LatencyModule');

var _HttpLatencyModule2 = _interopRequireDefault(_HttpLatencyModule);

var _HttpBandwidthModule = require('./Http/BandwidthModule');

var _HttpBandwidthModule2 = _interopRequireDefault(_HttpBandwidthModule);

var _Timing = require('./Timing');

var _Timing2 = _interopRequireDefault(_Timing);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _lodashMerge = require('lodash.merge');

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var _utilsHelpers = require('../utils/helpers');

var _utilsDecorators = require('../utils/decorators');

/**
 * @public
 * @typedef {Object} Network~settingsObject
 * @property {LatencyModule~settingsObject} latency
 * @property {BandwidthModule~settingsObject} upload
 * @property {BandwidthModule~settingsObject} download
 * @example
 * {
 *     // Top-level properties are applied to all the modules
 *     endpoint: './my-new-endpoint/',
 *
 *     // Top-level properties will be overridden by the ones specified in each module
 *     latency: {
 *         endpoint: './my-new-latency-endpoint/'
 *     }
 * }
 */

/**
 * @class Network
 * @param {Network~settingsObject} [settings={}] A set of custom settings.
 * @member {LatencyModule} latency The latency module.
 * @member {BandwidthModule} upload The upload module.
 * @member {BandwidthModule} download The download module.
 */
require('core-js/modules/es6.object.assign.js');

var Network = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Network, [{
        key: '_modules',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * Defines if the registered modules have been initialized.
         * @private
         * @member {boolean} Network#_modulesInitialized
         */
        enumerable: true
    }, {
        key: '_modulesInitialized',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return false;
        },

        /**
         * The settings defined via the constructor, they will be applied once the modules are initialized.
         * @private
         * @member {Network~settingsObject} Network#_pendingSettings
         */
        enumerable: true
    }, {
        key: '_pendingSettings',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * Expose all the internal classes to the global scope. Only for testing purposes!
         * @private
         * @method Network._exposeInternalClasses
         * @returns {Network}
         */
        enumerable: true
    }], [{
        key: '_exposeInternalClasses',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        value: function _exposeInternalClasses() {
            var global = (0, _utilsHelpers.getGlobalObject)(),
                classes = { EventDispatcher: _EventDispatcher2['default'], HttpModule: _HttpHttpModule2['default'], LatencyModule: _HttpLatencyModule2['default'], BandwidthModule: _HttpBandwidthModule2['default'], Timing: _Timing2['default'] };

            Object.keys(classes).forEach(function (name) {
                global[name] = classes[name];
            });

            return this;
        }
    }, {
        key: 'supportsResourceTiming',

        /**
         * Defines if the current browser supports the Resource Timing API.
         * @public
         * @readonly
         * @member {boolean} Network#supportsResourceTiming
         */
        get: function get() {
            return _Timing2['default'].supportsResourceTiming;
        }

        /**
         * The registered modules.
         * @private
         * @member {Object} Network#_modules
         */
    }], _instanceInitializers);

    function Network() {
        var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Network);

        _defineDecoratedPropertyDescriptor(this, '_modules', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_modulesInitialized', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_pendingSettings', _instanceInitializers);

        this._registerModule('latency', function (settings) {
            return new _HttpLatencyModule2['default'](settings);
        })._registerModule('upload', function (settings) {
            return new _HttpBandwidthModule2['default']('upload', settings);
        })._registerModule('download', function (settings) {
            return new _HttpBandwidthModule2['default']('download', settings);
        });

        this._initModules(this.settings(settings));
    }

    /**
     * Apply a new set of custom settings.
     * @public
     * @method Network#settings
     * @param {Network~settingsObject} settings A set of custom settings.
     * @returns {Network}
     */
    /**
     * Return the current set of settings.
     * @public
     * @method Network#settings^2
     * @returns {Network~settingsObject}
     */

    _createDecoratedClass(Network, [{
        key: 'settings',
        value: function settings() {
            var _this = this;

            var _settings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var moduleNames = Object.keys(this._modules);

            if ((0, _lodashIsplainobject2['default'])(_settings)) {
                var _ret = (function () {
                    // Extract the global settings
                    var globalSettings = (0, _utilsHelpers.except)(_settings, moduleNames);

                    // Extract the local settings
                    var localSettings = (0, _utilsHelpers.except)(_settings, Object.keys(globalSettings));

                    // Create new settings with the global ones nested in the local ones
                    _settings = moduleNames.reduce(function (settings, moduleName) {
                        return (0, _lodashMerge2['default'])({}, settings, _defineProperty({}, moduleName, globalSettings));
                    }, {});

                    // Apply the local settings to the new settings
                    _settings = (0, _lodashMerge2['default'])({}, _settings, localSettings);

                    // Apply the settings to the modules
                    if (_this._modulesInitialized) {
                        Object.keys(_this._modules).forEach(function (name) {
                            _this._modules[name].settings(_settings[name]);
                        });
                    }

                    // If the modules aren't instanciated, store the settings.
                    else {
                            _this._pendingSettings = _settings;
                        }

                    return {
                        v: _this
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            } else {
                return moduleNames.reduce(function (settings, moduleName) {
                    return (0, _lodashMerge2['default'])({}, settings, _defineProperty({}, moduleName, _this._modules[moduleName].settings()));
                }, {});
            }
        }

        /**
         * Return if a module is currently making a request.
         * @public
         * @method Network#isRequesting
         * @returns {boolean} `true` if a module is requesting, otherwise `false`.
         */
    }, {
        key: 'isRequesting',
        value: function isRequesting() {
            var requesting = false;

            for (var _name in this._modules) {
                if (this._modules.hasOwnProperty(_name)) {
                    requesting = requesting || this._modules[_name].isRequesting();
                }
            }

            return requesting;
        }

        /**
         * Register a new module for the current `Network` instance.
         * @private
         * @method Network#registerModule
         * @param {string} name The name of the module. Will be used to create the property `Network.<name>`.
         * @param {Network~moduleCallback} moduleCallback A callback used to initialize a module with a set of settings.
         * @returns {Network}
         */
    }, {
        key: '_registerModule',
        value: function _registerModule(name, moduleCallback) {
            /**
             * A callback used to initialize a module with a set of settings.
             * @private
             * @callback Network~moduleCallback
             * @param {Object} settings A set of custom settings.
             * @returns {HttpModule} An instanciated subclass of `HttpModule`.
             */
            this._modules[name] = moduleCallback;
            return this;
        }

        /**
         * Initialize all the registered modules with the settings passed to the constructor.
         * @private
         * @method Network#_initModules
         * @returns {Network}
         */
    }, {
        key: '_initModules',
        value: function _initModules() {
            var _this2 = this;

            if (!this._modulesInitialized) {
                // Initialize the modules with their respective settings
                Object.keys(this._modules).forEach(function (name) {
                    _this2._modules[name] = _this2._modules[name](_this2._pendingSettings[name]).on('_newRequest', function () {
                        return !_this2.isRequesting();
                    });

                    _this2[name] = _this2._modules[name];
                });

                this._modulesInitialized = true;
            }

            return this;
        }
    }], null, _instanceInitializers);

    return Network;
})();

exports['default'] = Network;
module.exports = exports['default'];

},{"../utils/decorators":44,"../utils/helpers":45,"./EventDispatcher":1,"./Http/BandwidthModule":2,"./Http/HttpModule":3,"./Http/LatencyModule":4,"./Timing":6,"core-js/modules/es6.object.assign.js":24,"lodash.isplainobject":37,"lodash.merge":41}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _utilsHelpers = require('../utils/helpers');

var _utilsDecorators = require('../utils/decorators');

var _lodashIsfunction = require('lodash.isfunction');

var _lodashIsfunction2 = _interopRequireDefault(_lodashIsfunction);

/**
 * @private
 * @class Timing
 */

var Timing = (function () {
    var _instanceInitializers = {};
    var _instanceInitializers = {};

    _createDecoratedClass(Timing, [{
        key: 'supportsResourceTiming',

        /**
         * Defines if the current browser supports the Resource Timing API.
         * @public
         * @readonly
         * @member {boolean} Timing#supportsResourceTiming
         */
        get: function get() {
            return Boolean(this._support.resourceTiming);
        }

        /**
         * Defines if the current browser supports some specific Timing APIs.
         * @private
         * @member {Object} Timing#_support
         * @property {boolean} performance `true` if the Performance API is available.
         * @property {boolean} userTiming `true` if the User Timing API is available.
         * @property {boolean} resourceTiming `true` if the Resource Timing API is available.
         */
    }, {
        key: '_support',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * All the marks created by the `mark` method.
         * @private
         * @member {Object} Timing#_marks
         */
        enumerable: true
    }, {
        key: '_marks',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },

        /**
         * All the measures created by the `measure` method.
         * @private
         * @member {Object} Timing#_measures
         */
        enumerable: true
    }, {
        key: '_measures',
        decorators: [(0, _utilsDecorators.enumerable)(false)],
        initializer: function initializer() {
            return {};
        },
        enumerable: true
    }], null, _instanceInitializers);

    function Timing() {
        _classCallCheck(this, Timing);

        _defineDecoratedPropertyDescriptor(this, '_support', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_marks', _instanceInitializers);

        _defineDecoratedPropertyDescriptor(this, '_measures', _instanceInitializers);

        var global = (0, _utilsHelpers.getGlobalObject)();

        this._support = {
            performance: !!global.performance,
            userTiming: global.performance && performance.mark,
            resourceTiming: global.performance && (0, _lodashIsfunction2['default'])(performance.getEntriesByType) && performance.timing
        };
    }

    /**
     * Create a new timing mark.
     * @public
     * @method Timing#mark
     * @param {string} label A label associated to the mark.
     * @returns {Timing}
     */

    _createDecoratedClass(Timing, [{
        key: 'mark',
        value: function mark(label) {
            var support = this._support,
                marks = this._marks;

            if (support.userTiming) {
                performance.mark(label);
            }

            if (support.performance) {
                marks[label] = performance.now();
            } else {
                marks[label] = new Date().getTime();
            }

            return this;
        }

        /**
         * Measure the delay between two marks.
         * @public
         * @method Timing#measure
         * @param {string} measureLabel A label associated to the measure.
         * @param {string} markLabelA The label of the first mark.
         * @param {string} markLabelB The label of the second mark.
         * @returns {number} The measured value.
         */
    }, {
        key: 'measure',
        value: function measure(measureLabel, markLabelA, markLabelB) {
            var support = this._support,
                marks = this._marks,
                measures = this._measures;

            if (measures[measureLabel] === undefined) {
                var measureWithoutUserTiming = marks[markLabelB] - marks[markLabelA];

                if (support.userTiming) {
                    performance.measure(measureLabel, markLabelA, markLabelB);
                    var entriesByName = performance.getEntriesByName(measureLabel);

                    // The performance API could return no corresponding entries in Firefox so we must use a fallback.
                    // See: https://github.com/nesk/network.js/issues/32#issuecomment-118434305
                    measures[measureLabel] = entriesByName.length ? entriesByName[0].duration : measureWithoutUserTiming;
                } else {
                    measures[measureLabel] = measureWithoutUserTiming;
                }
            }

            return measures[measureLabel];
        }
    }], null, _instanceInitializers);

    return Timing;
})();

exports['default'] = new Timing();
module.exports = exports['default'];

},{"../utils/decorators":44,"../utils/helpers":45,"lodash.isfunction":36}],7:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],8:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],9:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],10:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":7}],11:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],12:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":14}],13:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":9,"./$.ctx":10,"./$.global":15,"./$.hide":16,"./$.redefine":21}],14:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],15:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],16:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":18,"./$.descriptors":12,"./$.property-desc":20}],17:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":8}],18:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],19:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":18,"./$.fails":14,"./$.iobject":17,"./$.to-object":22}],20:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],21:[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":9,"./$.global":15,"./$.hide":16,"./$.uid":23}],22:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":11}],23:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],24:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":13,"./$.object-assign":19}],25:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],26:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],27:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],28:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = baseFor;

},{}],29:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],30:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":29,"lodash._isiterateecall":32,"lodash.restparam":42}],31:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],32:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],33:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

},{}],34:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],35:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isBoolean;

},{}],36:[function(require,module,exports){
(function (global){
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    nullTag = '[object Null]',
    proxyTag = '[object Proxy]',
    undefinedTag = '[object Undefined]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],37:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    isArguments = require('lodash.isarguments'),
    keysIn = require('lodash.keysin');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"lodash._basefor":28,"lodash.isarguments":33,"lodash.keysin":40}],38:[function(require,module,exports){
/**
 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

},{}],39:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":31,"lodash.isarguments":33,"lodash.isarray":34}],40:[function(require,module,exports){
/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash.isarguments":33,"lodash.isarray":34}],41:[function(require,module,exports){
/**
 * lodash 3.3.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    arrayEach = require('lodash._arrayeach'),
    createAssigner = require('lodash._createassigner'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isPlainObject = require('lodash.isplainobject'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys'),
    toPlainObject = require('lodash.toplainobject');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"lodash._arraycopy":25,"lodash._arrayeach":26,"lodash._createassigner":30,"lodash.isarguments":33,"lodash.isarray":34,"lodash.isplainobject":37,"lodash.istypedarray":38,"lodash.keys":39,"lodash.toplainobject":43}],42:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],43:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keysIn = require('lodash.keysin');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"lodash._basecopy":27,"lodash.keysin":40}],44:[function(require,module,exports){
/**
 * @callback propertyDecorator
 * @param target
 * @param key
 * @param descriptor
 */

/**
 * Set the enumerability of a property.
 * @private
 * @function enumerable
 * @param {boolean} isEnumerable Whether the property should be enumerable or not.
 * @returns {propertyDecorator}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enumerable = enumerable;

function enumerable(isEnumerable) {
  return function (target, key, descriptor) {
    descriptor.enumerable = isEnumerable;
    return descriptor;
  };
}

},{}],45:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getGlobalObject = getGlobalObject;
exports.copy = copy;
exports.except = except;
exports.defer = defer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

/**
 * Return the global object.
 * @private
 * @function getGlobalObject
 * @return {Object}
 * @see https://gist.github.com/rauschma/1bff02da66472f555c75
 */

function getGlobalObject() {
    // Workers don’t have `window`, only `self`.
    if (typeof self !== 'undefined') {
        return self;
    }

    if (typeof global !== 'undefined') {
        return global;
    }

    // Not all environments allow `eval` and `Function`, use only as a last resort.
    return new Function('return this')();
}

/**
 * Make a deep copy of any value.
 * @private
 * @function copy
 * @param {*} value The value to copy.
 * @returns {*} The copied value.
 */

function copy(value) {
    return JSON.parse(JSON.stringify(value));
}

/**
 * Get a copy of an object without some of its properties.
 * @private
 * @function except
 * @param {Object} obj The original object.
 * @param {string[]} properties The properties to exclude from the copied object.
 * @returns {Object} The copied object without the specified properties.
 */

function except(obj, properties) {
    var objCopy = Object.assign({}, obj);
    properties.forEach(function (index) {
        return delete objCopy[index];
    });
    return objCopy;
}

/**
 * Defer the execution of a function.
 * @private
 * @function defer
 * @param {Function} func The function to defer.
 * @returns {Defer} The Defer object used to execute the function when needed.
 */

function defer() {
    var func = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    /**
     * @private
     * @class Defer
     */
    return new ((function () {
        function _class() {
            _classCallCheck(this, _class);

            this.func = func;
        }

        /**
         * Execute the deferred function.
         * @public
         * @method Defer#run
         */

        _createClass(_class, [{
            key: 'run',
            value: function run() {
                if (this.func) this.func();
                delete this.func;
            }
        }]);

        return _class;
    })())();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"lodash.isplainobject":37}]},{},[5])(5)
});
//# sourceMappingURL=network.js.map
