/**
 * Coolstrapp.Core.js
 */

STRAPP.Core = (function(coolstrapp, undefined) {

  var HASHTAG_CHARACTER = '#';

  /**
   * Console system to display messages when you are in debug mode.
   *
   * @method log
   *
   * @param {number} Severity based in (1)Log, (2)Warn, (>2)Error
   * @param {string} Message to show in console
   */
  var log = function(severity, message) {
    if (!coolstrapp.Core.isMobile()) {
      console[(severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
    } 
  };

  /**
   * Executes callbacks based on the parameters received.
   *
   * @method execute
   *
   * @param {Function} callback to execute
   */
  var execute = function() {
      var args = toArray(arguments);
      var callback = args.shift();

      if (toType(callback) === 'function') {
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
          return method.apply(object, toArray(arguments));
      };
  };

  /**
  * Copy from any number of objects and mix them all into a new object.
  * The implementation is simple; just loop through arguments and
  * copy every property of every object passed to the function.
  *
  * @method mix
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

  /**
   *
   */
  var toType = function(obj) {
      return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  };


  /**
   * Convert an array-like object into a true JavaScript array.
   *
   * @param {object} obj Any object to turn into a native Array.
   * @return {object} The object is now a plain array.
   */
  var toArray = function(obj) {
    return Array.prototype.slice.call(obj, 0);
  };

  /**
   * Determine if the current environment is a mobile environment
   *
   * @method isMobile
   *
   * @return {boolean} true if is mobile environment, false if not.
   */
  var isMobile = function() {
    //TODO: implement isMobile method
    return true;
  };

  /**
   * Returns information of execute environment
   *
   * @method environment
   *
   * @return {object} Environment information
   */
  var environment = function() {
    //TODO: implement environment
    return {};
  };

  /**
   * Returns a ordered list of objects by a property
   *
   * @method orderByProperty
   *
   * @param {list} List of objects
   * @param {string} Name of property
   * @param {string} Type of order: asc (ascendent) or desc (descendent)
   * @return {list} Ordered list
   */
  var orderByProperty = function(data, property, order) {
    var order_operator = (order === 'desc') ? -1 : 1;

    return data.sort(function(a, b) {
        return (a[property] < b[property]) ? - order_operator :
            (a[property] > b[property])
            ?
            order_operator : 0;
        }
    );
  };

  /**
   * Returns a correct URL using hashtag character
   *
   * @method parseUrl
   *
   * @param {string} Url
   * @return {string} Url parsed
   */
  var parseUrl = function(href) {
      var href_hashtag = href.lastIndexOf(HASHTAG_CHARACTER);
      if (href_hashtag > 0) {
          href = href.substring(href_hashtag);
      } else if (href_hashtag === -1) {
          href = HASHTAG_CHARACTER + href ;
      }
      return href;
  };

  /**
   * Returns a Object in a list by a property value
   *
   * @method objectInListByProperty
   *
   * @param {list} List of objects
   * @param {string} Name of property
   * @param {var} Value for comparision
   * @return {object} Instance of object founded (if exists)
   */
   var findByProperty = function(list, property, value) {
      var search = null;

      for (var i = 0, len = list.length; i < len; i++) {
          var element = list[i];

          if (element[property] == value) {
              search = element;
              break;
          }
      };

      return search;
  };

  return {
      log: log,
      execute: execute,
      bind: bind,
      extend: extend,
      toType: toType,
      toArray: toArray,
      isMobile: isMobile,
      environment: environment,
      orderByProperty: orderByProperty,
      parseUrl: parseUrl,
      findByProperty: findByProperty,
      $: "undefined" !== typeof window ? window.jQuery || window.Zepto || null : null
  };

})(STRAPP);
