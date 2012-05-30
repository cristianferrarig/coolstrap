###
# Fallback to Android unexpected behaviors.
# Android Sucks!
#
# @namespace COOL.Fallback
# @class Android
#
# @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOL.Fallback.Android = ((cool) ->
  CLASS = cool.Constants.CLASS
  _enableElement = (element) ->
    element.removeAttr "disabled"

  _disableElement = (element) ->
    element.attr "disabled", "disabled"

  _addClassActive = (element) ->
    cool.dom(this).addClass CLASS.ACTIVE

  _removeClassActive = (element) ->
    cool.dom(this).removeClass CLASS.ACTIVE

  ###
  #   add active class to buttons when pressed
  #   @method buttons 
  ###
  buttons = ->
    environment = cool.Util.Platform.environment()
    if environment.isMobile and environment.os.name is "android"
      cool.dom(document.body).on "touchstart", ".button", _addClassActive
      cool.dom(document.body).on "touchend", ".button", _removeClassActive

  ###
  #   disable input elements
  #   @method inputs 
  ###
  inputs = (article_id, active) ->
    environment = cool.Util.Platform.environment()
    if environment.isMobile and environment.os.name is "android" and environment.os.version < "4"
      selector = article_id + " input, " + article_id + " textarea, " + article_id + " select"
      input_elements = cool.dom(selector)
      i = 0
      len = input_elements.length

      while i < len
        (if (active) then _enableElement(input_elements[i]) else _disableElement(input_elements[i]))
        i++

  buttons: buttons
  inputs: inputs
)(COOL)