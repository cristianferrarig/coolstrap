/**
 * Console Management
 *
 * @namespace COOL
 * @class Console
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Console = (function(coolstrap, undefined) {

  /**
   * Console system to display messages when you are in debug mode.
   *
   * @method _log
   *
   * @param {number} Level based COOL.Constants.LOG_LEVEL
   * @param {string} Message to show in console
   */
  var _log = function(level, message) {
    var default_level = coolstrap.App.get('log_level') || 0;
    var l = coolstrap.Constants.LOG_LEVEL;
    if (!coolstrap.Core.isMobile()) {
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
      _log(coolstrap.Constants.LOG_LEVEL.DEBUG, message);
    },
    info: function(message) {
      if (typeof message != "object") message = '[INFO] '+ message
      _log(coolstrap.Constants.LOG_LEVEL.INFO,  message);
    },
    log: function(message) {
      if (typeof message != "object") message = '[LOG] '+ message
      _log(coolstrap.Constants.LOG_LEVEL.LOG, message);
    }, 
    warn: function(message) {
      if (typeof message != "object") message = '[WARN] '+ message
      _log(coolstrap.Constants.LOG_LEVEL.WARN, message);
    }, 
    error: function(message) {
      if (typeof message != "object") message = '[ERROR] '+ message
      _log(coolstrap.Constants.LOG_LEVEL.ERROR, message);
    }, 
  };

})(COOL);