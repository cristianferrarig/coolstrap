/**
 * Coolstrapp Plugins
 * 
 * @namespace COOLSTRAP
 * @class Plugins
 * 
 * @author Cristian Ferrari <cristianferrarig@gmail.com> || @energettico
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * 
 */

COOLSTRAP.Plugins = (function(cool, document) {

  var hadTouchEvent = false;

  /**
  * Fast Buttons  
  * fastButton is used to make instant responsive buttons, 
  * 300ms faster to be exact.
  *
  * new COOLSTRAP.Plugins.fastButton(document.getElementById('myBtn'), function() { // do something });
  *
  * Inspired by MBP
  * https://github.com/h5bp/mobile-boilerplate/blob/master/js/helper.js
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

  return {
    fastButton: fastButton
  }

})(COOLSTRAP, document);
