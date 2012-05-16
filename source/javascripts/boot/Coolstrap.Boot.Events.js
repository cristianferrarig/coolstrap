/**
 * Initialize the automatic DOM UI events
 * Inspired By LungoJS
 * 
 * @namespace COOL.Boot
 * @class Events
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Boot.Events = (function(coolstrap, undefined) {
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
   * @method start
   *
   */
  var start = function() {
    var touch_move_event  = 'touchmove';
    var resize = 'resize';

    if ('ontouchstart' in document.documentElement) {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);
    } else {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).click(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).click(_loadTarget);
    }
    
    coolstrap.Fallback.Android.buttons();
  };

  
  //TODO: Event _loadTargetFromAside
  var _loadTargetFromAside = function(event) {
   
      var link = coolstrap.dom(this);
      var aside_id = '#' + link.parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
      var section_id = '#' + coolstrap.dom('section.current').first().attr(ATTRIBUTE.ID);

      if (link.data(ATTRIBUTE.TARGET) === ELEMENT.ARTICLE) {
          coolstrap.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
          link.addClass(CLASS.CURRENT);
      }
      _hideAsideIfNecesary(section_id, aside_id);
  };

  var _loadTarget = function(event) {
    var link = coolstrap.dom(this);
    _selectTarget(link);

    event.preventDefault();
     
  };

  var _selectTarget = function(link) {
    var target_type = link.data(ATTRIBUTE.TARGET);

    switch(target_type) {
      case ELEMENT.SECTION:
        var target_id = link.attr(ATTRIBUTE.HREF);
        _goSection(target_id);
        break;

      case ELEMENT.ARTICLE:
        _goArticle(link);
        break;

      case ELEMENT.ASIDE:
        _goAside(link);
        break;
    }
  };

  var _goSection = function(id) {
    id = coolstrap.Core.parseUrl(id);
    _console.debug('_goSection ' + id);
    if (id === '#back') {
      coolstrap.Router.back();
    } else {
      coolstrap.Router.section(id);
    }
  };

  var _goArticle = function(element) {
    var section_id = coolstrap.Router.History.current();
    var article_id =  element.attr(ATTRIBUTE.HREF);

    coolstrap.Router.article(section_id, article_id);
  };

  var _goAside = function(element) {
    var section_id = coolstrap.Router.History.current();
    var aside_id = element.attr(ATTRIBUTE.HREF);

    coolstrap.Router.aside(section_id, aside_id);
  };

  //TODO:  _hideAsideIfNecesary
  var _hideAsideIfNecesary = function(section_id, aside_id) {
    if (window.innerWidth < 768) {
      coolstrap.View.Aside.hide(section_id, aside_id);
    }
  };

  return {
    start: start
  };

})(COOL);