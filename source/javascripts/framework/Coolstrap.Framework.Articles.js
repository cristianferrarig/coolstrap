/**
 * Initialize all <article> element in sections
 *
 * @namespace COOL.Framework
 * @class Articles
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Articles = (function(coolstrap, undefined) {
  var SCROLLABLE_CLASS = coolstrap.Constants.CLASS.SCROLLABLE;

  /**
   * Setup the elements of an article
   *
   * @method setup
   */
  var setup = function() {
    _initElement('.' + SCROLLABLE_CLASS, _initScroller);
  };

  var _initElement = function(selector, callback) {
    var found_elements = coolstrap.dom(selector);
    for (var i = 0, len = found_elements.length; i < len; i++) {
      var element = coolstrap.dom(found_elements[i]);
      coolstrap.Core.execute(callback, element);
    }
  };

  /**
   * Setup scroller elements
   *
   * @method _initScroller
   */
  var _initScroller = function(element) {
    coolstrap.View.Scroll.init(element);
  };

  return {
    setup: setup
  };

})(COOL);