###
# Fallback to iOS unexpected behaviors.
#
# @namespace COOL.Fallback
# @class iOS
#
# @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOL.Fallback.iOS = ((cool, document) ->
  VIEWPORT_META = document.querySelector and document.querySelector("meta[name=\"viewport\"]")

  ###
  # fix for iPhone viewport scale bug
  # http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
  # 
  # @method scaleFix 
  ###
  scaleFix = ->
    env = cool.Util.Platform.environment()
    _gestureStart = ->
      VIEWPORT_META.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"

    if VIEWPORT_META and (env.isMobile and env.os.name is "ios")
      VIEWPORT_META.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0"
      document.addEventListener "gesturestart", _gestureStart, false

  scaleFix: scaleFix
)(COOL, document)