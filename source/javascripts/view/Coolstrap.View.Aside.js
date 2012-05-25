/**
 * Initialize the <Aisde> layout
 *
 * @namespace COOL.View
 * @class Aside
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.View.Aside = (function(coolstrap, undefined) {

  var ELEMENT = coolstrap.Constants.ELEMENT;
  var CLASS = coolstrap.Constants.CLASS;
  var ATTRIBUTE = coolstrap.Constants.ATTRIBUTE;
  var TRANSITION = coolstrap.Constants.TRANSITION;
  /**
   * Display an aside element 
   *
   * @method show
   *
   * @param  {string} Aside id
   */
  var show = function(aside_id) {
    var aside = coolstrap.dom(ELEMENT.ASIDE + aside_id);
    var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
    _initFirstSection(aside);
    coolstrap.dom(ELEMENT.BODY).addClass(body_class).addClass(CLASS.ASIDE);
    aside.addClass(CLASS.CURRENT);
  };

  var _initFirstSection = function(aside) {
    var aside_id = aside.attr(ATTRIBUTE.ID);
    var sections = coolstrap.dom('#' + aside_id + ' ' + ELEMENT.SECTION + '.' + CLASS.CURRENT); 
    var section_to_show = sections.first();
    if (!section_to_show || section_to_show.length == 0){
      sections = coolstrap.dom('#' + aside_id + ' ' + ELEMENT.SECTION); 
      section_to_show = sections.first();  
    }
    var section_id = '#' + section_to_show.attr(ATTRIBUTE.ID);
    section_to_show.addClass(CLASS.CURRENT);

    coolstrap.Navigation.History.add({
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
   * @param  {string} Aside id
   */
  var hide = function(aside_id) {
    var aside = coolstrap.dom(ELEMENT.ASIDE + aside_id);
    var body_class = CLASS.SHOW + CLASS.ASIDE + _classFromAside(aside);
    coolstrap.dom(ELEMENT.BODY).removeClass(body_class).removeClass(CLASS.ASIDE);
    setTimeout(function() {
        var current_aside = ELEMENT.ASIDE + aside_id + '.' + CLASS.CURRENT;
        coolstrap.dom(current_aside).removeClass(CLASS.CURRENT);
    }, TRANSITION.DURATION); 

    coolstrap.Navigation.History.clear(aside_id);
  };

  var _classFromAside = function(aside) {
      var aside_class = aside.attr(ATTRIBUTE.CLASS);
      return aside_class || '';
  };

  return {
      show: show,
      hide: hide
  };

})(COOL);