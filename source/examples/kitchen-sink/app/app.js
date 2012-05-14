var App = (function(coolstrap, undefined) {

  coolstrap.App.init({
    name: 'Kitchen Sink',
    version: '1.0',
    log_level: coolstrap.Constants.LOG_LEVEL.DEBUG,
    resources: {
      sections: []
    }
  });

  var _getEnvironmentFromHelper = (function() {
    var environment = coolstrap.Core.environment();
    if (environment.isMobile) {
      alert('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
    }
  })();

  return {

  };

})(COOL);
