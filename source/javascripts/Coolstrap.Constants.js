/**
 * Coolstrapp Global Constants
 * Inspired by LungoJs
 * 
 * @namespace COOL
 * @class Constants
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOL.Constants = {

  ELEMENT: {
    SECTION: 'section',
    ARTICLE: 'article',
    ASIDE: 'aside',
    BODY: 'body',
    DIV: 'div'
  },

  TRANSITION: {
    DURATION: 300
  },

  CLASS: {
    ACTIVE: 'active',
    ASIDE: 'aside',
    SHOW: 'show',
    HIDE: 'hide',
    CURRENT: 'current',
    STARTING: 'starting',
    RIGHT: 'onright',
    LEFT: 'onleft',
    TOP: 'ontop',
    BOTTOM: 'onbottom',
    HORIZONTAL: 'horizontal'
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

  ERROR: {
    CREATE_SCROLL: 'ERROR: Impossible to create a <scroll> without ID.',
    ROUTER: 'ERROR: The target does not exists >>',
    LOADING_RESOURCE: 'ERROR: Loading resource.'
  }

}