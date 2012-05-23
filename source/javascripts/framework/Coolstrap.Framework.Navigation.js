/**
 * Initialize the events for manage navigation
 * 
 * @namespace COOL.Framework
 * @class Navigation
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

//TODO: hide aside when hiden
//TODO: hide aside when load external section

COOL.Framework.Navigation = (function(coolstrap, window, undefined) {
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var CLASS = coolstrap.Constants.CLASS;
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var SELECTORS = {
      HREF_TARGET: 'a[href][data-target]',
      HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]'
  };
  var _console = coolstrap.Console; 

  /**
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method setup
   *
   */
  var setup = function() {
    if ('ontouchstart' in document.documentElement) {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);
    } else {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).click(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).click(_loadTarget);
    }
    if (coolstrap.Fallback.Android) {
      coolstrap.Fallback.Android.buttons();  
    } 
    coolstrap.Navigation.History.bindHashChange();
    
  };

  var _loadTargetFromAside = function(event) {
    var link = coolstrap.dom(this);
    var aside_id = '#' + link.parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    if (link.data(ATTRIBUTE.TARGET) === ELEMENT.ARTICLE) {
        coolstrap.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
        link.addClass(CLASS.CURRENT);
    }
    _hideAsideIfNecesary(aside_id);
  };

  var _loadTarget = function(event) {
    var link = coolstrap.dom(this);
    _selectTarget(link);

    event.preventDefault();
     
  };

  var _selectTarget = function(link) {
    var target_type = link.data(ATTRIBUTE.TARGET);
    var link_container = link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    switch(target_type) {
      case ELEMENT.SECTION:
        var target_id = link.attr(ATTRIBUTE.HREF);
        _goSection(target_id, link_container);
        break;

      case ELEMENT.ARTICLE:
        _goArticle(link);
        break;

      case ELEMENT.ASIDE:
        _goAside(link);
        break;
    }
  };

  var _goSection = function(id, container_id) {
    id = coolstrap.Core.parseUrl(id);
    if (id === '#back') {  
      coolstrap.Navigation.back(container_id);
      coolstrap.Navigation.History.historyBack();
    } else {
      coolstrap.Navigation.section(id);
    }
  };

  var _goArticle = function(element) {
    var section_id = coolstrap.Navigation.History.current();
    var article_id =  element.attr(ATTRIBUTE.HREF);

    coolstrap.Navigation.article(section_id, article_id);
  };

  var _goAside = function(element) {
    var section_id = coolstrap.Navigation.History.current();
    var aside_id = element.attr(ATTRIBUTE.HREF);

    coolstrap.Navigation.aside(section_id, aside_id);
  };

  var _hideAsideIfNecesary = function(aside_id) {
    if (window.innerWidth < 768) {
      coolstrap.View.Aside.hide(aside_id);
    }
  };

  return {
    setup: setup
  };

})(COOL, window);