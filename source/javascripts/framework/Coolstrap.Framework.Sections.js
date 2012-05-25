/**
 * Initialize all  <section> elements
 *
 * @namespace COOL.Framework
 * @class Sections
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Sections = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var _console = coolstrap.Console; 

  /**
   * Initializes all <section> element of the application
   *
   * @method setup
   */
  var setup = function() {
    var sections = coolstrap.dom(ELEMENT.SECTION);
    var asides = coolstrap.dom(ELEMENT.ASIDE);
    _initFirstSection(sections);
    _initAllSections(sections);
    _initAsideArticles(asides);
  };

  var _initFirstSection = function(sections) {
    var first_section = sections.first();
    var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);
    first_section.addClass(CLASS.CURRENT);
    coolstrap.Navigation.History.add({
      section_id: first_section_id, 
      replace_state: true
    });
  };

  var _initAllSections = function(sections) {
    for (var i = 0, len = sections.length; i < len; i++) {
      var section = coolstrap.dom(sections[i]);
      _initArticles(section);
    }
  };

  var _initArticles = function(section) {
    var first_article = section.children(ELEMENT.ARTICLE).first();
    first_article.addClass(CLASS.CURRENT);

    var first_article_id = first_article.attr(ATTRIBUTE.ID);
    var section_id = '#' + section.attr(ATTRIBUTE.ID);
  };

  var _initAsideArticles = function(asides) {
    for (var i = 0, len = asides.length; i < len; i++) {
      var aside = coolstrap.dom(asides[i]);
      _initArticles(aside);
    }
  };

  return {
    setup: setup
  };

})(COOL);