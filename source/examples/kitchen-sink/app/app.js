var App = (function(coolstrapp, undefined) {

  coolstrapp.App.init({
    name: 'Kitchen Sink',
    version: '1.0',
    resources: {
<<<<<<< HEAD
      sections: []
=======
        sections: []
>>>>>>> framework structure first commit
    }
  });

  var _getEnvironmentFromHelper = (function() {
    var environment = coolstrapp.Core.environment();
    if (environment.isMobile) {
      alert('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
    }
  })();

  return {

  };

<<<<<<< HEAD
})(STRAPP);
=======
})(STRAPP);
>>>>>>> framework structure first commit
