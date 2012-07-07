/**
 * Initialize the <Aisde> layout
 *
 * @namespace COOLSTRAP.View
 * @class Aside
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOLSTRAP.View.Aside = (function(cool) {

  var ELEMENT = cool.Constants.ELEMENT;
  var CLASS = cool.Constants.CLASS;
  var ATTRIBUTE = cool.Constants.ATTRIBUTE;
  var TRANSITION = cool.Constants.TRANSITION;

  /**
   * Display an aside element
   *
   * @method show
   *
   * @param  {string} Aside id.
   */
  var show = function(aside_id) {
    var aside = cool.dom(ELEMENT.ASIDE + aside_id);
    var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
    _initFirstSection(aside);
    cool.dom(ELEMENT.BODY).addClass(body_class).addClass(CLASS.ASIDE);
    aside.addClass(CLASS.CURRENT);
  };

  var _initFirstSection = function(aside) {
    var aside_id = aside.attr(ATTRIBUTE.ID);
    var sections = cool.dom('#' + aside_id + ' ' + ELEMENT.SECTION + '.' + CLASS.CURRENT);
    var section_to_show = sections.first();
    if (!section_to_show || section_to_show.length == 0) {
      sections = cool.dom('#' + aside_id + ' ' + ELEMENT.SECTION);
      section_to_show = sections.first();
    }
    var section_id = '#' + section_to_show.attr(ATTRIBUTE.ID);
    section_to_show.addClass(CLASS.CURRENT);

    cool.Navigate.History.add({
      section_id: section_id,
      container_id: aside_id,
      init_container: true
    });

  };


  /**
   * Hide an aside element
   *
   * @method hide
   *
   * @param  {string} Aside id.
   */
  var hide = function(aside_id) {
    var aside = cool.dom(ELEMENT.ASIDE + aside_id);
    var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
    cool.dom(ELEMENT.BODY).removeClass(body_class).removeClass(CLASS.ASIDE);
    setTimeout(function() {
        var current_aside = ELEMENT.ASIDE + aside_id + '.' + CLASS.CURRENT;
        cool.dom(current_aside).removeClass(CLASS.CURRENT);
    }, TRANSITION.DURATION);

    cool.Navigate.History.clear(aside_id);
  };

  var _classFromAside = function(aside) {
      var aside_class = aside.attr(ATTRIBUTE.CLASS);
      return aside_class || '';
  };

  return {
      show: show,
      hide: hide
  };

})(COOLSTRAP);
