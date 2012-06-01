/**
 * Coolstrapp Global Constants
 * 
 * @namespace COOLSTRAP
 * @class Constants
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOLSTRAP.Constants = {

  ELEMENT: {
    SECTION: 'section',
    ARTICLE: 'article',
    ASIDE: 'aside',
    DIALOG: 'div[role="dialog"]',
    BODY: 'body',
    DIV: 'div'
  },

  TARGET: {
    CONTAINER: 'container',
    MAIN: 'main',
    SECTION: 'section',
    ARTICLE: 'article',
    ASIDE: 'aside',
    BACK: 'back',
    DIALOG: 'dialog',
    CLOSE: 'close'
  },

  TRANSITION: {
    DURATION: 250
  },

  CLASS: {
    ACTIVE: 'active',
    ASIDE: 'aside',
    SHOW: 'show',
    HIDE: 'hide',
    CURRENT: 'current',
    FIRST: 'first',
    RIGHT: 'onright',
    LEFT: 'onleft',
    TOP: 'ontop',
    BOTTOM: 'onbottom',
    CENTER: 'oncenter',
    HORIZONTAL: 'horizontal',
    SCROLLABLE: 'scrollable',
    FADE_IN: 'fadeIn',
    NONE: ''
  },

  ATTRIBUTE: {
    ID: 'id',
    HREF: 'href',
    TITLE: 'title',
    ARTICLE: 'article',
    CLASS: 'class',
    WIDTH: 'width',
    HEIGHT: 'height',
    PIXEL: 'px',
    PERCENT: '%',
    TARGET: 'target',
    FIRST: 'first',
    LAST: 'last',
    EMPTY: ''
  },

  TRIGGER: {
    LOAD: 'load',
    UNLOAD: 'unload'
  },

  LOG_LEVEL: {
    DEBUG: -1,
    INFO: 0,
    LOG: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4
  },

  DIALOG: {
    MODAL: 'modal',
    ALERT: 'alert',
    ACTION: 'action',
    POPOVER: 'popover',
  },
  
  COMMAND: {
    CLOSE_DIALOG: 'close'
  },

  ERROR: {
    CREATE_SCROLL: 'ERROR: Impossible to create a <scroll> without ID.',
    ROUTER: 'ERROR: The target does not exists >>',
    LOADING_RESOURCE: 'ERROR: Loading resource.'
  }

};