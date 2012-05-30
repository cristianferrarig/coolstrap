/**
 * Coolstrapp Application
 * Inspired by LungoJs
 * 
 * @namespace COOL
 * @class App
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOL.App = (function(cool) {

  var default_config = {
    id: 1,
    name: 'coolstrap',
    log_level: -1
  }; 

  var _setupFramework = function(){
    cool.Framework.Sections.setup(); 
    cool.Framework.Articles.setup();  
    cool.Framework.Navigation.setup(); 
  }; 

  var init = function(app_config) {
    default_config = cool.Util.Core.extend(default_config, app_config);      
    _setupFramework();
  };

  var get = function(property) {
    return default_config[property];
  };
  
  return {
    init: init,
    get: get 
  };

})(COOL);