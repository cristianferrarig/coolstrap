/**
 * Initialize the <section> element
 * Inspired by LungoJS
 *
 * @namespace COOL.Boot
 * @class Section
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Boot.Section = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var _console = coolstrap.Console; 

  /**
   * Initializes all <section>s of the project
   *
   * @method start
   */
  var start = function() {
    var sections = coolstrap.dom(ELEMENT.SECTION);
    _initFirstSection(sections);
    _initAllSections(sections);
  };

  var _initFirstSection = function(sections) {
    var first_section = sections.first();
    var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);
    first_section.addClass(CLASS.STARTING);
    first_section.addClass(CLASS.CURRENT);
    coolstrap.Router.History.add(first_section_id);
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
      //TODO: coolstrap.View.Article.showReferenceLinks(section_id, first_article_id);
  };

  return {
      start: start
  };

})(COOL);