/**
 * Fallback to Android unexpected behaviors.
 * Android Sucks!
 *
 * @namespace COOL.Fallback
 * @class Android
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Fallback.Android  = (function(coolstrap, undefined) {

  var CLASS = coolstrap.Constants.CLASS;

  var buttons = function() {
  	environment = coolstrap.Core.environment();
    if (environment.isMobile && environment.os.name === 'android') {
      coolstrap.dom(document.body).on('touchstart', '.button', _addClassActiveToButton);
      coolstrap.dom(document.body).on('touchend', '.button', _removeClassActiveToButton);
    }
  };

  var inputs = function(article_id, active) {
    environment = coolstrap.Core.environment();
    if (environment.isMobile && environment.os.name === 'android' && environment.os.version < '4') {
      var selector = article_id + ' input, ' + article_id + ' textarea, ' + article_id + ' select';
      var input_elements = coolstrap.dom(selector);
      for (var i = 0, len = input_elements.length; i < len; i++) {
          (active) ? _enableAndroidInput(input_elements[i]) : _disableAndroidInput(input_elements[i]);
      }
    }
  };

  var _enableAndroidInput = function(input) {
    input.removeAttr('disabled');
  };

  var _disableAndroidInput = function(input) {
    input.attr('disabled', 'disabled');
  };

  var _addClassActiveToButton = function(element) {
    coolstrap.dom(this).addClass(CLASS.ACTIVE);
  };

  var _removeClassActiveToButton = function(element) {
    coolstrap.dom(this).removeClass(CLASS.ACTIVE);
  };

  return {
  	buttons: buttons,
    inputs: inputs
  }

})(COOL);