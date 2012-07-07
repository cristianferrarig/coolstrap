###
 * Initialize the <articles> layout of a certain <section>
 * Inspired by LungoJS
 *
 * @namespace COOLSTRAP.View
 * @class Article
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###


COOLSTRAP.View.Article = ((cool) ->
  ELEMENT = cool.Constants.ELEMENT
  CLASS = cool.Constants.CLASS
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  TRIGGER = cool.Constants.TRIGGER
  SELECTORS = NAVIGATION_ITEM: "a[href][data-target=\"article\"]"
  _showContainer = (section_id, article_id) ->
    section_articles = section_id + " " + ELEMENT.ARTICLE + "." + CLASS.CURRENT
    current_active_article_id = "#" + cool.dom(section_articles).attr(ATTRIBUTE.ID)
    cool.dom(section_articles).removeClass(CLASS.CURRENT).trigger TRIGGER.UNLOAD
    _fallbackAndroidInputs current_active_article_id, false
    cool.dom(article_id).addClass CLASS.CURRENT
    _fallbackAndroidInputs article_id, true

  _fallbackAndroidInputs = (article_id, enable) ->
    cool.Fallback.Android.inputs article_id, enable  if cool.Fallback.Android

  _setTitle = (id, item) ->
    title = item.attr(ATTRIBUTE.TITLE)
    if title
      section_title = id + " header h1, " + id + " footer h1"
      cool.dom(section_title).text title
  ###
     * Show section
     *
     * @method show
  ###
  show = (section_id, article_id) ->
    _showContainer section_id, article_id

  show: show
)(COOLSTRAP)
