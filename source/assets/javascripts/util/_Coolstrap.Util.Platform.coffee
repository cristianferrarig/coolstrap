###
 * Coolstrap Platform functions
 * 
 * @namespace COOLSTRAP.Util
 * @class Platform
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
###

COOLSTRAP.Util.Platform = ((cool) ->
  SUPPORTED_OS =
    android: /(Android)\s+([\d.]+)/
    ipad: /(iPad).*OS\s([\d_]+)/
    iphone: /(iPhone\sOS)\s([\d_]+)/
    blackberry: /(BlackBerry).*Version\/([\d.]+)/
    webos: /(webOS|hpwOS)[\s\/]([\d.]+)/
    windows: /(Windows Phone OS)[\s\/]([\d.]+)/

  _current_environment = null
  _detectBrowser = (user_agent) ->
    is_webkit = user_agent.match(/WebKit\/([\d.]+)/)
    (if (is_webkit) then is_webkit[0] else user_agent)

  _detectOS = (user_agent) ->
    detected_os = undefined
    for os of SUPPORTED_OS
      supported = user_agent.match(SUPPORTED_OS[os])
      if supported
        detected_os =
          name: (if (os is "iphone" or os is "ipad") then "ios" else os)
          version: supported[2].replace("_", ".")

        break
    detected_os

  _detectEnvironment = ->
    ua = navigator.userAgent
    environment = {}
    environment.browser = _detectBrowser(ua)
    environment.os = _detectOS(ua)
    environment.isMobile = (if (environment.os) then true else false)
    environment.screen =
      width: window.innerWidth
      height: window.innerHeight

    environment
  ###
     * Determine if the current environment is a mobile environment
     *
     * @method isMobile
     *
     * @return {boolean} true if is mobile environment, false if not.
  ###
  isMobile = ->
    _current_environment = _current_environment or _detectEnvironment()
    _current_environment.isMobile
  ### 
    * Get from current environment
    *
    * Inspired by LungoJS
    *
    * @method environment
  ###
  environment = (reload_environment) ->
    _current_environment = (if reload_environment then _detectEnvironment() else _current_environment or _detectEnvironment())
    _current_environment
  
  ###
    * Reload  current environment
    *
    * @method reloadEnvironment
  ###
  reloadEnvironment = ->
    environment true

  ###
    * Detect if browser is online
    *
    * @method isOnline
  ###
  isOnline = ->
    navigator.onLine

  isMobile: isMobile
  environment: environment
  isOnline: isOnline
  reloadEnvironment: reloadEnvironment
)(COOLSTRAP)