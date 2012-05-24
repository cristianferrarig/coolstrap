/**
 * Handles the <sections> , <articles> and <asides> to show
 *
 * @namespace COOL
 * @class Navigation
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 *
 */
//TODO: Navigation History between sections in Aside. We can !

COOL.Navigation = (function(coolstrap, undefined) {

  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var CLASS = coolstrap.Constants.CLASS;
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var ERROR = coolstrap.Constants.ERROR;
  var TRIGGER = coolstrap.Constants.TRIGGER;
  var TRANSITION = coolstrap.Constants.TRANSITION.DURATION
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
    var container_id = coolstrap.dom(section_id).parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    var current = _getHistoryCurrent(container_id);
    var target = ELEMENT.SECTION + section_id;
    if(current != section_id) {
      if (_existsTarget(target)) {
        coolstrap.dom(current).removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
        coolstrap.dom(target).addClass(CLASS.CURRENT).addClass(CLASS.SHOW).trigger(TRIGGER.LOAD);
        setTimeout(function(){
          coolstrap.dom(current).removeClass(CLASS.CURRENT)
        }, TRANSITION.DURATION)
        coolstrap.Navigation.History.add(section_id, container_id);
        coolstrap.Navigation.History.pushState(section_id, container_id, 'section');
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
        coolstrap.Navigation.History.historyBack();
      } else {
        coolstrap.View.Aside.show(aside_id);
        coolstrap.Navigation.History.pushState(aside_id, aside_id, 'aside');
      }
    }
  };


  /**
   * Displays the <dialog>.
   *
   * @method dialog
   *
   * @param {string} <dialog> Id
   */
  var dialog = function(dialog_id) {
    var target = ELEMENT.DIALOG + dialog_id;
    if (_existsTarget(target)) {
      coolstrap.dom(target).trigger(TRIGGER.LOAD);
      coolstrap.View.Dialog.show(dialog_id);
    }  
  };



  /**
   * Return to previous section.
   *
   * @method back
   */
  var back = function(container_id) { 
    if (_getHistoryLength(container_id) > 1) {
      var current_section = ELEMENT.SECTION + _getHistoryCurrent(container_id);
      coolstrap.dom(current_section).removeClass(CLASS.SHOW).trigger(TRIGGER.UNLOAD);
      setTimeout(function(){
        coolstrap.dom(current_section).removeClass(CLASS.CURRENT)
      }, TRANSITION.DURATION)
      coolstrap.Navigation.History.removeLast(container_id);
      coolstrap.dom(_getHistoryCurrent(container_id)).addClass(CLASS.CURRENT).removeClass(CLASS.HIDE).addClass(CLASS.SHOW);      
    } else {
      _console.warn('Hey! Nothing back');
    }
  };

  var _existsTarget = function(target) {
    var exists = false;

    if (coolstrap.dom(target).length > 0) {
      exists = true;
    } else {
      _console.warn('Hey! Target doesnt exists: ' + target);
    }

    return exists;
  };

  var _getHistoryLength = function(container_id){
    return coolstrap.Navigation.History.stackLength(container_id);
  };

  var _getHistoryCurrent = function(container_id) {
    return coolstrap.Navigation.History.current(container_id);
  };

  return {
    section: section,
    article: article,
    aside: aside,
    dialog: dialog,
    back: back
  };

})(COOL);