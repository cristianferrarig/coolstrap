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

  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var SELECTORS = {
      SCROLL_IN_ARTICLE: '.scrollable'
  };

  /**
   * Initializes the markup elements of an article
   *
   * @method start
   */
  var start = function() {
    _initElement(SELECTORS.SCROLL_IN_ARTICLE, _createScrollElement);
  };

  var _initElement = function(selector, callback) {
    var found_elements = coolstrap.dom(selector);
    for (var i = 0, len = found_elements.length; i < len; i++) {
      var element = coolstrap.dom(found_elements[i]);
      coolstrap.Core.execute(callback, element);
    }
  };

  var _createScrollElement = function(scroll) {
    var scroll_id = scroll.attr(ATTRIBUTE.ID);
    coolstrap.View.Scroll.init(scroll_id);
  };

  return {
    start: start
  };

})(COOL);