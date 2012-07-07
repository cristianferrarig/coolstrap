/**
 * Console Management
 *
 * @namespace COOLSTRAP
 * @class Console
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOLSTRAP.Console = (function(cool) {

  /**
   * Console system to display messages when you are in debug mode.
   *
   * @method _log
   *
   * @param {number} Level based COOLSTRAP.Constants.LOG_LEVEL
   * @param {string} Message to show in console
   */
  var _log = function(level, message) {
    var default_level = cool.App.launchOptions['log_level'] || 0;
    var l = cool.Constants.LOG_LEVEL;
    if (!cool.Util.Platform.isMobile()) {
      if (level >= default_level) {
        console[(level === l.DEBUG || level === l.INFO) ? 'info' : (level === l.LOG) ? 'log' : (level === l.WARN) ? 'warn' : 'error'](message);
      }
    } else {
      //TODO: try to log natively 
    }
  };

 
  return {
    debug: function(message) {
      if (typeof message != "object") message = '[DEBUG] '+ message
      _log(cool.Constants.LOG_LEVEL.DEBUG, message);
    },
    info: function(message) {
      if (typeof message != "object") message = '[INFO] '+ message
      _log(cool.Constants.LOG_LEVEL.INFO,  message);
    },
    log: function(message) {
      if (typeof message != "object") message = '[LOG] '+ message
      _log(cool.Constants.LOG_LEVEL.LOG, message);
    }, 
    warn: function(message) {
      if (typeof message != "object") message = '[WARN] '+ message
      _log(cool.Constants.LOG_LEVEL.WARN, message);
    }, 
    error: function(message) {
      if (typeof message != "object") message = '[ERROR] '+ message
      _log(cool.Constants.LOG_LEVEL.ERROR, message);
    }, 
  };

})(COOLSTRAP);