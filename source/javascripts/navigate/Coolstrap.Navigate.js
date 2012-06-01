/**
 * Handles the <sections> , <articles> and <asides> to show
 *
 * @namespace COOLSTRAP
 * @class Navigate
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOLSTRAP.Navigate = (function(cool) {

  var ATTRIBUTE = cool.Constants.ATTRIBUTE;
  var CLASS = cool.Constants.CLASS;
  var ELEMENT = cool.Constants.ELEMENT;
  var TRIGGER = cool.Constants.TRIGGER;
  var TRANSITION = cool.Constants.TRANSITION;
  var COMMAND = cool.Constants.COMMAND;
  var _console = cool.Console;

  var _existsTarget = function(target) {
    var exists = false;
    if (cool.dom(target).length > 0) {
      exists = true;
    } else {
      _console.warn('Hey! Target doesnt exists: ' + target);
    }
    return exists;
  };

  var _getHistoryLength = function(container_id) {
    return cool.Navigate.History.size(container_id);
  };

  var _getHistoryCurrent = function(container_id) {
    return cool.Navigate.History.current(container_id);
  };

  /**
   * Navigate to a <section>.
   *
   * @method section
   *
   * @param {string} Id of the. <section>
   */
  var section = function(section_id) {
    section_id = cool.Util.parseUrl(section_id);
    var container_id = cool.dom(section_id)
      .parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    var current = _getHistoryCurrent(container_id);
    var target = ELEMENT.SECTION + section_id;
    if (current !== section_id) {
      if (_existsTarget(target)) {
        cool.dom(current).removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
        cool.dom(target).addClass(CLASS.CURRENT).addClass(CLASS.SHOW)
          .trigger(TRIGGER.LOAD);
        setTimeout(function() {
          cool.dom(current).removeClass(CLASS.CURRENT);
        }, TRANSITION.DURATION);
        cool.Navigate.History.add({
          section_id: section_id, container_id: container_id
        });
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
    section_id = cool.Util.parseUrl(section_id);
    article_id = cool.Util.parseUrl(article_id);
    var target = ELEMENT.SECTION + section_id + ' ' +
                  ELEMENT.ARTICLE + article_id;

    if (_existsTarget(target)) {
      cool.dom(target).trigger(TRIGGER.LOAD);
      cool.View.Article.show(section_id, article_id);
    }
  };

  /**
   * Displays the <aside> in a particular <section>.
   *
   * @method aside
   *
   * @param {string} <section> Id Not used yet.
   * @param {string} <aside> Id
   */
  var aside = function(aside_id) {
    aside_id = cool.Util.parseUrl(aside_id);
    var target = ELEMENT.ASIDE + aside_id;

    if (_existsTarget(target)) {
      var is_visible = cool.dom(target).hasClass(CLASS.CURRENT);
      if (is_visible) {
        cool.View.Aside.hide(aside_id);
      } else {
        cool.View.Aside.show(aside_id);
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
  var dialog = function(dialog_id, options) {
    var target = ELEMENT.DIALOG + dialog_id;
    var dialog_command;
    if (typeof options === 'string') { dialog_command = options; }
    if (_existsTarget(target)) {
      if (dialog_command && dialog_command === COMMAND.CLOSE_DIALOG) {
        cool.dom(target).trigger(TRIGGER.UNLOAD);
        cool.View.Dialog.close(dialog_id);
      } else {
        cool.dom(target).trigger(TRIGGER.LOAD);
        cool.View.Dialog.show(dialog_id, options);
      }
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
      cool.dom(current_section).
        removeClass(CLASS.SHOW)
        .trigger(TRIGGER.UNLOAD);
      setTimeout(function() {
        cool.dom(current_section).removeClass(CLASS.CURRENT);
      }, TRANSITION.DURATION);
      cool.Navigate.History.removeLast(container_id);
      cool.dom(_getHistoryCurrent(container_id))
        .addClass(CLASS.CURRENT)
        .removeClass(CLASS.HIDE)
        .addClass(CLASS.SHOW);
    } else {
      _console.warn('Hey! Nothing back');
    }
  };

  /**
   * Open an URL
   * 
   * @method toURL
   */
  var toURL = function(url, options) {
    options = options || {};
    options.new_window = options.new_window || false;
    if (options.new_window) {
      window.open(url);
    } else {
      //TODO: implement Dialog-Modal on the fly
    }
  };
  
  return {
    section: section,
    article: article,
    aside: aside,
    dialog: dialog,
    back: back,
    toURL: toURL
  };

})(COOLSTRAP);
