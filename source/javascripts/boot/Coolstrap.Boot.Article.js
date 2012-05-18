/**
 * Initialize the <article> element
 * Inspired by LungoJS
 *
 * @namespace COOL.Boot
 * @class Article
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Boot.Article = (function(coolstrap, undefined) {
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;

  /**
   * Initializes the markup elements of an article
   *
   * @method start
   */
  var start = function() {
    _initElement('.' + CLASS.SCROLLABLE, _createScrollElement);
  };

  var _initElement = function(selector, callback) {
    var found_elements = coolstrap.dom(selector);
    for (var i = 0, len = found_elements.length; i < len; i++) {
      var element = coolstrap.dom(found_elements[i]);
      coolstrap.Core.execute(callback, element);
    }
  };

  var _createScrollElement = function(scroll) {
    coolstrap.View.Scroll.init(scroll);
  };

  return {
    start: start
  };

})(COOL);