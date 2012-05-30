/**
 * Initialize all  <section> elements
 *
 * @namespace COOL.Framework
 * @class Sections
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Framework.Sections = (function(cool) {

  var ELEMENT = cool.Constants.ELEMENT;
  var CLASS = cool.Constants.CLASS;
  var ATTRIBUTE = cool.Constants.ATTRIBUTE;
  
  var _initFirstSection = function(sections) {
    var first_section = sections.first();
    var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);
    first_section.addClass(CLASS.CURRENT);
    cool.Navigation.History.add({
      section_id: first_section_id, 
      replace_state: true
    });
  };

  var _initAllSections = function(sections) {
    for (var i = 0, len = sections.length; i < len; i++) {
      var section = cool.dom(sections[i]);
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
      var aside = cool.dom(asides[i]);
      _initArticles(aside);
    }
  };


  /**
   * Initializes all <section> element of the application
   *
   * @method setup
   */
  var setup = function() {
    var sections = cool.dom(ELEMENT.SECTION);
    var asides = cool.dom(ELEMENT.ASIDE);
    _initFirstSection(sections);
    _initAllSections(sections);
    _initAsideArticles(asides);
  };

  return {
    setup: setup
  };

})(COOL);