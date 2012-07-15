###
 * Initialize all  <section> elements
 *
 * @namespace COOLSTRAP.Framework
 * @class Sections
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Framework.Sections = ((cool) ->
  ELEMENT = cool.Constants.ELEMENT
  CLASS = cool.Constants.CLASS
  ATTRIBUTE = cool.Constants.ATTRIBUTE
  _initFirstSection = (sections) ->
    first_section = sections.first()
    first_section_id = "#" + first_section.attr(ATTRIBUTE.ID)
    first_section.addClass CLASS.CURRENT
    cool.Navigate.History.add
      section_id: first_section_id
      replace_state: true

  _initAllSections = (sections) ->
    i = 0
    len = sections.length

    while i < len
      section = cool.dom(sections[i])
      _initArticles section
      i++

  _initArticles = (section) ->
    first_article = section.children(ELEMENT.ARTICLE).first()
    first_article.addClass CLASS.CURRENT
    first_article_id = first_article.attr(ATTRIBUTE.ID)
    section_id = "#" + section.attr(ATTRIBUTE.ID)

  _initAsideArticles = (asides) ->
    i = 0
    len = asides.length

    while i < len
      aside = cool.dom(asides[i])
      _initArticles aside
      i++

  ### 
   * Initializes all <section> element of the application
   *
   * @method setup
  ###

  setup = ->
    sections = cool.dom(ELEMENT.SECTION)
    asides = cool.dom(ELEMENT.ASIDE)
    _initFirstSection sections
    _initAllSections sections
    _initAsideArticles asides

  setup: setup
)(COOLSTRAP)