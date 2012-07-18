###
 * Coolstrap UI Utils functions
 * 
 * @namespace COOLSTRAP.Util
 * @class UI
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 *
###

COOLSTRAP.Util.UI = ((cool) ->
  VIEWPORT_META = document.querySelector and document.querySelector("meta[name=\"viewport\"]")
  
  ###  
    * Normalized hide address bar for iOS & Android
    * (c) Scott Jehl, scottjehl.com
    * MIT License
    *
    * If we split this up into two functions we can reuse
    * this function if we aren't doing full page reloads.
    * If we cache this we don't need to re-calibrate everytime we call
    * the hide url bar
    *
    * So we don't redefine this function everytime we call hideUrlBar
    * Inspired by MBP Helper
  ###
  hideNavigationBar = ->
    _window = window
    _document = _window.document
    if not location.hash or not _window.addEventListener
      _window.scrollTo 0, 1
      scrollTop = 1
      # reset to 0 on bodyready, if needed
      bodycheck = setInterval(->
        if _document.body
          clearInterval bodycheck
          scrollTop = (if "scrollTop" of _document.body then _document.body.scrollTop else 1)
          _window.scrollTo 0, (if scrollTop is 1 then 0 else 1)
      , 15)
      _window.addEventListener "load", (->
        setTimeout (->
          _window.scrollTo 0, (if scrollTop is 1 then 0 else 1)
        ), 0
      ), false


  ###
    * Autogrow  
    * http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
    *
  ###
  autogrow = (element, lh) ->
    handler = (e) ->
      newHeight = @scrollHeight
      currentHeight = @clientHeight
      @style.height = newHeight + 3 * textLineHeight + "px"  if newHeight > currentHeight
    setLineHeight = (if (lh) then lh else 12)
    textLineHeight = (if element.currentStyle then element.currentStyle.lineHeight else getComputedStyle(element, null).lineHeight)
    textLineHeight = (if (textLineHeight.indexOf("px") is -1) then setLineHeight else parseInt(textLineHeight, 10))
    element.style.overflow = "hidden"
    (if element.addEventListener then element.addEventListener("keyup", handler, false) else element.attachEvent("onkeyup", handler))


  ###
      * Enable active
      *
      * Enable CSS active pseudo styles in Mobile Safari
      * http://miniapps.co.uk/blog/post/enable-css-active-pseudo-styles-in-mobile-safari/
  ###
  enableActive = ->
    document.addEventListener "touchstart", (->
    ), false

  ### 
    * Prevent iOS from zooming onfocus
    *
    * https://github.com/h5bp/mobile-boilerplate/pull/108
  ###
  preventZoom = ->
    formFields = document.querySelectorAll("input, select, textarea")
    contentString = "width=device-width,initial-scale=1,maximum-scale="
    i = 0
    i = 0
    while i < formFields.length
      formFields[i].onfocus = ->
        VIEWPORT_META.content = contentString + "1"

      formFields[i].onblur = ->
        VIEWPORT_META.content = contentString + "10"
      i++

  hideNavigationBar: hideNavigationBar
  autogrow: autogrow
  enableActive: enableActive
  preventZoom: preventZoom
)(COOLSTRAP)
