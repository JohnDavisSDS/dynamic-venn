'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}

// Additional Set functions
if (!Set.prototype.isSuperset) {
    Object.defineProperty(Set.prototype, 'isSuperset', {
        value: function(subset) {
            for (var elem of subset) {
                if (!this.has(elem)) {
                    return false;
                }
            }
            return true;
        }
    });
}

if (!Set.prototype.union) {
    Object.defineProperty(Set.prototype, 'union', {
        value: function(setB) {
            var union = new Set(this);
            for (var elem of setB) {
                union.add(elem);
            }
            return union;
        }
    });
}

if (!Set.prototype.intersection) {
    Object.defineProperty(Set.prototype, 'intersection', {
        value: function(setB) {
            var intersection = new Set();
            for (var elem of setB) {
                if (this.has(elem)) {
                    intersection.add(elem);
                }
            }
            return intersection;
        }
    });
}

if (!Set.prototype.difference) {
    Object.defineProperty(Set.prototype, 'difference', {
        value: function(setB) {
            var difference = new Set(this);
            for (var elem of setB) {
                difference.delete(elem);
            }
            return difference;
        }
    });
}