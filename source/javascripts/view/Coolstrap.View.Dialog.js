/**
 * Initialize the <dialog> layout
 *
 * @namespace COOL.View
 * @class Dialog
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.View.Dialog = (function(cool) {

  var ELEMENT = cool.Constants.ELEMENT;
  var CLASS = cool.Constants.CLASS;
  var DIALOG = cool.Constants.DIALOG;
  var TRANSITION = cool.Constants.TRANSITION;
  var console = cool.Console;

  var _getPosition = function(element) {
    return cool.dom.extend({}, (element.offset()), {
      width: element[0].offsetWidth,
      height: element[0].offsetHeight
    });
  };

  var _getPositionFromSource = function(source_pos, dialog_width, dialog_height, placement) {
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

  var _getPositionCenterOnScreen = function(source_size) {
    var dialog_pos;
    var update = true;
    var environment = cool.Util.Platform.reloadEnvironment();
    var screen_size = environment.screen;
    dialog_pos = {
      top: screen_size.height/2 - source_size.height/2, 
      left: screen_size.width/2 - source_size.width/2,
      'margin-left': 0
    };
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
    dialog.removeClass();

    dialog_pos = _getPositionFromSource(_getPosition(source_element), dialog[0].offsetWidth, dialog[0].offsetHeight, options.placement);
    dialog.css(dialog_pos).addClass(options.placement);


  };

  var _prepareAlert = function(dialog, options) {
    var set_alert_position = function() {
      var dialog_pos = _getPositionCenterOnScreen(_getPosition(dialog));
      dialog.css(dialog_pos);
    };
    set_alert_position();
    cool.dom(window).on('resize', function(){
      set_alert_position();
    });
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
    var dialog = cool.dom(ELEMENT.DIALOG + dialog_id);
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
    dialog.removeClass(CLASS.HIDE).addClass(CLASS.CURRENT).addClass(CLASS.SHOW);
  };

  /**
   * Close dialog
   *
   * @method show
   */
  var close = function(dialog_id) {
    var dialog = cool.dom(ELEMENT.DIALOG + dialog_id);
    var dialog_type = dialog.data('type');
    var dialog_animation = dialog.data('transition');
    if (dialog_type === DIALOG.ACTION) {
      dialog_animation = dialog_animation || 'slideUp';
    }
    if (dialog_type === DIALOG.MODAL) {
      dialog_animation = dialog_animation || 'bounceOut';
    }
    dialog.removeClass(CLASS.SHOW).addClass(CLASS.HIDE);  
    if (!dialog_animation) {
      dialog.removeClass(CLASS.CURRENT);
    } else { 
      setTimeout(function() {
        dialog.removeClass(CLASS.CURRENT);
      }, TRANSITION.DURATION);  
    }   
  };

  return {
    show: show,
    close: close
  };

})(COOL);
