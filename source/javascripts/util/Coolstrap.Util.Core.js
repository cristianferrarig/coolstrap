/**
 * Coolstrap Core functions
 * 
 * @namespace COOL.Util
 * @class Core
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
 */

COOL.Util.Core = (function(cool) {
  
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
   * Creates a new function that, when called, itself calls this function in
   * the context of the provided this value, with a given sequence of arguments
   * preceding any provided when the new function was called.
   *
   * @method bind
   *
   * @param {object} object to which the 'this' can refer in the new function when the new function is called.
   * @param {Function} method A function object.
   */
  var bind = function(object, method) {
    return function() {
      return method.apply(object, _toArray(arguments));
    };
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
    bind: bind,
    extend: extend
  };

})(COOL);
