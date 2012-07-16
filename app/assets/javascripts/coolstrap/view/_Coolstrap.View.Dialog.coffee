###
 * Initialize the <dialog> layout
 *
 * @namespace COOLSTRAP.View
 * @class Dialog
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.View.Dialog = ((cool) ->
  ELEMENT = cool.Constants.ELEMENT
  CLASS = cool.Constants.CLASS
  DIALOG = cool.Constants.DIALOG
  TRANSITION = cool.Constants.TRANSITION
  console = cool.Console
  _getPosition = (element) ->
    cool.dom.extend {}, (element.offset()),
      width: element[0].offsetWidth
      height: element[0].offsetHeight

  _getPositionFromSource = (source_pos, dialog_width, dialog_height, placement) ->
    dialog_pos = undefined
    switch placement
      when CLASS.BOTTOM
        dialog_pos =
          top: source_pos.top + source_pos.height
          left: source_pos.left + source_pos.width / 2 - dialog_width / 2
      when CLASS.TOP
        dialog_pos =
          top: source_pos.top - dialog_height
          left: source_pos.left + source_pos.width / 2 - dialog_width / 2
      when CLASS.LEFT
        dialog_pos =
          top: source_pos.top + source_pos.height / 2 - dialog_height / 2
          left: source_pos.left - dialog_width
      when CLASS.RIGHT
        dialog_pos =
          top: source_pos.top + source_pos.height / 2 - dialog_height / 2
          left: source_pos.left + source_pos.width
    dialog_pos.left = 0  if dialog_pos.left < 0
    dialog_pos.top = 0  if dialog_pos.top < 0
    dialog_pos

  _getPositionCenterOnScreen = (source_size) ->
    dialog_pos = undefined
    update = true
    environment = cool.Util.Platform.reloadEnvironment()
    screen_size = environment.screen
    dialog_pos =
      top: screen_size.height / 2 - source_size.height / 2
      left: screen_size.width / 2 - source_size.width / 2
      "margin-left": 0

    dialog_pos.left = 0  if dialog_pos.left < 0
    dialog_pos.top = 0  if dialog_pos.top < 0
    dialog_pos

  _preparePopover = (dialog, options) ->
    source_element = options.source_element
    dialog_pos = undefined
    if source_element
      options.placement = options.placement or source_element.data("placement")
      options.animation = options.animation or source_element.data("animation")
    else
      console.warn "WTF! you must set a source_element"
      return
    options.placement = options.placement or CLASS.RIGHT
    dialog.addClass CLASS.FADE_IN  if options.animation
    dialog.removeClass()
    dialog_pos = _getPositionFromSource(_getPosition(source_element), dialog[0].offsetWidth, dialog[0].offsetHeight, options.placement)
    dialog.css(dialog_pos).addClass options.placement

  _prepareAlert = (dialog, options) ->
    set_alert_position = ->
      dialog_pos = _getPositionCenterOnScreen(_getPosition(dialog))
      dialog.css dialog_pos

    set_alert_position()
    cool.dom(window).on "resize", ->
      set_alert_position()

  _prepareModal = (dialog, options) ->

  _prepareAction = (dialog, options) ->


  
  ###
   * Show dialog
   *
   * @method show
  ###
  show = (dialog_id, options) ->
    dialog = cool.dom(ELEMENT.DIALOG + dialog_id)
    dialog_type = dialog.data("type")
    options = options or {}
    switch dialog_type
      when DIALOG.MODAL
        _prepareModal dialog, options
      when DIALOG.ALERT
        _prepareAlert dialog, options
      when DIALOG.ACTION
        _prepareAction dialog, options
      when DIALOG.POPOVER
        _preparePopover dialog, options
    dialog.removeClass(CLASS.HIDE).addClass(CLASS.CURRENT).addClass CLASS.SHOW
  
  ###
     * Close dialog
     *
     * @method show
  ###
  close = (dialog_id) ->
    dialog = cool.dom(ELEMENT.DIALOG + dialog_id)
    dialog_type = dialog.data("type")
    dialog_animation = dialog.data("transition")
    dialog_animation = dialog_animation or "slideUp"  if dialog_type is DIALOG.ACTION
    dialog_animation = dialog_animation or "bounceOut"  if dialog_type is DIALOG.MODAL
    dialog.removeClass(CLASS.SHOW).addClass CLASS.HIDE
    unless dialog_animation
      dialog.removeClass CLASS.CURRENT
    else
      setTimeout (->
        dialog.removeClass CLASS.CURRENT
      ), TRANSITION.DURATION

  show: show
  close: close
)(COOLSTRAP)