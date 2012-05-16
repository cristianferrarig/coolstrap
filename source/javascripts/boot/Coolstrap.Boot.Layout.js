/**
 * Initialize the Layout of Coolstrap 
 *
 * @namespace COOL.Boot
 * @class Layout
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
 */

COOL.Boot.Layout = (function(coolstrap, undefined) {

  var _window = null;
  var _document = null;

  /**
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method start
   *
   */
  var start = function() {
    coolstrap.Console.debug("Booting Layout");
    if (coolstrap.Core.isMobile()) {
      _window = window;
      _document = _window.document;
      _resizeLayout();
    }
  };

  var _resizeLayout = function() {
    if (_window.innerHeight == 356) {
      var _height = 416;
      //_document.body.style.height = _height + 'px';
      //coolstrap.dom('section').css('height', _height);
      coolstrap.Helper.hideNavigationBar();
    }
  };

  return {
    start: start
  };

})(COOL);