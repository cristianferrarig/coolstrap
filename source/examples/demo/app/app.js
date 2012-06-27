var App = (function(cool) {

  cool.App.init({
    name: 'Kitchen Sink',
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


  var queryUrl = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20twitter.search%20WHERE%20q%3D'afp%20habitat'&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

  $.getJSON(queryUrl, function (yql) {
    if (yql.query.count > 0) {
      console.log(yql.query.results.results)
      $('#twitterlist').empty();
      yql.query.results.results.forEach(function(twit){
        var date = new Date(twit.created_at);
        var template = '<li>\
          <div class="aside up"><div class="picture" style="background-image:url(' + twit.profile_image_url + ')"></div>\
            </div>\
              <div class="content">\
                <div class="nested">\
                  <h1>'+twit.from_user_name+'<span>@'+twit.from_user+'</span></h1>\
                  <div class="meta">'+date.getHours() + ':' +date.getMinutes() +'</div>\
              </div>\
              <div class="nested">\
                <div class="content">\
                  <p>' + twit.text + '</p>\
                </div>\
              </div>\
            </div>\
          </li>';
        
        $('#twitterlist').append($(template));
        

      });
    }
  });


  return {

  };

})(COOLSTRAP);
