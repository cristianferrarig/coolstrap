###
 * Initialize the <Aisde> layout
 *
 * @namespace COOLSTRAP.View
 * @class Aside
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.View.Aside = ((cool) ->
  ELEMENT = cool.Constants.ELEMENT
  CLASS = cool.Constants.CLASS
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  TRANSITION = cool.Constants.TRANSITION
  ###
     * Display an aside element
     *
     * @method show
     *
     * @param  {string} Aside id.
  ###
  show = (aside_id) ->
    aside = cool.dom(ELEMENT.ASIDE + aside_id)
    body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside)
    _initFirstSection aside
    cool.dom(ELEMENT.BODY).addClass(body_class).addClass CLASS.ASIDE
    aside.addClass CLASS.CURRENT

  _initFirstSection = (aside) ->
    aside_id = aside.attr(ATTRIBUTE.ID)
    sections = cool.dom("#" + aside_id + " " + ELEMENT.SECTION + "." + CLASS.CURRENT)
    section_to_show = sections.first()
    if not section_to_show or section_to_show.length is 0
      sections = cool.dom("#" + aside_id + " " + ELEMENT.SECTION)
      section_to_show = sections.first()
    section_id = "#" + section_to_show.attr(ATTRIBUTE.ID)
    section_to_show.addClass CLASS.CURRENT
    cool.Navigate.History.add
      section_id: section_id
      container_id: aside_id
      init_container: true
  ###
     * Hide an aside element
     *
     * @method hide
     *
     * @param  {string} Aside id.
  ###
  hide = (aside_id) ->
    aside = cool.dom(ELEMENT.ASIDE + aside_id)
    body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside)
    cool.dom(ELEMENT.BODY).removeClass(body_class).removeClass CLASS.ASIDE
    setTimeout (->
      current_aside = ELEMENT.ASIDE + aside_id + "." + CLASS.CURRENT
      cool.dom(current_aside).removeClass CLASS.CURRENT
    ), TRANSITION.DURATION
    cool.Navigate.History.clear aside_id

  _classFromAside = (aside) ->
    aside_class = aside.attr(ATTRIBUTE.CLASS)
    aside_class or ""

  show: show
  hide: hide
)(COOLSTRAP)