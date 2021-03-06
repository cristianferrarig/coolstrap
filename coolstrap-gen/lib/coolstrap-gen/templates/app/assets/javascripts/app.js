var App = (function(cool) {

  cool.App.init({
    name: 'Example',
    version: '1.0',
    resources: {
      sections: []
    }
  });

  var _getEnvironmentFromHelper = (function() {
    var environment = cool.Util.Platform.environment();
    if (environment.isMobile) {
      console.log('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
    }
  })();

})(COOLSTRAP);
