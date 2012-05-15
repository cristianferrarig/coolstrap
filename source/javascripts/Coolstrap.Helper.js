/**
 * Coolstrapp Mobile Helper
 *
 * Inspired by MBP
 * https://github.com/h5bp/mobile-boilerplate/blob/master/js/helper.js
 * 
 * @namespace COOL
 * @class Helper
 * 
 * @author Cristian Ferrari <cristianferrarig@gmail.com> || @energettico
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOL.Helper = (function(coolstrap, document, undefined) {

  var BODY_SCROLL_TOP = false;
  var VIEWPORT_META = document.querySelector && document.querySelector('meta[name="viewport"]');
  var hadTouchEvent = false;

  /** 
  * Fix for iPhone viewport scale bug 
  * http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
  *
  * @method scaleFix 
  */
  var scaleFix = function () {
    var ua = navigator.userAgent;
    var gestureStart = function(){
      VIEWPORT_META.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    };

    if (VIEWPORT_META && /iPhone|iPad|iPod/.test(ua) && !/Opera Mini/.test(ua)) {
      VIEWPORT_META.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
      document.addEventListener("gesturestart", gestureStart, false);
    }
  };
  
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
  * Fast Buttons  
  * fastButton is used to make instant responsive buttons, 
  * 300ms faster to be exact.
  *
  * new COOL.Helper.fastButton(document.getElementById('myBtn'), function() { // do something });
  */ 
  var fastButton = function (element, handler) {
    this.handler = handler;
  	
  	if (element.length && element.length > 1) {
      for (var singleElIdx in element) {
        this.addClickEvent(element[singleElIdx]);
      }
    } else {
      this.addClickEvent(element);
    }
  };
   
  fastButton.prototype.handleEvent = function(event) {
  	event = event || window.event;
    switch (event.type) {
      case 'touchstart': this.onTouchStart(event); break;
      case 'touchmove': this.onTouchMove(event); break;
      case 'touchend': this.onClick(event); break;
      case 'click': this.onClick(event); break;
    }
  };

  fastButton.prototype.onTouchStart = function(event) {
    var element = event.srcElement;
    event.stopPropagation();
    element.addEventListener('touchend', this, false);
    document.body.addEventListener('touchmove', this, false);
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    element.style.backgroundColor = "rgba(0,0,0,.7)";
  };

  fastButton.prototype.onTouchMove = function(event) {
    if(Math.abs(event.touches[0].clientX - this.startX) > 10 || 
      Math.abs(event.touches[0].clientY - this.startY) > 10    ) {
      this.reset(element);
    }
  };

  fastButton.prototype.onClick = function(event) {
  	event = event || window.event;
    var element = event.srcElement;
    if (event.stopPropagation) { event.stopPropagation(); }
    this.reset(event);
    this.handler.apply(event.currentTarget, [event]);
    if(event.type == 'touchend') {
      preventGhostClick(this.startX, this.startY);
    }
    element.style.backgroundColor = "";
  };

  fastButton.prototype.reset = function(event) {
    var element = event.srcElement;
  	rmEvt(element, "touchend", this, false);
  	rmEvt(document.body, "touchmove", this, false);
    element.style.backgroundColor = "";
  };

  fastButton.prototype.addClickEvent = function(element) {
    addEvt(element, "touchstart", this, false);
    addEvt(element, "click", this, false);
  };

  var preventGhostClick = function (x, y) {
    coords.push(x, y);
    window.setTimeout(function (){
      coords.splice(0, 2);
    }, 2500);
  };

  var ghostClickHandler = function (event) {
    if (!hadTouchEvent && 'ontouchstart' in window) {
      // This is a bit of fun for Android 2.3...
      // If you change window.location via fastButton, a click event will fire
      // on the new page, as if the events are continuing from the previous page.
      // We pick that event up here, but coords is empty, because it's a new page,
      // so we don't prevent it. Here's we're assuming that click events on touch devices
      // that occur without a preceding touchStart are to be ignored. 
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    for(var i = 0, len = coords.length; i < len; i += 2) {
      var x = coords[i];
      var y = coords[i + 1];
      if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  if (document.addEventListener) {
    document.addEventListener('click', ghostClickHandler, true);
  }

  addEvt( document.documentElement, 'touchstart', function() {
    hadTouchEvent = true;
  }, false);
                              
  var coords = [];

  // fn arg can be an object or a function, thanks to handleEvent
  // read more about the explanation at: http://www.thecssninja.com/javascript/handleevent
  function addEvt(el, evt, fn, bubble) {
    if("addEventListener" in el) {
      // BBOS6 doesn't support handleEvent, catch and polyfill
      try {
        el.addEventListener(evt, fn, bubble);
      } catch(e) {
        if(typeof fn == "object" && fn.handleEvent) {
          el.addEventListener(evt, function(e){
          // Bind fn as this and set first arg as event object
          fn.handleEvent.call(fn,e);
          }, bubble);
        } else {
          throw e;
        }
      }
    } else if("attachEvent" in el) {
      // check if the callback is an object and contains handleEvent
      if(typeof fn == "object" && fn.handleEvent) {
        el.attachEvent("on" + evt, function(){
          // Bind fn as this
          fn.handleEvent.call(fn);
        });
      } else {
        el.attachEvent("on" + evt, fn);
      }
    }
  }

  function rmEvt(el, evt, fn, bubble) {
    if("removeEventListener" in el) {
      // BBOS6 doesn't support handleEvent, catch and polyfill
      try {
        el.removeEventListener(evt, fn, bubble);
      } catch(e) {
        if(typeof fn == "object" && fn.handleEvent) {
          el.removeEventListener(evt, function(e){
            // Bind fn as this and set first arg as event object
            fn.handleEvent.call(fn,e);
          }, bubble);
        } else {
          throw e;
        }
      }
    } else if("detachEvent" in el) {
      // check if the callback is an object and contains handleEvent
      if(typeof fn == "object" && fn.handleEvent) {
        el.detachEvent("on" + evt, function(){
          // Bind fn as this
          fn.handleEvent.call(fn);
        });
      } else {
        el.detachEvent("on" + evt, fn);
      }
    }
  }

 
  
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
    scaleFix: scaleFix,
    hideNavigationBar: hideNavigationBar,
    fastButton: fastButton,
    autogrow: autogrow,
    enableActive: enableActive,
    preventZoom: preventZoom 
  }

})(COOL, document);
