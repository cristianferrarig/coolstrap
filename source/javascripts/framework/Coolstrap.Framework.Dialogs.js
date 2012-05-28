/**
 * Initialize all div[role=dialog] element 
 *
 * @namespace COOL.Framework
 * @class Dialogs
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Dialogs = (function(coolstrap, undefined) {
  var ELEMENT = COOL.Constants.ELEMENT;

  /**
   * Setup all dialog elements
   *
   * @method setup
   */
  var setup = function() {
    _initElement(ELEMENT.DIALOG, _initDialog);
  };

  var _initElement = function(selector, callback) {
    var found_elements = coolstrap.dom(selector);
    var i;
    for (i = 0, len = found_elements.length; i < len; i++) {
      var element = coolstrap.dom(found_elements[i]);
      coolstrap.Core.execute(callback, element);
    }
  };


  /**
   * Setup scroller elements
   *
   * @method _initScroller
   */
  var _initDialog = function(element) {
    
  };

  return {
    setup: setup
  };

}(COOL));