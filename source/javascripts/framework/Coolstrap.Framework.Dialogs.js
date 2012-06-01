/**
 * Initialize all div[role=dialog] element 
 *
 * @namespace COOLSTRAP.Framework
 * @class Dialogs
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOLSTRAP.Framework.Dialogs = (function(cool) {
  var ELEMENT = COOLSTRAP.Constants.ELEMENT;

  var _initElement = function(selector, callback) {
    var found_elements = cool.dom(selector);
    var i;
    for (i = 0, len = found_elements.length; i < len; i++) {
      var element = cool.dom(found_elements[i]);
      cool.Util.Core.execute(callback, element);
    }
  };
 
  var _initDialog = function(element) {
    
  };

  /**
   * Setup all dialog elements
   *
   * @method setup
   */
  var setup = function() {
    _initElement(ELEMENT.DIALOG, _initDialog);
  };

  return {
    setup: setup
  };

})(COOLSTRAP);