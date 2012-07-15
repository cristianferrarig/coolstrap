###
 * Initialize all div[role=dialog] element 
 *
 * @namespace COOLSTRAP.Framework
 * @class Dialogs
 *
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Framework.Dialogs = ((cool) ->
  ELEMENT = COOLSTRAP.Constants.ELEMENT
  _initElement = (selector, callback) ->
    found_elements = cool.dom(selector)
    i = undefined
    i = 0
    len = found_elements.length

    while i < len
      element = cool.dom(found_elements[i])
      cool.Util.Core.execute callback, element
      i++

  _initDialog = (element) ->
  ###
   * Setup all dialog elements
   *
   * @method setup
  ###
  setup = ->
    _initElement ELEMENT.DIALOG, _initDialog

  setup: setup
)(COOLSTRAP)