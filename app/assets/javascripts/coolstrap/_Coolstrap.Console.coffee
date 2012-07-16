###
 * Console Management
 *
 * @namespace COOLSTRAP
 * @class Console
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Console = ((cool) ->
  
  ###
   * Console system to display messages when you are in debug mode.
   *
   * @method _log
   *
   * @param {number} Level based COOLSTRAP.Constants.LOG_LEVEL
   * @param {string} Message to show in console
  ###
  
  _log = (level, message) ->
    default_level = cool.App.launchOptions["log_level"] or 0
    l = cool.Constants.LOG_LEVEL
    unless cool.Util.Platform.isMobile()
      console[(if (level is l.DEBUG or level is l.INFO) then "info" else (if (level is l.LOG) then "log" else (if (level is l.WARN) then "warn" else "error")))] message  if level >= default_level
    else
      #TODO: try to log natively 

  debug: (message) ->
    message = "[DEBUG] " + message  unless typeof message is "object"
    _log cool.Constants.LOG_LEVEL.DEBUG, message

  info: (message) ->
    message = "[INFO] " + message  unless typeof message is "object"
    _log cool.Constants.LOG_LEVEL.INFO, message

  log: (message) ->
    message = "[LOG] " + message  unless typeof message is "object"
    _log cool.Constants.LOG_LEVEL.LOG, message

  warn: (message) ->
    message = "[WARN] " + message  unless typeof message is "object"
    _log cool.Constants.LOG_LEVEL.WARN, message

  error: (message) ->
    message = "[ERROR] " + message  unless typeof message is "object"
    _log cool.Constants.LOG_LEVEL.ERROR, message
)(COOLSTRAP)

