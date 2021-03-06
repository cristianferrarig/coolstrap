###
 * Initialize the <articles> layout of a certain <section>
 * Inspired by LungoJS
 *
 * @namespace COOLSTRAP.View
 * @class Section
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###


COOLSTRAP.View.Section = ((cool) ->
  ELEMENT = cool.Constants.ELEMENT
  CLASS = cool.Constants.CLASS
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  TRIGGER = cool.Constants.TRIGGER
  TRANSITION = cool.Constants.TRANSITION
  SELECTORS = NAVIGATION_ITEM: "a[href][data-target=\"section\"]"
  
  _showContainer = (section_id) ->
    section_id = cool.Util.parseUrl(section_id)
    target = ELEMENT.SECTION + section_id    
    container_id = cool.dom(section_id).parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID)
    current = cool.Navigate.History.current container_id #_getHistoryCurrent(container_id)
    cool.dom(current).removeClass(CLASS.SHOW).addClass CLASS.HIDE
    cool.dom(target).addClass(CLASS.CURRENT).addClass(CLASS.SHOW).trigger TRIGGER.LOAD
    setTimeout (->
      cool.dom(current).removeClass CLASS.CURRENT
    ), TRANSITION.DURATION
    cool.Navigate.History.add
      section_id: section_id
      container_id: container_id
          
  ###
     * Show section
     *
     * @method show
  ###
  show = (section_id) ->
    _showContainer section_id 

  show: show
)(COOLSTRAP)
