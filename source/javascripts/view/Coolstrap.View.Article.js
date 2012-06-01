/**
 * Initialize the <articles> layout of a certain <section>
 * Inspired by LungoJS
 *
 * @namespace COOLSTRAP.View
 * @class Article
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */


COOLSTRAP.View.Article = (function(cool) {

  var ELEMENT = cool.Constants.ELEMENT;
  var CLASS = cool.Constants.CLASS;
  var ATTRIBUTE = cool.Constants.ATTRIBUTE;
  var TRIGGER = cool.Constants.TRIGGER;

  var SELECTORS = {
      NAVIGATION_ITEM: 'a[href][data-target="article"]'
  };

  var _showContainer = function(section_id, article_id) {
    var section_articles = section_id + ' ' + ELEMENT.ARTICLE + '.' + CLASS.CURRENT;
    var current_active_article_id = '#' + cool.dom(section_articles).attr(ATTRIBUTE.ID);
    cool.dom(section_articles).removeClass(CLASS.CURRENT).trigger(TRIGGER.UNLOAD);
    _fallbackAndroidInputs(current_active_article_id, false);
    cool.dom(article_id).addClass(CLASS.CURRENT);
    _fallbackAndroidInputs(article_id, true);
  };

  var _fallbackAndroidInputs = function(article_id, enable) {
    if (cool.Fallback.Android) {
      cool.Fallback.Android.inputs(article_id, enable);
    }
  };

  var _setTitle = function(id, item) {
    var title = item.attr(ATTRIBUTE.TITLE);
    if (title) {
      var section_title = id + ' header h1, ' + id + ' footer h1';
      cool.dom(section_title).text(title);
    }
  };

  /**
   * Show section
   *
   * @method show
   */
  var show = function(section_id, article_id) {
    _showContainer(section_id, article_id);
  };

  return {
    show: show
  };

})(COOLSTRAP);
