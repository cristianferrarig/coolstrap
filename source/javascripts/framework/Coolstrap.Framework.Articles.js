/**
 * Initialize all <article> element in sections
 *
 * @namespace COOL.Framework
 * @class Articles
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Articles = (function(cool) {
  var SCROLLABLE_CLASS = cool.Constants.CLASS.SCROLLABLE;
  
  var _initElement = function(selector, callback) {
    var found_elements = cool.dom(selector);
    for (var i = 0, len = found_elements.length; i < len; i++) {
      var element = cool.dom(found_elements[i]);
      cool.Util.Core.execute(callback, element);
    }
  };

  var _initScroller = function(element) {
    cool.View.Scroll.init(element);
  };

  /**
   * Setup the elements of an article
   *
   * @method setup
   */
  var setup = function() {
    _initElement('.' + SCROLLABLE_CLASS, _initScroller);
  };

  return {
    setup: setup
  };

})(COOL);