/** 
* Stores the stack of displayed <sections>
*
* @namespace COOL.Navigation
* @class History
*
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
*/

COOL.Navigation.History = (function(coolstrap, undefined) {
  var TARGET = coolstrap.Constants.TARGET;
  var DEFAULT_TARGET = TARGET.MAIN;
  var _prevent_hash_change = false;
  var _history = {
    main: [],
    container: {}
  };

  var _mainStack =  function() {
    return _history[TARGET.MAIN]
  }

  var _containerStack = function(container_id) {
    if (!_history[TARGET.CONTAINER][container_id]) {
      _history[TARGET.CONTAINER][container_id] = [];
    }
    return _history[TARGET.CONTAINER][container_id];
  }


  /**
  * Create a new element to the browsing history based on the current section id.
  *
  * @method add
  *
  * @param  {string} Id of the section
  */
  var add = function(section_id, container_id) {
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    stack.push(section_id);  
  };


  /**
  * Returns the current browsing history section id.
  *
  * @method current
  *
  * @return {string} Current section id
  */
  var current = function(container_id) {
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    return stack[stack.length - 1];
  };
 

  /**
  * Removes the current item browsing history.
  *
  * @method removeLast
  */
  var removeLast = function(container_id) {
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    stack.length -= 1;
  };
 

  /**
  * Returns lenght of history stack
  *
  * @method stackLength
  */
  var stackLength = function(container_id) {
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    return stack.length;
  }
 

  /**
  * Use pushState if is possible
  *
  * @method pushState
  */
  var pushState = function(section_id, container_id, type) {
    var prefix = '#main/';
    if (container_id)
      prefix = '#aside/';
    history.pushState({state:stackLength(container_id), id:section_id, type: type}, section_id, prefix + section_id.replace('#',''));
  }

  /**
  * Use PushState if is possible
  *
  * @method pushState
  */
  var replaceState = function(section_id, container_id, type) {
    var prefix = '#main/';
    history.replaceState({state:stackLength(container_id), id:section_id, type: type}, section_id, prefix + section_id.replace('#',''));
  }

  /**
  * history back 
  *
  * @method historyBack
  */
  var historyBack = function() {
    _prevent_hash_change = true;
    history.back();
  }

  var bindHashChange = function() {
    window.onhashchange = function(event){
      if (!_prevent_hash_change) {
        var to_main = /#main/.test(document.location.hash);
        var from_main = /#main/.test(event.oldURL);
        var to_aside = /#aside/.test(document.location.hash);
        var from_aside = /#aside/.test(event.oldURL);

        if (to_main && from_main) {
          coolstrap.Navigation.back()
        }
        if (to_aside && from_aside) {
          console.info(document.location.hash.match(/#aside()/))
          console.info('back in ASIDE'); //TODO: back in ASIDE
        }
        if (to_main && from_aside) {
          console.info('HIDE aside');  //TODO: HIDE in ASIDE
        }

      }
      _prevent_hash_change = false;
    } 
  };

  


  return {
    add: add,
    current: current,
    removeLast: removeLast,
    stackLength: stackLength,
    pushState: pushState,
    replaceState: replaceState,
    historyBack: historyBack,
    bindHashChange: bindHashChange
  };

})(COOL);