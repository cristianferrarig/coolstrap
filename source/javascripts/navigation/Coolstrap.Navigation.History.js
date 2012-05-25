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

  var _containerStackLevel = function(container_id) {
    if (container_id){
      if (!_history[TARGET.CONTAINER][container_id + '_level']) {
        _history[TARGET.CONTAINER][container_id + '_level'] = {size: 0};
      }
      return  _history[TARGET.CONTAINER][container_id + '_level'];
    } else {
      return {size: 1}
    }
  }


  /**
  * Create a new element to the browsing history based on the current section id.
  *
  * @method add
  *
  * @param  {string} Id of the section
  */
  var add = function(options) {
    var section_id = options.section_id;
    var container_id = options.container_id || null;
    var replace_state = options.replace_state || false; 
    var init_container = options.init_container || false;
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    
    stack.push(section_id);  
    _containerStackLevel(container_id).size += 1;
    
    if (replace_state) {
      _replaceState(section_id, container_id, 'section');
    } else {
      _pushState(section_id, container_id, 'section');
    }
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
    //if (container_id && _containerStackLevel(container_id).size > 1) {
      _containerStackLevel(container_id).size -= 1;
    //}
    if (container_id && _containerStackLevel(container_id).size == 0) {
      var section_id = current(container_id)
      console.log('replace state')
      _replaceState(section_id, container_id, 'section');
      _containerStackLevel(container_id).size = 1;
    } else {
      history.back(); //TODO: back or replace  
    }
  };


  /**
  * Removes all history on container.
  *
  * @method clear
  */
  var clear = function(container_id) {
    console.log(container_id);
    if (container_id) container_id = container_id.replace('#','');
    var stack = !container_id ? _mainStack() :  _containerStack(container_id);
    stack.length -= 1;

    if (container_id){
      console.info(_containerStackLevel(container_id).size);
      if (_containerStackLevel(container_id).size <= 0) {
        console.info('BACK');
        history.back();          
      } else {
        history.go(-1 * _containerStackLevel(container_id).size);
        console.info('GO ' + -1 * _containerStackLevel(container_id).size);
      }
      _containerStackLevel(container_id).size = 0;
    }
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
  var _pushState = function(section_id, container_id, type) {
    var prefix = '#main/';
    if (container_id)
      prefix = '#' + container_id + '/';
    history.pushState({state:stackLength(container_id), id:section_id, type: type}, section_id, prefix + section_id.replace('#',''));
  }

  /**
  * Use PushState if is possible
  *
  * @method pushState
  */
  var _replaceState = function(section_id, container_id, type) {
    var prefix = '#main/';
    if (container_id)
      prefix = '#' + container_id + '/';
    history.replaceState({state:stackLength(container_id), id:section_id, type: type}, section_id, prefix + section_id.replace('#',''));
  }

  /**
  * history back 
  *
  * @method historyBack
  */
  var historyBack = function(container_id) {
    _prevent_hash_change = true;
    history.back();
  }

  var setup = function() {
    window.onpopstate = function(event){
      /*
      console.info('*************onpopstate');
      console.info(event.state);
      console.info(document.location.hash);
      console.info(history.length);
      console.info('*************');
      */
    }
    window.onhashchange = function(event){
      /*
      console.info('*************onhashchange');
      console.info(event);
      console.info(document.location.hash);
      console.info(history.length);
      console.info('*************');
      */
     /* if (!_prevent_hash_change) {
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
      _prevent_hash_change = false;*/
    } 
  };
 

  return {
    add: add,
    current: current,
    removeLast: removeLast,
    stackLength: stackLength,
    historyBack: historyBack,
    clear: clear,
    setup: setup
  };

})(COOL);