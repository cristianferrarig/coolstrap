###
 * Initialize all <article> element in sections
 *
 * @namespace COOLSTRAP.Framework
 * @class Articles
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Framework.Articles = ((cool) ->
  SCROLLABLE_CLASS = cool.Constants.CLASS.SCROLLABLE
  _initElement = (selector, callback) ->
    found_elements = cool.dom(selector)
    i = 0
    len = found_elements.length

    while i < len
      element = cool.dom(found_elements[i])
      cool.Util.Core.execute callback, element
      i++

  _initScroller = (element) ->
    cool.View.Scroll.init element
  
  ###
     * Setup the elements of an article
     *
     * @method setup
  ###
  setup = ->
    _initElement "." + SCROLLABLE_CLASS, _initScroller

  setup: setup
)(COOLSTRAP)