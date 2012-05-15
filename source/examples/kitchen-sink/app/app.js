
var logger = COOL.Console;

var App = (function(coolstrap, undefined) {
  

  coolstrap.App.init({
    name: 'Kitchen Sink',
    version: '1.0',
    resources: {
      sections: []
    }
  });
  
  var _getEnvironmentFromHelper = (function() {
    var environment = coolstrap.Core.environment();
    if (environment.isMobile) {
      logger.info('Your phone is '  + environment.os.name + ' (' + environment.os.version + ')');
    } else {
      logger.info('youre in web environment');
    }

  })();

  return {
 
  };

})(COOL);

