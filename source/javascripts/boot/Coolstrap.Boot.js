/**
 * Boot for a new Coolstrap Application instance
 * Inspired by LungoJS
 *
 * @namespace COOL
 * @class Boot
 *
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Boot = (function(coolstrap, undefined) {
  return function() {
   
    //coolstrap.Boot.Resources.start(); //TODO: Boot resources
    coolstrap.Boot.Layout.start(); 
    coolstrap.Boot.Events.start(); 
    coolstrap.Boot.Section.start(); 
    coolstrap.Boot.Article.start();  
  };

})(COOL);