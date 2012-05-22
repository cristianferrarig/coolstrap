/** 
* Stores the stack of displayed <sections>
*
* @namespace COOL.Navigation
* @class History
*
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
*/
//TODO: Navigation History between sections in Aside. We can !

COOL.Navigation.History = (function(coolstrap, undefined) {
  var TARGET = coolstrap.Constants.TARGET;
  var DEFAULT_TARGET = TARGET.MAIN;

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
 

  return {
    add: add,
    current: current,
    removeLast: removeLast,
    stackLength: stackLength
  };

})(COOL);