/**
 * Initialize the events for manage navigation
 *
 * @namespace COOLSTRAP.Framework
 * @class Navigation
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOLSTRAP.Framework.Navigation = (function(cool, window) {
  
  var ATTRIBUTE = cool.Constants.ATTRIBUTE;
  var CLASS = cool.Constants.CLASS;
  var ELEMENT = cool.Constants.ELEMENT;
  var TARGET = cool.Constants.TARGET;
  var TRANSITION = cool.Constants.TRANSITION;
  var COMMAND = cool.Constants.COMMAND;
  var SELECTORS = {
      HREF_TARGET: '[role="main"] a[href][data-target]',
      HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]'
  };
  var console = cool.Console;

  var _goSection = function(section_id) {
    section_id = cool.Util.parseUrl(section_id);
    cool.Navigate.section(section_id);
  };

  var _goArticle = function(element) {
    var section_id = cool.Navigate.History.current();
    var article_id = element.attr(ATTRIBUTE.HREF);
    cool.Navigate.article(section_id, article_id);
  };

  var _goDialog = function(element, close) {
    var dialog_id = element.attr(ATTRIBUTE.HREF);
    cool.Navigate.dialog(dialog_id, close || { source_element: element });
  };

  var _hideAsideIfNecesary = function(aside_id, link) {
    var target_id = link.attr(ATTRIBUTE.HREF);
    var parent = cool.dom(target_id).parents(ELEMENT.ASIDE).first();
    if (target_id === aside_id) { return false; }
    if (!parent || ('#' + parent.attr(ATTRIBUTE.ID) !== aside_id && target_id !== '#' + TARGET.BACK)) {
      cool.View.Aside.hide(aside_id);
      return true;
    }
  };

  var _goAside = function(element) {
    var aside_id = element.attr(ATTRIBUTE.HREF);
    var current_aside = cool.dom(ELEMENT.ASIDE + '.' + CLASS.CURRENT).first();
    var hide_aside = false;
    if (current_aside) {
      hide_aside = _hideAsideIfNecesary('#' + current_aside.attr(ATTRIBUTE.ID), element);
    }
    if (hide_aside) {
      setTimeout(function() {
        cool.Navigate.aside(aside_id);
      }, TRANSITION.DURATION);
    } else {
      cool.Navigate.aside(aside_id);
    }
  };

  var _goBack = function(container_id) {
    cool.Navigate.back(container_id);
  };

  var _selectTarget = function(link) {
    var target_type = link.data(ATTRIBUTE.TARGET);
    var link_container = link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    switch (target_type) {
      case TARGET.SECTION:
        var target_id = link.attr(ATTRIBUTE.HREF);
        _goSection(target_id, link_container);
        break;
      case TARGET.ARTICLE:
        _goArticle(link);
        break;
      case TARGET.ASIDE:
        _goAside(link);
        break;
      case TARGET.DIALOG:
        _goDialog(link);
        break;
      case TARGET.BACK:
        _goBack(link_container);
        break;
      case TARGET.CLOSE:
        _goDialog(link, COMMAND.CLOSE_DIALOG);
        break;
    }
  };

  var _loadTargetFromAside = function(event) {
    var link = cool.dom(this);
    var aside_id = '#' + link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    var target_type = link.data(ATTRIBUTE.TARGET);
    if (target_type === TARGET.BACK || target_type === TARGET.CLOSE) {
      _selectTarget(link);
    } else {
      if (target_type === TARGET.ARTICLE) {
        cool.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
        link.addClass(CLASS.CURRENT);
      }
      if (_hideAsideIfNecesary(aside_id, link)) {
        setTimeout(function() {
          _selectTarget(link);
        }, TRANSITION.DURATION);
      } else {
        _selectTarget(link);
      }
    }
    event.preventDefault();
  };

  var _loadTarget = function(event) {
    var link = cool.dom(this);
    _selectTarget(link);
    event.preventDefault();
  };

  /**
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method setup
   *
   */
  var setup = function() {
    if (typeof document.documentElement.ontouchstart !== 'undefined') {
      cool.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
      cool.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);
    } else {
      cool.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).click(_loadTargetFromAside);
      cool.dom(SELECTORS.HREF_TARGET).click(_loadTarget);
    }
    
    cool.Fallback.Android.buttons();
    
    cool.Navigate.History.setup();
  };

  return {
    setup: setup
  };

})(COOLSTRAP, window);