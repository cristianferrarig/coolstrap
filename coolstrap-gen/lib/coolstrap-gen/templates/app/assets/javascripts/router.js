var AppRouter = Backbone.Router.extend({

  routes: {
    "": "index",
		"index": "index",
		"main/home": "other"
  },
  
  index: function() {
		alert("Welcome to coolstrap!!!");
		this.navigate("main/home", {trigger: true});
	},
	other: function(){
		alert("look url!!! press back!");
	}

  
});

router = new AppRouter

Backbone.history.start({silent:true, pushState:true});

router.navigate("index", {trigger: true});