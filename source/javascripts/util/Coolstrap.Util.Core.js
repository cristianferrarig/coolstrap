/**
 * Coolstrap Core functions
 * 
 * @namespace COOLSTRAP.Util
 * @class Core
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
 */

COOLSTRAP.Util.Core = (function(cool) {
  
  var _toArray = function(obj) {
    return Array.prototype.slice.call(obj, 0);
  };

  var _getType = function(obj) {
    return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  };

  /**
   * Executes callbacks based on the parameters received.
   *
   * @method execute
   *
   * @param {Function} callback to execute
   */
  var execute = function() {
    var args = _toArray(arguments);
    var callback = args.shift();
    if (_getType(callback) === 'function') {
      callback.apply(null, args);
    }
  };


  /**
   * Mix two objects
   *
   * @method extend
   *
   * @param {object} arguments to mix them all into a new object.
   * @return {object} child a new object with all the objects from the arguments mixed.
  */
  var extend = function() {
    var child = child || {};
    for (var arg = 0, len = arguments.length; arg < len; arg++) {
      var argument = arguments[arg];
      for (var prop in argument) {
        child[prop] = argument[prop];
      }
    }
    return child;
  };

  return {
    execute: execute,
    extend: extend
  };

})(COOLSTRAP);
