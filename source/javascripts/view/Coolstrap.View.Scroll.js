/**
 * Wrapper of the third library iScroll
 * Inspired by LungoJS
 *
 * @namespace COOL.View
 * @class Scroll
 * @requires iScroll
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.View.Scroll = (function(coolstrap, undefined) {

  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var ERROR = coolstrap.Constants.ERROR;
  var EXCLUDE_ELEMENT = 'p'; 
  var DEFAULT_PROPERTIES = {
      hScroll: false,
      vScroll: false,
      useTransition: true,
      momentum: true,
      lockDirection: true,
      fixedScrollbar: true,
      fadeScrollbar: true,
      hideScrollbar: true
  };
  var SCROLLS = {}; 
  var SCROLL_TIMEFRAME = 250;
  var NOID_COUNTER = 0

  /**
   * Creates a new iScroll element.
   *
   * @method init
   *
   * @param {dom} element of the container scroll.
   * @param {object} [OPTIONAL] Properties
   */
  var init = function(element, properties) {
    var scroll_id = element.attr(ATTRIBUTE.ID);
    if (!scroll_id || scroll_id == '') {
      NOID_COUNTER++;
      scroll_id = CLASS.SCROLLABLE + NOID_COUNTER
      element.attr(ATTRIBUTE.ID, scroll_id);
    }
    if (element.children().length > 1 || element.children().length == 0) {
      var inner_html = element.html();
      var inner_element = coolstrap.dom('<div class="scroll_container"></div>');
      inner_element.append(inner_html);
      element.html(inner_element);
    }  

    if (scroll_id) {
      _render(scroll_id, properties);
    } else {
      coolstrap.Console.log(ERROR.CREATE_SCROLL);
    }
  };

  /**
   * Update iScroll element with new <markup> content.
   *
   * @method html
   *
   * @param {string} Id of the container scroll.
   * @param {string} Markup content
   */
  var html = function(id, content) {
    var container = _getContainer(id);
    container.html(content);
    _render(id);
  };

  /**
   * Add <markup> content to iScroll instance
   *
   * @method append
   *
   * @param {string} Id of the container scroll.
   * @param {string} Markup content
   */
  var append = function(id, content) {
    var container = _getContainer(id);
    container.append(content);

    _render(id);
  };

  /**
   * Refresh iScroll instance.
   *
   * @method refresh
   *
   * @param {string} Id of the container scroll.
   * @param {object} [OPTIONAL] Properties
   */
  var refresh = function(id, properties) {
    _render(id, properties);
  };

  /**
   * Removes iScroll instance.
   *
   * @method remove
   *
   * @param {string} Id of the container scroll.
   */
  var remove = function(id) {
    if (SCROLLS[id]) {
      delete SCROLLS[id];
    }
  };

  /**
   * Scrolls the wrapper contents to the minimum x/y coordinates
   *
   * @method first
   *
   * @param {string} Id of the <section>
   */
  var first = function(id) {
    if (SCROLLS[id]) {
      SCROLLS[id].scrollTo(0, 0, SCROLL_TIMEFRAME);
    }
  };

  /**
   * Scrolls the wrapper contents to the maximum x/y coordinate
   *
   * @method down
   *
   * @param {string} Id of the <section>
   */
  var last = function(id) {
    var scroll =  SCROLLS[id];
    if (scroll) {
      var element = coolstrap.dom('#' + id).first();
      var content_width = 0;
      var content_height = 0;

      if (_isHorizontal(element)) {
        content_width = -(_sizeProperty(element, ATTRIBUTE.WIDTH));
      } else {
        content_height = -(_sizeProperty(element, ATTRIBUTE.HEIGHT));
      }
      scroll.scrollTo(content_width, content_height, SCROLL_TIMEFRAME);
    }
  };

  var _getContainer = function(id) {
    var scroll = coolstrap.dom('#' + id);
    var container = scroll.children().first();

    if (container.length === 0) {
      scroll.html('<div></div>');
      container = scroll.children().first();
    }

    return container;
  };

  var _sizeProperty = function(element, property) {
    var element_content = element.children().first();
    return element_content[property]() - element[property]();
  };

  var _render = function(id, properties) {
    var scroll = coolstrap.dom('#' + id);
   
    properties = _mixProperties(scroll, properties);
    _saveScrollInCache(id, properties);
   
  };

  var _needScroll = function(scroll, properties) {
    var element = scroll[0];
    var is_horizontal = _isHorizontal(coolstrap.dom(element));

    if (is_horizontal) {
      return (element.clientWidth < element.scrollWidth);
    } else {
      return (element.clientHeight < element.scrollHeight);
    }
  };

  var _saveScrollInCache = function(id, properties) {
    if (!SCROLLS[id]) {
      SCROLLS[id] = new iScroll(id, properties);
    } else {
      SCROLLS[id].refresh();
    }
  };


  var _mixProperties = function(scroll, properties) {
    var scroll_type = _isHorizontal(scroll) ? 'hScroll' : 'vScroll';

    properties || (properties = {});
    properties[scroll_type] = true;
    properties = coolstrap.Core.extend(DEFAULT_PROPERTIES, properties);

    return properties;
  };

  var _isHorizontal = function(scroll) {
    return ( scroll.hasClass(CLASS.HORIZONTAL)) ? true : false;
  };

  return {
      init: init,
      remove: remove,
      refresh: refresh,
      html: html,
      append: append,
      first: first,
      last: last
  };

})(COOL);