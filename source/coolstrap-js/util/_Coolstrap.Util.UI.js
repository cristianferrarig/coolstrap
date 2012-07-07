/**
 * Coolstrap UI Utils functions
 * 
 * @namespace COOLSTRAP.Util
 * @class UI
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 *
 */

COOLSTRAP.Util.UI = (function(cool) {
  var VIEWPORT_META = document.querySelector && document.querySelector('meta[name="viewport"]');
  
  /**  
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
  *
  * If we split this up into two functions we can reuse
  * this function if we aren't doing full page reloads.
  * If we cache this we don't need to re-calibrate everytime we call
  * the hide url bar
  *
  * So we don't redefine this function everytime we call hideUrlBar
  * Inspired by MBP Helper
  */ 
  var hideNavigationBar = function() {
    var _window = window;
    var _document = _window.document;

    if( !location.hash || !_window.addEventListener ){
      _window.scrollTo( 0, 1 );
      var scrollTop = 1,

      //reset to 0 on bodyready, if needed
      bodycheck = setInterval(function(){
        if( _document.body ){
          clearInterval( bodycheck );
          scrollTop = 'scrollTop' in _document.body ? _document.body.scrollTop : 1;
          _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        }
      }, 15 );

      _window.addEventListener('load', function(){
        setTimeout(function(){
            _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        }, 0);
      }, false );
    }
  };

  
  /**
  * Autogrow  
  * http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
  *
  */ 
  var autogrow = function (element, lh) {
    function handler(e){
      var newHeight = this.scrollHeight,
          currentHeight = this.clientHeight;
      if (newHeight > currentHeight) {
        this.style.height = newHeight + 3 * textLineHeight + "px";
      }
    }

    var setLineHeight = (lh) ? lh : 12,
      textLineHeight = element.currentStyle ? element.currentStyle.lineHeight : 
                        getComputedStyle(element, null).lineHeight;

    textLineHeight = (textLineHeight.indexOf("px") == -1) ? setLineHeight :
                     parseInt(textLineHeight, 10);

    element.style.overflow = "hidden";
    element.addEventListener ? element.addEventListener('keyup', handler, false) :
                               element.attachEvent('onkeyup', handler);
  };


  /** 
  * Enable active
  *
  * Enable CSS active pseudo styles in Mobile Safari
  * http://miniapps.co.uk/blog/post/enable-css-active-pseudo-styles-in-mobile-safari/
  */
  var enableActive = function () {
    document.addEventListener("touchstart", function() {}, false);
  };

  /** 
  * Prevent iOS from zooming onfocus
  *
  * https://github.com/h5bp/mobile-boilerplate/pull/108
  */
  var preventZoom = function () {
    var formFields = document.querySelectorAll('input, select, textarea'),
        contentString = 'width=device-width,initial-scale=1,maximum-scale=',
        i = 0;
    for(i = 0; i < formFields.length; i++) {
      formFields[i].onfocus = function() {
        VIEWPORT_META.content = contentString + '1';
      };
      formFields[i].onblur = function() {
        VIEWPORT_META.content = contentString + '10';
      };
    }
  };


  return {
    hideNavigationBar: hideNavigationBar,
    autogrow: autogrow,
    enableActive: enableActive,
    preventZoom: preventZoom
  };

})(COOLSTRAP);
