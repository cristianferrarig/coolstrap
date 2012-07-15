###
 * Initialize the events for manage navigation
 *
 * @namespace COOLSTRAP.Framework
 * @class Navigation
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Framework.Navigation = ((cool, window) ->
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  CLASS = cool.Constants.CLASS
  ELEMENT = cool.Constants.ELEMENT
  TARGET = cool.Constants.TARGET
  TRANSITION = cool.Constants.TRANSITION
  COMMAND = cool.Constants.COMMAND
  SELECTORS =
    HREF_TARGET: "[role=\"main\"] a[href][data-target]"
    HREF_TARGET_FROM_ASIDE: "aside a[href][data-target]"

  console = cool.Console
  _goSection = (section_id) ->
    section_id = cool.Util.parseUrl(section_id)
    cool.Navigate.section section_id

  _goArticle = (element) ->
    section_id = cool.Navigate.History.current()
    article_id = element.attr(ATTRIBUTE.HREF)
    cool.Navigate.article section_id, article_id

  _goDialog = (element, close) ->
    dialog_id = element.attr(ATTRIBUTE.HREF)
    cool.Navigate.dialog dialog_id, close or source_element: element

  _hideAsideIfNecesary = (aside_id, link) ->
    target_id = link.attr(ATTRIBUTE.HREF)
    parent = cool.dom(target_id).parents(ELEMENT.ASIDE).first()
    return false  if target_id is aside_id
    if not parent or ("#" + parent.attr(ATTRIBUTE.ID) isnt aside_id and target_id isnt "#" + TARGET.BACK)
      cool.View.Aside.hide aside_id
      true

  _goAside = (element) ->
    aside_id = element.attr(ATTRIBUTE.HREF)
    current_aside = cool.dom(ELEMENT.ASIDE + "." + CLASS.CURRENT).first()
    hide_aside = false
    hide_aside = _hideAsideIfNecesary("#" + current_aside.attr(ATTRIBUTE.ID), element)  if current_aside
    if hide_aside
      setTimeout (->
        cool.Navigate.aside aside_id
      ), TRANSITION.DURATION
    else
      cool.Navigate.aside aside_id

  _goBack = (container_id) ->
    cool.Navigate.back container_id

  _selectTarget = (link) ->
    target_type = link.data(ATTRIBUTE.TARGET)
    link_container = link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID)
    switch target_type
      when TARGET.SECTION
        target_id = link.attr(ATTRIBUTE.HREF)
        _goSection target_id, link_container
      when TARGET.ARTICLE
        _goArticle link
      when TARGET.ASIDE
        _goAside link
      when TARGET.DIALOG
        _goDialog link
      when TARGET.BACK
        _goBack link_container
      when TARGET.CLOSE
        _goDialog link, COMMAND.CLOSE_DIALOG

  _loadTargetFromAside = (event) ->
    link = cool.dom(this)
    aside_id = "#" + link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID)
    target_type = link.data(ATTRIBUTE.TARGET)
    if target_type is TARGET.BACK or target_type is TARGET.CLOSE
      _selectTarget link
    else
      if target_type is TARGET.ARTICLE
        cool.dom(ELEMENT.ASIDE + aside_id + " " + SELECTORS.HREF_TARGET).removeClass CLASS.CURRENT
        link.addClass CLASS.CURRENT
      if _hideAsideIfNecesary(aside_id, link)
        setTimeout (->
          _selectTarget link
        ), TRANSITION.DURATION
      else
        _selectTarget link
    event.preventDefault()

  _loadTarget = (event) ->
    link = cool.dom(this)
    _selectTarget link
    event.preventDefault()

  
  ###
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method setup
   *
  ###

  setup = ->
    if typeof document.documentElement.ontouchstart isnt "undefined"
      cool.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap _loadTargetFromAside
      cool.dom(SELECTORS.HREF_TARGET).tap _loadTarget
    else
      cool.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).click _loadTargetFromAside
      cool.dom(SELECTORS.HREF_TARGET).click _loadTarget
    cool.Fallback.Android.buttons()
    cool.Navigate.History.setup()

  setup: setup
)(COOLSTRAP, window)