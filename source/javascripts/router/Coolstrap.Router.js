/**
 * Handles the <sections> , <articles> and <asides> to show
 * Inspired by LungoJS
 *
 * @namespace COOL
 * @class Router
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 *
 */
//TODO: Navigation History between sections in Aside. We can !

COOL.Router = (function(coolstrap, undefined) {

  var CLASS = coolstrap.Constants.CLASS;
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var ERROR = coolstrap.Constants.ERROR;
  var TRIGGER = coolstrap.Constants.TRIGGER;
  var DURATION = coolstrap.Constants.TRANSITION.DURATION
  var _console = coolstrap.Console; 

  /**
   * Navigate to a <section>.
   *
   * @method section
   *
   * @param {string} Id of the <section>
   */
  var section = function(section_id) {

    var section_id = coolstrap.Core.parseUrl(section_id);
    var current = _getHistoryCurrent();
    var target = ELEMENT.SECTION + section_id;
    if(current != section_id) {
      if (_existsTarget(target)) {
        coolstrap.dom(current).removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
        coolstrap.dom(target).addClass(CLASS.CURRENT).addClass(CLASS.SHOW).trigger(TRIGGER.LOAD);
        setTimeout(function(){
          coolstrap.dom(current).removeClass(CLASS.CURRENT)
        }, DURATION)
        coolstrap.Router.History.add(section_id);
      }    
    } else {
      _console.warn('WTF! you are here!');
    }
    
  };

  /**
   * Displays the <article> in a particular <section>.
   *
   * @method article
   *
   * @param {string} <section> Id
   * @param {string} <article> Id
   */
  var article = function(section_id, article_id) {
    var section_id = coolstrap.Core.parseUrl(section_id);
    var article_id = coolstrap.Core.parseUrl(article_id);
    var target = ELEMENT.SECTION + section_id + ' ' + ELEMENT.ARTICLE + article_id;

    if (_existsTarget(target)) {
      coolstrap.dom(target).trigger(TRIGGER.LOAD);
      coolstrap.View.Article.show(section_id, article_id);
    }  
  };

  /**
   * Displays the <aside> in a particular <section>.
   *
   * @method aside
   *
   * @param {string} <section> Id Not used yet
   * @param {string} <aside> Id
   */
  var aside = function(section_id, aside_id) {
    var aside_id = coolstrap.Core.parseUrl(aside_id);
    var target = ELEMENT.ASIDE + aside_id;

    if (_existsTarget(target)) {
      var is_visible = coolstrap.dom(target).hasClass(CLASS.CURRENT);
      if (is_visible) {
        coolstrap.View.Aside.hide(aside_id);
      } else {
        coolstrap.View.Aside.show(aside_id);
      }
    }
  };

  /**
   * Return to previous section.
   *
   * @method back
   */
  var back = function() {
    if (_getHistoryLength() > 1) {
      var current_section = ELEMENT.SECTION + _getHistoryCurrent();
      coolstrap.dom(current_section).removeClass(CLASS.SHOW).trigger(TRIGGER.UNLOAD);
      setTimeout(function(){
        coolstrap.dom(current_section).removeClass(CLASS.CURRENT)
      }, DURATION)
      coolstrap.Router.History.removeLast();
      coolstrap.dom(_getHistoryCurrent()).addClass(CLASS.CURRENT).removeClass(CLASS.HIDE).addClass(CLASS.SHOW);
    } else {
      _console.warn('Hey! Nothing back');
    }
  };

  var _existsTarget = function(target) {
    var exists = false;

    if (coolstrap.dom(target).length > 0) {
      exists = true;
    } else {
      coolstrap.Console.log(ERROR.ROUTER + target);
    }

    return exists;
  };

  var _getHistoryLength = function(){
    return coolstrap.Router.History.stackLength();
  };

  var _getHistoryCurrent = function() {
    return coolstrap.Router.History.current();
  };

  return {
    section: section,
    article: article,
    aside: aside,
    back: back
  };

})(COOL);