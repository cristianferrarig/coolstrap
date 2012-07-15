###
 * Handles the <sections> , <articles> and <asides> to show
 *
 * @namespace COOLSTRAP
 * @class Navigate
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Navigate = ((cool) ->
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  CLASS = cool.Constants.CLASS
  ELEMENT = cool.Constants.ELEMENT
  TRIGGER = cool.Constants.TRIGGER
  TRANSITION = cool.Constants.TRANSITION
  COMMAND = cool.Constants.COMMAND
  _console = cool.Console
  _existsTarget = (target) ->
    exists = false
    if cool.dom(target).length > 0
      exists = true
    else
      _console.warn "Hey! Target doesnt exists: " + target
    exists

  _getHistoryLength = (container_id) ->
    cool.Navigate.History.size container_id

  _getHistoryCurrent = (container_id) ->
    cool.Navigate.History.current container_id

  section = (section_id) ->
    section_id = cool.Util.parseUrl(section_id)
    container_id = cool.dom(section_id).parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID)
    current = _getHistoryCurrent(container_id)
    target = ELEMENT.SECTION + section_id
    if current isnt section_id
      if _existsTarget(target)
        cool.dom(current).removeClass(CLASS.SHOW).addClass CLASS.HIDE
        cool.dom(target).addClass(CLASS.CURRENT).addClass(CLASS.SHOW).trigger TRIGGER.LOAD
        setTimeout (->
          cool.dom(current).removeClass CLASS.CURRENT
        ), TRANSITION.DURATION
        cool.Navigate.History.add
          section_id: section_id
          container_id: container_id
    else
      _console.warn "WTF! you are here!"

  article = (section_id, article_id) ->
    section_id = cool.Util.parseUrl(section_id)
    article_id = cool.Util.parseUrl(article_id)
    target = ELEMENT.SECTION + section_id + " " + ELEMENT.ARTICLE + article_id
    if _existsTarget(target)
      cool.dom(target).trigger TRIGGER.LOAD
      cool.View.Article.show section_id, article_id

  aside = (aside_id) ->
    aside_id = cool.Util.parseUrl(aside_id)
    target = ELEMENT.ASIDE + aside_id
    if _existsTarget(target)
      is_visible = cool.dom(target).hasClass(CLASS.CURRENT)
      if is_visible
        cool.View.Aside.hide aside_id
      else
        cool.View.Aside.show aside_id

  dialog = (dialog_id, options) ->
    target = ELEMENT.DIALOG + dialog_id
    dialog_command = undefined
    dialog_command = options  if typeof options is "string"
    if _existsTarget(target)
      if dialog_command and dialog_command is COMMAND.CLOSE_DIALOG
        cool.dom(target).trigger TRIGGER.UNLOAD
        cool.View.Dialog.close dialog_id
      else
        cool.dom(target).trigger TRIGGER.LOAD
        cool.View.Dialog.show dialog_id, options

  back = (container_id) ->
    if _getHistoryLength(container_id) > 1
      current_section = ELEMENT.SECTION + _getHistoryCurrent(container_id)
      cool.dom(current_section).removeClass(CLASS.SHOW).trigger TRIGGER.UNLOAD
      setTimeout (->
        cool.dom(current_section).removeClass CLASS.CURRENT
      ), TRANSITION.DURATION
      cool.Navigate.History.removeLast container_id
      cool.dom(_getHistoryCurrent(container_id)).addClass(CLASS.CURRENT).removeClass(CLASS.HIDE).addClass CLASS.SHOW
    else
      _console.warn "Hey! Nothing back"

  URL = (url, options) ->
    options = options or {}
    options.new_window = options.new_window or false
    if options.new_window
      window.open url
    else

  section: section
  article: article
  aside: aside
  dialog: dialog
  back: back
  URL: URL
)(COOLSTRAP)