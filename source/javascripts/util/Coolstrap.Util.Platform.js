/**
 * Coolstrap Platform functions
 * 
 * @namespace COOL.Util
 * @class Platform
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
 */

COOL.Util.Platform = (function(cool) {

  var SUPPORTED_OS = {
    android: /(Android)\s+([\d.]+)/,
    ipad: /(iPad).*OS\s([\d_]+)/,
    iphone: /(iPhone\sOS)\s([\d_]+)/,
    blackberry: /(BlackBerry).*Version\/([\d.]+)/,
    webos: /(webOS|hpwOS)[\s\/]([\d.]+)/,
    windows: /(Windows Phone OS)[\s\/]([\d.]+)/,
  };
  var _current_environment = null;

  var _detectBrowser = function(user_agent) {
    var is_webkit = user_agent.match(/WebKit\/([\d.]+)/);
    return (is_webkit) ? is_webkit[0]: user_agent;
  }

  var _detectOS = function(user_agent) {
    var detected_os;
    for (os in SUPPORTED_OS) {
      var supported = user_agent.match(SUPPORTED_OS[os]);
      if (supported) {
        detected_os = {
          name: (os === 'iphone' || os === 'ipad') ? 'ios' : os,
          version: supported[2].replace('_', '.')
        }
        break;
      }
    }
    return detected_os;
  }

  var _detectEnvironment = function() {
    var ua = navigator.userAgent;
    var environment = {};
    environment.browser = _detectBrowser(ua);
    environment.os = _detectOS(ua);
    environment.isMobile = (environment.os) ? true : false;
    environment.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    return environment;
  }

  /**
   * Determine if the current environment is a mobile environment
   *
   * @method isMobile
   *
   * @return {boolean} true if is mobile environment, false if not.
   */
  var isMobile = function() {
    _current_environment = _current_environment || _detectEnvironment();
    return _current_environment.isMobile;
  };

  /** 
  * Get from current environment
  *
  * Inspired by LungoJS
  *
  * @method environment
  */
  var environment = function(reload_environment) {
    _current_environment = reload_environment ?  _detectEnvironment() : _current_environment || _detectEnvironment();
    return _current_environment;
  };

  /** 
  * Reload  current environment
  *
  * @method reloadEnvironment
  */
  var reloadEnvironment = function() {
    return environment(true);
  };

  /** 
  * Detect if browser is online
  *
  * @method isOnline
  */
  var isOnline = function() {
    return (navigator.onLine);
  };

  return {
    isMobile: isMobile,
    environment: environment,
    isOnline: isOnline,
    reloadEnvironment: reloadEnvironment
  };

})(COOL);
