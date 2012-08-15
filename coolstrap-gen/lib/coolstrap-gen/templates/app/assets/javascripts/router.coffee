AppRouter = Backbone.Router.extend(
  routes:
    "": "index"
    "index": "index"
    "main/:section": "main"
    "section/:section": "section"

  index: ->
    alert "Welcome to coolstrap!!!"
    #COOLSTRAP.Navigate.section("#user_all")
    @navigate "main/home", trigger: true

  main: (section) ->
    console.log "look url!!! press back!"
    @navigate "section/user_all", trigger: true
    #COOLSTRAP.Navigate.section("#user_all");
    console.log "main method executed #{section}."

  section: (section) ->
    console.log "section method executed #{section}."
    COOLSTRAP.Navigate.section "##{section}"
)

window.router = new AppRouter

Backbone.history.start
  silent: true
  pushState: true

#router.navigate "index", trigger: true
