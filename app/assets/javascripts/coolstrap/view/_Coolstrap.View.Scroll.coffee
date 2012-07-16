###
 * Wrapper of the third library iScroll
 * Inspired by LungoJS
 *
 * @namespace COOLSTRAP.View
 * @class Scroll
 * @requires iScroll
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.View.Scroll = ((cool) ->
  CLASS = cool.Constants.CLASS
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  ERROR = cool.Constants.ERROR
  EXCLUDE_ELEMENT = "p"
  DEFAULT_PROPERTIES =
    hScroll: false
    vScroll: false
    useTransition: true
    momentum: true
    lockDirection: true
    fixedScrollbar: true
    fadeScrollbar: true
    hideScrollbar: true

  SCROLLS = {}
  SCROLL_TIMEFRAME = 250
  NOID_COUNTER = 0
  _preventEditInputs = (e) ->
    target = e.target
    target = target.parentNode  until target.nodeType is 1
    e.preventDefault()  if target.tagName isnt "SELECT" and target.tagName isnt "INPUT" and target.tagName isnt "TEXTAREA"
  
  ###
       * Creates a new iScroll element.
       *
       * @method init
       *
       * @param {dom} element of the container scroll.
       * @param {object} [OPTIONAL] Properties
  ###
  init = (element, properties) ->
    scroll_id = element.attr(ATTRIBUTE.ID)
    if not scroll_id or scroll_id is ""
      NOID_COUNTER++
      scroll_id = CLASS.SCROLLABLE + NOID_COUNTER
      element.attr ATTRIBUTE.ID, scroll_id
    if element.children().length > 1 or element.children().length is 0
      inner_html = element.html()
      inner_element = cool.dom("<div class=\"scroll_container\"></div>")
      inner_element.append inner_html
      element.html inner_element
    if scroll_id
      _render scroll_id, properties
    else
      cool.Console.log ERROR.CREATE_SCROLL


  ###
     * Update iScroll element with new <markup> content.
     *
     * @method html
     *
     * @param {string} Id of the container scroll.
     * @param {string} Markup content
  ###
  html = (id, content) ->
    container = _getContainer(id)
    container.html content
    _render id


  ###
     * Add <markup> content to iScroll instance
     *
     * @method append
     *
     * @param {string} Id of the container scroll.
     * @param {string} Markup content
  ###
  append = (id, content) ->
    container = _getContainer(id)
    container.append content
    _render id



  ###
     * Refresh iScroll instance.
     *
     * @method refresh
     *
     * @param {string} Id of the container scroll.
     * @param {object} [OPTIONAL] Properties
  ###
  refresh = (id, properties) ->
    _render id, properties
  
  ###
     * Removes iScroll instance.
     *
     * @method remove
     *
     * @param {string} Id of the container scroll.
  ###
  remove = (id) ->
    delete SCROLLS[id]  if SCROLLS[id]


  ###
     * Scrolls the wrapper contents to the minimum x/y coordinates
     *
     * @method first
     *
     * @param {string} Id of the <section>
  ###
  first = (id) ->
    SCROLLS[id].scrollTo 0, 0, SCROLL_TIMEFRAME  if SCROLLS[id]

  ###
     * Scrolls the wrapper contents to the maximum x/y coordinate
     *
     * @method down
     *
     * @param {string} Id of the <section>
  ###
  last = (id) ->
    scroll = SCROLLS[id]
    if scroll
      element = cool.dom("#" + id).first()
      content_width = 0
      content_height = 0
      if _isHorizontal(element)
        content_width = -(_sizeProperty(element, ATTRIBUTE.WIDTH))
      else
        content_height = -(_sizeProperty(element, ATTRIBUTE.HEIGHT))
      scroll.scrollTo content_width, content_height, SCROLL_TIMEFRAME

  _getContainer = (id) ->
    scroll = cool.dom("#" + id)
    container = scroll.children().first()
    if container.length is 0
      scroll.html "<div></div>"
      container = scroll.children().first()
    container

  _sizeProperty = (element, property) ->
    element_content = element.children().first()
    element_content[property]() - element[property]()

  _render = (id, properties) ->
    scroll = cool.dom("#" + id)
    properties = _mixProperties(scroll, properties)
    _saveScrollInCache id, properties

  _needScroll = (scroll, properties) ->
    element = scroll[0]
    is_horizontal = _isHorizontal(cool.dom(element))
    if is_horizontal
      element.clientWidth < element.scrollWidth
    else
      element.clientHeight < element.scrollHeight

  _saveScrollInCache = (id, properties) ->
    unless SCROLLS[id]
      SCROLLS[id] = new iScroll(id, properties)
    else
      SCROLLS[id].refresh()

  _mixProperties = (scroll, properties) ->
    scroll_type = (if _isHorizontal(scroll) then "hScroll" else "vScroll")
    properties or (properties = {})
    properties[scroll_type] = true
    properties = cool.Util.Core.extend(DEFAULT_PROPERTIES, properties)
    properties = cool.Util.Core.extend(properties,
      onBeforeScrollStart: _preventEditInputs
    )
    properties

  _isHorizontal = (scroll) ->
    (if (scroll.hasClass(CLASS.HORIZONTAL)) then true else false)

  init: init
  remove: remove
  refresh: refresh
  html: html
  append: append
  first: first
  last: last
)(COOLSTRAP)