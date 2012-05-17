/**
 * Initialize the <articles> layout of a certain <section>
 * Inspired by LungoJS
 *
 * @namespace COOL.View
 * @class Article
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */


COOL.View.Article = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var TRIGGER = coolstrap.Constants.TRIGGER;

  var SELECTORS = {
      NAVIGATION_ITEM: 'a[href][data-target="article"]'
  };

  /**
   * Show section
   *
   * @method show
   */
  var show = function(section_id, article_id) {
    _toggleNavItems(section_id, article_id);
    _showContainer(section_id, article_id);
  };


  var _toggleNavItems = function(section_id, article_id) {
    var nav_items = coolstrap.dom(section_id + ' ' + SELECTORS.NAVIGATION_ITEM);
    nav_items.removeClass(CLASS.CURRENT);

    for (var i = 0, len = nav_items.length; i < len; i++) {
      var nav_item = coolstrap.dom(nav_items[i]);
      var nav_item_parsed_url = coolstrap.Core.parseUrl(nav_item.attr(ATTRIBUTE.HREF));

      if (nav_item_parsed_url === article_id) {
          nav_item.addClass(CLASS.CURRENT);
          _setTitle(section_id, nav_item);
      }
    }
  };

  var _showContainer = function(section_id, article_id) {
    var section_articles = section_id + ' ' + ELEMENT.ARTICLE + '.' + CLASS.CURRENT;
    var current_active_article_id = '#' + coolstrap.dom(section_articles).attr(ATTRIBUTE.ID);
    
    coolstrap.dom(section_articles).removeClass(CLASS.CURRENT).trigger(TRIGGER.UNLOAD);
    _fallbackAndroidInputs(current_active_article_id, false);
    coolstrap.dom(article_id).addClass(CLASS.CURRENT);
    _fallbackAndroidInputs(article_id, true);
  };

  var _fallbackAndroidInputs = function(article_id, enable){
    if (coolstrap.Fallback.Android) {
      coolstrap.Fallback.Android.inputs(article_id, enable);  
    }
  };

  var _setTitle = function(id, item) {
    var title = item.data(ATTRIBUTE.TITLE);

    if (title) {
      var section_title = id + ' header h1, ' + id + ' footer h1';
      coolstrap.dom(section_title).text(title);
    }
  };

  return {
    show: show
  };

})(COOL);