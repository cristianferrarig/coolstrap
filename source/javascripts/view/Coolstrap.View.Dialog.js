/**
 * Initialize the <dialog> layout
 *
 * @namespace COOL.View
 * @class Dialog
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.View.Dialog = (function(coolstrap) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;

  /**
   * Show dialog
   *
   * @method show
   */
  var show = function(dialog_id) {
    var dialog = coolstrap.dom(ELEMENT.DIALOG + dialog_id);
    dialog.addClass(CLASS.CURRENT);
  };

  /**
   * Close dialog
   *
   * @method show
   */
  var close = function(dialog_id) {
    var dialog = coolstrap.dom(ELEMENT.DIALOG + dialog_id);
    dialog.removeClass(CLASS.CURRENT);
  };

  return {
    show: show,
    close: close
  };

}(COOL));
