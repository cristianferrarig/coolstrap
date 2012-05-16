/**
 * Initialize the <Aisde> layout
 *
 * @namespace COOL.View
 * @class Aside
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.View.Aside = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var TRANSITION = coolstrap.Constants.TRANSITION;
  /**
   * Display an aside element 
   *
   * @method show
   *
   * @param  {string} Aside id
   */
  var show = function(aside_id) {
    var aside = coolstrap.dom(ELEMENT.ASIDE + aside_id);
    var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
    coolstrap.dom(ELEMENT.BODY).addClass(body_class).addClass(CLASS.ASIDE);
    aside.addClass(CLASS.CURRENT);
  };

  /**
   * Hide an aside element
   *
   * @method hide
   *
   * @param  {string} Aside id
   */
  var hide = function(aside_id) {
      var aside = coolstrap.dom(ELEMENT.ASIDE + aside_id);
      var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
      coolstrap.dom(ELEMENT.BODY).removeClass(body_class).removeClass(CLASS.ASIDE);
      setTimeout(function() {
          var current_aside = ELEMENT.ASIDE + aside_id + '.' + CLASS.CURRENT;
          coolstrap.dom(current_aside).removeClass(CLASS.CURRENT);
      }, TRANSITION.DURATION); 
  };

  var _classFromAside = function(aside) {
      var aside_class = aside.attr(ATTRIBUTE.CLASS);
      return aside_class || '';
  };

  return {
      show: show,
      hide: hide
  };

})(COOL);