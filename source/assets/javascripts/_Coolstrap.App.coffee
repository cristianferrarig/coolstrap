###
 * Coolstrapp Application
 * Inspired by LungoJs
 * 
 * @namespace COOLSTRAP
 * @class App
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
###

COOLSTRAP.App = ((cool) ->
  _sessionId = undefined
  _launchOptions =
    name: "coolstrap"
    log_level: -1

  _setupFramework = ->
    cool.Framework.Sections.setup()
    cool.Framework.Articles.setup()
    cool.Framework.Navigation.setup()

  _generateSID = ->
    _sessionId = "123456"

  init = (launch_options) ->
    _launchOptions = cool.Util.Core.extend(_launchOptions, launch_options)
    _setupFramework()
    _generateSID()

  init: init
  launchOptions: _launchOptions
  sessionId: _sessionId
)(COOLSTRAP)