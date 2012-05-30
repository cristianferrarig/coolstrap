/**
* Stores the stack of displayed <sections>
* @namespace COOL.Navigation
* @class History
*
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
*/

COOL.Navigation.History = (function(cool, document, window) {

  var TARGET = cool.Constants.TARGET;
  var STACK = {
    main: [],
    container: {}
  };
  var prevent_hash_change = false;
  var console = cool.Console;

  var _mainStack = function() {
    return STACK[TARGET.MAIN];
  };

  var _containerStack = function(container_id) {
    if (!STACK[TARGET.CONTAINER][container_id]) {
      STACK[TARGET.CONTAINER][container_id] = [];
    }
    return STACK[TARGET.CONTAINER][container_id];
  };

  var _containerStackLevel = function(container_id) {
    if (container_id) {
      if (!STACK[TARGET.CONTAINER][container_id + '_level']) {
        STACK[TARGET.CONTAINER][container_id + '_level'] = {size: 0};
      }
      return STACK[TARGET.CONTAINER][container_id + '_level'];
    } else {
      return {size: 1};
    }
  };

  /**
  * Use pushState if is possible
  *
  * @method pushState
  */
  var _pushState = function(section_id, container_id) {
    var prefix = '#main/';
    if (container_id) { prefix = '#' + container_id + '/';}
    window.history.pushState({
      state: size(container_id),
      id: section_id 
    }, section_id, prefix + cool.Util.cleanUrl(section_id));
  };

  var _replaceState = function(section_id, container_id) {
    var prefix = '#main/';
    if (container_id) { prefix = '#' + container_id + '/'; }
    window.history.replaceState({
      state: size(container_id),
      id: section_id 
    }, section_id, prefix + cool.Util.cleanUrl(section_id));
  };

  var _back = function() {
    prevent_hash_change = true;
    window.history.back();
  };

  var _go = function(position) {
    prevent_hash_change = true;
    window.history.go(position);
  };

  var _onPopState = function(event) {
    if (!prevent_hash_change) {
      console.info('onpopstate');
      console.info(event.state);
    }
  };

  var _onHashChange = function(event) {
    if (!prevent_hash_change) {
      console.info(event);
      var to_main = /#main/.test(document.location.hash);
      var from_main = /#main/.test(event.oldURL);
      var to_aside = /#aside/.test(document.location.hash);
      var from_aside = /#aside/.test(event.oldURL);
      if (to_main && from_main) {
         console.info('cool.Navigation.back()');
      }
      if (to_aside && from_aside) {
        console.info('back in ASIDE');
      }
      if (to_main && from_aside) {
        console.info('HIDE aside');
      }
    }
    prevent_hash_change = false;
  };

  /**
  * Initializes the Navigation listeners.
  *
  * @method setup
  *
  */
  var setup = function() {
    window.onpopstate = _onPopState;
    window.onhashchange = _onHashChange;
  };

  /**
  * Create a new element to the browsing history
  *
  * @method add
  *
  * @param  {string} Id of the section.
  */
  var add = function(options) {
    var section_id = options.section_id;
    var container_id = options.container_id || null;
    var replace_state = options.replace_state || false;
    var stack = !container_id ? _mainStack() : _containerStack(container_id);

    stack.push(section_id);
    _containerStackLevel(container_id).size += 1;
    if (replace_state) {
      _replaceState(section_id, container_id);
    } else {
      _pushState(section_id, container_id);
    }
  };


  /**
  * Returns the current browsing history section id.
  *
  * @method current
  *
  * @return {string} Current section id.
  */
  var current = function(container_id) {
    var stack = !container_id ? _mainStack() : _containerStack(container_id);
    return stack[stack.length - 1];
  };


  /**
  * Removes the current item browsing history.
  *
  * @method removeLast
  */
  var removeLast = function(container_id) {
    var stack = !container_id ? _mainStack() : _containerStack(container_id);
    stack.length -= 1;
    _containerStackLevel(container_id).size -= 1;
    if (container_id && _containerStackLevel(container_id).size === 0) {
      var section_id = current(container_id);
      _replaceState(section_id, container_id);
      _containerStackLevel(container_id).size = 1;
    } else {
      _back();
    }
  };
 
  /**
  * Returns lenght of history stack
  * 
  * @method size
  */
  var size = function(container_id) {
    var stack = !container_id ? _mainStack() : _containerStack(container_id);
    return stack.length;
  };
  
  /**
  * Removes all history on container.
  *
  * @method clear
  */
  var clear = function(container_id) {
    console.info('clear' + container_id);
    if (container_id) { container_id = cool.Util.cleanUrl(container_id); }
    var stack = !container_id ? _mainStack() : _containerStack(container_id);
    stack.length -= 1;
    if (container_id) {
      if (_containerStackLevel(container_id).size <= 0) {
        _back();
      } else {
        _go(-1 * _containerStackLevel(container_id).size);
      }
      _containerStackLevel(container_id).size = 0;
    }
  };

  return {
    add: add,
    current: current,
    removeLast: removeLast,
    size: size,
    clear: clear,
    setup: setup
  };

})(COOL, document, window);
