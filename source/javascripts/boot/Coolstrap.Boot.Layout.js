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

  /**
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method init
   *
   */
  var start = function() {
    coolstrap.Console.debug("Booting Layout");
    if (coolstrap.Core.isMobile()) {
      coolstrap.core.hideNavigationBar();
    }
  };

  return {
    start: start
  };

})(COOL);