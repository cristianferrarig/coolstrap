/**
 * Initialize the events for manage navigation
 * 
 * @namespace COOL.Framework
 * @class Navigation
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */


COOL.Framework.Navigation = (function(coolstrap, window, undefined) {
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var CLASS = coolstrap.Constants.CLASS;
  var ELEMENT = coolstrap.Constants.ELEMENT;
  var TARGET = coolstrap.Constants.TARGET;
  var TRANSITION = coolstrap.Constants.TRANSITION;
  var COMMAND = coolstrap.Constants.COMMAND;
  var SELECTORS = {
      HREF_TARGET: '[role="main"] a[href][data-target]',
      HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]'
  };
  var console = coolstrap.Console; 

  /**
   * Initializes the automatic subscription events by markup of the project.
   *
   * @method setup
   *
   */
  var setup = function() {
    if (typeof document.documentElement.ontouchstart !== 'undefined') {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);
    } else {
      coolstrap.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).click(_loadTargetFromAside);
      coolstrap.dom(SELECTORS.HREF_TARGET).click(_loadTarget);
    }
    if (coolstrap.Fallback.Android) {
      coolstrap.Fallback.Android.buttons();  
    } 
    coolstrap.Navigation.History.setup();
  };

  var _loadTargetFromAside = function(event) {
    var link = coolstrap.dom(this);
    var aside_id = '#' + link.parents(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
    var target_type = link.data(ATTRIBUTE.TARGET);
    if (target_type === TARGET.BACK || target_type === TARGET.CLOSE) {
      _selectTarget(link);
    } else {
      if (target_type === TARGET.ARTICLE) {
        coolstrap.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
        link.addClass(CLASS.CURRENT);
      }
      if (_hideAsideIfNecesary(aside_id, link)) {
        setTimeout(function(){
          _selectTarget(link);
        }, TRANSITION.DURATION);
      } else {
        _selectTarget(link);
      }  
    }
    event.preventDefault();
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

  var _goSection = function(id, container_id) {
    id = coolstrap.Core.parseUrl(id);
    coolstrap.Navigation.section(id);
  };

  var _goArticle = function(element) {
    var section_id = coolstrap.Navigation.History.current();
    var article_id =element.attr(ATTRIBUTE.HREF);
    coolstrap.Navigation.article(section_id, article_id);
  };

  var _goDialog = function(element, close) {
    var dialog_id = element.attr(ATTRIBUTE.HREF);
    coolstrap.Navigation.dialog(dialog_id, close);
  };

  var _goAside = function(element) {
    var section_id = coolstrap.Navigation.History.current();
    var aside_id = element.attr(ATTRIBUTE.HREF);
    var target = ELEMENT.ASIDE + aside_id;  
    var current_aside = coolstrap.dom(ELEMENT.ASIDE + '.' + CLASS.CURRENT).first();
    var hide_aside = false;
    if (current_aside) {
      hide_aside = _hideAsideIfNecesary('#' + current_aside.attr(ATTRIBUTE.ID), element);      
    }
    if (hide_aside) {
      setTimeout(function(){
        coolstrap.Navigation.aside(aside_id);
      }, TRANSITION.DURATION);
    } else {
      coolstrap.Navigation.aside(aside_id);  
    }
  };

  var _goBack = function(container_id) {
    coolstrap.Navigation.back(container_id);
  };

  var _hideAsideIfNecesary = function(aside_id, link) {
    var target_id = link.attr(ATTRIBUTE.HREF);
    var parent = coolstrap.dom(target_id).parents(ELEMENT.ASIDE).first();
    if (target_id === aside_id) { return false; }
    if (!parent || ('#'+ parent.attr(ATTRIBUTE.ID) !== aside_id && target_id !== '#' + TARGET.BACK)) {
      coolstrap.View.Aside.hide(aside_id); 
      return true;
    }
    return false;
  };

  return {
    setup: setup
  };

}(COOL, window));
