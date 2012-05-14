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
   * @method log
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
      _log(coolstrap.Constants.LOG_LEVEL.DEBUG, '[DEBUG] '+ message);
    },
    info: function(message) {
      _log(coolstrap.Constants.LOG_LEVEL.INFO, '[INFO]  '+ message);
    },
    log: function(message) {
      _log(coolstrap.Constants.LOG_LEVEL.LOG, '[LOG]   '+ message);
    }, 
    warn: function(message) {
      _log(coolstrap.Constants.LOG_LEVEL.WARN, '[WARN]  '+ message);
    }, 
    error: function(message) {
      _log(coolstrap.Constants.LOG_LEVEL.ERROR, '[ERROR] '+ message);
    }, 
  };

})(COOL);