/**
 * Initialize the <dialog> layout 
 *
 * @namespace COOL.View
 * @class Dialog
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */


COOL.View.Dialog = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var TRIGGER = coolstrap.Constants.TRIGGER;


  /**
   * Show dialog
   *
   * @method show
   */
  var show = function(dialog_id) {
    alert('showing' + dialog_id);
  };

  return {
    show: show
  };

})(COOL);