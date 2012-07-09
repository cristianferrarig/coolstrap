###
 * Coolstrapp Plugins
 * 
 * @namespace COOLSTRAP
 * @class Plugins
 * 
 * @author Cristian Ferrari <cristianferrarig@gmail.com> || @energettico
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
###

COOLSTRAP.Plugins = ((cool, document) ->
  # fn arg can be an object or a function, thanks to handleEvent
  # read more about the explanation at: http://www.thecssninja.com/javascript/handleevent
  addEvt = (el, evt, fn, bubble) ->
    if "addEventListener" of el
      # BBOS6 doesn't support handleEvent, catch and polyfill
      try
        el.addEventListener evt, fn, bubble
      catch e
        if typeof fn is "object" and fn.handleEvent
          el.addEventListener evt, ((e) ->
            # Bind fn as this and set first arg as event object
            fn.handleEvent.call fn, e
          ), bubble
        else
          throw e
    else if "attachEvent" of el
      # check if the callback is an object and contains handleEvent
      if typeof fn is "object" and fn.handleEvent
        el.attachEvent "on" + evt, ->
          # Bind fn as this
          fn.handleEvent.call fn
      else
        el.attachEvent "on" + evt, fn
  rmEvt = (el, evt, fn, bubble) ->
    if "removeEventListener" of el
      # BBOS6 doesn't support handleEvent, catch and polyfill
      try
        el.removeEventListener evt, fn, bubble
      catch e
        if typeof fn is "object" and fn.handleEvent
          el.removeEventListener evt, ((e) ->
            # Bind fn as this and set first arg as event object
            fn.handleEvent.call fn, e
          ), bubble
        else
          throw e
    else if "detachEvent" of el
      # check if the callback is an object and contains handleEvent
      if typeof fn is "object" and fn.handleEvent
        el.detachEvent "on" + evt, ->
          # Bind fn as this
          fn.handleEvent.call fn
      else
        el.detachEvent "on" + evt, fn
  hadTouchEvent = false
  
  ###
    * Fast Buttons  
    * fastButton is used to make instant responsive buttons, 
    * 300ms faster to be exact.
    *
    * new COOLSTRAP.Plugins.fastButton(document.getElementById('myBtn'), function() { // do something });
    *
    * Inspired by MBP
    * https://github.com/h5bp/mobile-boilerplate/blob/master/js/helper.js
  ###
  
  fastButton = (element, handler) ->
    @handler = handler
    if element.length and element.length > 1
      for singleElIdx of element
        @addClickEvent element[singleElIdx]
    else
      @addClickEvent element

  fastButton::handleEvent = (event) ->
    event = event or window.event
    switch event.type
      when "touchstart"
        @onTouchStart event
      when "touchmove"
        @onTouchMove event
      when "touchend"
        @onClick event
      when "click"
        @onClick event

  fastButton::onTouchStart = (event) ->
    element = event.srcElement
    event.stopPropagation()
    element.addEventListener "touchend", this, false
    document.body.addEventListener "touchmove", this, false
    @startX = event.touches[0].clientX
    @startY = event.touches[0].clientY
    element.style.backgroundColor = "rgba(0,0,0,.7)"

  fastButton::onTouchMove = (event) ->
    @reset element  if Math.abs(event.touches[0].clientX - @startX) > 10 or Math.abs(event.touches[0].clientY - @startY) > 10

  fastButton::onClick = (event) ->
    event = event or window.event
    element = event.srcElement
    event.stopPropagation()  if event.stopPropagation
    @reset event
    @handler.apply event.currentTarget, [ event ]
    preventGhostClick @startX, @startY  if event.type is "touchend"
    element.style.backgroundColor = ""

  fastButton::reset = (event) ->
    element = event.srcElement
    rmEvt element, "touchend", this, false
    rmEvt document.body, "touchmove", this, false
    element.style.backgroundColor = ""

  fastButton::addClickEvent = (element) ->
    addEvt element, "touchstart", this, false
    addEvt element, "click", this, false

  preventGhostClick = (x, y) ->
    coords.push x, y
    window.setTimeout (->
      coords.splice 0, 2
    ), 2500

  ghostClickHandler = (event) ->
    if not hadTouchEvent and "ontouchstart" of window
      ###
      This is a bit of fun for Android 2.3...
      If you change window.location via fastButton, a click event will fire
      on the new page, as if the events are continuing from the previous page.
      We pick that event up here, but coords is empty, because it's a new page,
      so we don't prevent it. Here's we're assuming that click events on touch devices
      that occur without a preceding touchStart are to be ignored.
      ###
      event.stopPropagation()
      event.preventDefault()
      return
    i = 0
    len = coords.length

    while i < len
      x = coords[i]
      y = coords[i + 1]
      if Math.abs(event.clientX - x) < 25 and Math.abs(event.clientY - y) < 25
        event.stopPropagation()
        event.preventDefault()
      i += 2

  document.addEventListener "click", ghostClickHandler, true  if document.addEventListener
  addEvt document.documentElement, "touchstart", (->
    hadTouchEvent = true
  ), false
  coords = []
  fastButton: fastButton
)(COOLSTRAP, document)