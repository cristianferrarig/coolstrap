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
  var DIALOG = coolstrap.Constants.DIALOG;
  var DIALOG_CARRET = {
    TOP: 'carretTop',
    LEFT: 'carretTop',
    RIGHT: 'carretRight',
    BOTTOM: 'carretTop'
  };
  var console = coolstrap.Console;

  var _getPosition = function(element) {
    return coolstrap.dom.extend({}, (element.offset()), {
      width: element[0].offsetWidth,
      height: element[0].offsetHeight
    });
  };

  var _getPositionCenter = function(source_pos, dialog_width, dialog_height, placement) {
    var dialog_pos;
    switch (placement) {
      case CLASS.BOTTOM:
        dialog_pos = {top: source_pos.top + source_pos.height, left: source_pos.left + source_pos.width / 2 - dialog_width / 2};
        break;
      case CLASS.TOP:
        dialog_pos = {top: source_pos.top - dialog_height, left: source_pos.left + source_pos.width / 2 - dialog_width / 2};
        break;
      case CLASS.LEFT:
        dialog_pos = {top: source_pos.top + source_pos.height / 2 - dialog_height / 2, left: source_pos.left - dialog_width};
        break;
      case CLASS.RIGHT:
        dialog_pos = {top: source_pos.top + source_pos.height / 2 - dialog_height / 2, left: source_pos.left + source_pos.width};
        break;
    }
    if (dialog_pos.left < 0) { dialog_pos.left = 0; }
    if (dialog_pos.top < 0) { dialog_pos.top = 0; }
    return dialog_pos;
  };

  var _preparePopover = function(dialog, options) {
    var source_element = options.source_element,
        dialog_pos;

    if (source_element) {
      options.placement = options.placement || source_element.data('placement');
      options.animation = options.animation || source_element.data('animation');
    } else {
      console.warn('WTF! you must set a source_element');
      return;
    }
    options.placement = options.placement || CLASS.RIGHT;
    if (options.animation) {
      dialog.addClass(CLASS.FADE_IN);
    }
    dialog_pos = _getPositionCenter(_getPosition(source_element), dialog[0].offsetWidth, dialog[0].offsetHeight, options.placement);
    dialog.css(dialog_pos).addClass(options.placement);
  };

  var _prepareAlert = function(dialog, options) {

  };

  var _prepareModal = function(dialog, options) {

  };

  var _prepareAction = function(dialog, options) {

  };


  /**
   * Show dialog
   *
   * @method show
   */
  var show = function(dialog_id, options) {
    var dialog = coolstrap.dom(ELEMENT.DIALOG + dialog_id);
    var dialog_type = dialog.data('type');
    options = options || {};
    switch (dialog_type) {
      case DIALOG.MODAL:
        _prepareModal(dialog, options);
        break;
      case DIALOG.ALERT:
        _prepareAlert(dialog, options);
        break;
      case DIALOG.ACTION:
        _prepareAction(dialog, options);
        break;
      case DIALOG.POPOVER:
        _preparePopover(dialog, options);
        break;
    }
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
