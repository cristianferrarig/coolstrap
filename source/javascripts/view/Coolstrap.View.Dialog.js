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
  var console = coolstrap.Console;

  var _getPosition = function(element) {
    return coolstrap.dom.extend({}, (element.offset()), {
      width: element[0].offsetWidth, 
      height: element[0].offsetHeight
    });
  };

  var _preparePopover = function(dialog, options) {
    var source_element = options.source_element,
        dialog_width,
        dialog_height,
        dialog_pos,
        pos;

    if (source_element) {
      options.placement = options.placement || source_element.data('placement');
      options.animation = options.animation || source_element.data('animation');
    } else {
      console.warn('WTF! you must set a source_element');
      return;
    }
    options.placement = options.placement || CLASS.RIGHT;
    if (options.animation) {
      dialog.addClass(CLASS.FADE_IN);
    }
    dialog_width = dialog[0].offsetWidth;
    dialog_height = dialog[0].offsetHeight;
    pos = _getPosition(source_element);
    switch (options.placement) {
      case CLASS.BOTTOM:
        dialog_pos = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - dialog_width / 2};
        break;
      case CLASS.TOP:
        dialog_pos = {top: pos.top - dialog_height, left: pos.left + pos.width / 2 - dialog_width / 2};
        break;
      case CLASS.LEFT:
        dialog_pos = {top: pos.top + pos.height / 2 - dialog_height / 2, left: pos.left - dialog_width};
        break;
      case CLASS.RIGHT:
        dialog_pos = {top: pos.top + pos.height / 2 - dialog_height / 2, left: pos.left + pos.width};
        break;
    }
    dialog.css(dialog_pos).addClass(options.placement);
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
    switch(dialog_type) {
      case DIALOG.MODAL:
        
        break;
      case DIALOG.ALERT:
        
        break;
      case DIALOG.ACTION:
        
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
