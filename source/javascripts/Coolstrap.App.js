/**
 * Coolstrapp Application
 * Inspired by LungoJs
 * 
 * @namespace COOLSTRAP
 * @class App
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOLSTRAP.App = (function(cool) {
  var _sessionId;
  var _launchOptions = {
    name: 'coolstrap',
    log_level: -1
  }; 

  var _setupFramework = function(){
    cool.Framework.Sections.setup(); 
    cool.Framework.Articles.setup();  
    cool.Framework.Navigation.setup(); 
  }; 

  var _generateSID = function(){
    _sessionId = '123456'
  }

  var init = function(launch_options) {
    _launchOptions = cool.Util.Core.extend(_launchOptions, launch_options);      
    _setupFramework();
    _generateSID();
  };

  return {
    init: init,
    launchOptions: _launchOptions,
    sessionId: _sessionId
  };

})(COOLSTRAP);