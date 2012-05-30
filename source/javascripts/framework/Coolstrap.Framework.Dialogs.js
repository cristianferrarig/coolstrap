/**
 * Initialize all div[role=dialog] element 
 *
 * @namespace COOL.Framework
 * @class Dialogs
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Dialogs = (function(cool) {
  var ELEMENT = COOL.Constants.ELEMENT;

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

})(COOL);