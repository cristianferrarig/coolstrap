/**
* Coolstrapp.App.js 
*/

STRAPP.App = (function(coolstrapp, undefined) {

  var default_config = {
    id: 1,
    name: 'coolstrapp',
    version: 0.9,
    icon: ''
  }; 

  var init = function(app_config) {
      default_config = coolstrapp.Core.extend(default_config, app_config);
      //coolstrapp.Boot(); // TODO: boot coolstrapp
  };

  var get = function(property) {
      return default_config[property];
  };

  return {
      init: init,
      get: get
  };

})(STRAPP);