###
* Stores the stack of displayed <sections>
* @namespace COOLSTRAP.Navigate
* @class History
*
* @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Navigate.History = ((cool, document, window) ->
  TARGET = cool.Constants.TARGET
  STACK =
    main: []
    container: {}

  prevent_hash_change = false
  console = cool.Console
  _mainStack = ->
    STACK[TARGET.MAIN]

  _containerStack = (container_id) ->
    STACK[TARGET.CONTAINER][container_id] = []  unless STACK[TARGET.CONTAINER][container_id]
    STACK[TARGET.CONTAINER][container_id]

  _containerStackLevel = (container_id) ->
    if container_id
      STACK[TARGET.CONTAINER][container_id + "_level"] = size: 0  unless STACK[TARGET.CONTAINER][container_id + "_level"]
      STACK[TARGET.CONTAINER][container_id + "_level"]
    else
      size: 1

  ###
    * Use pushState if is possible
    *
    * @method pushState
  ###
  _pushState = (section_id, container_id) ->
    prefix = "#main/"
    prefix = "#" + container_id + "/"  if container_id
    window.history.pushState
      state: size(container_id)
      id: section_id
    , section_id, prefix + cool.Util.cleanUrl(section_id)

  _replaceState = (section_id, container_id) ->
    prefix = "#main/"
    prefix = "#" + container_id + "/"  if container_id
    window.history.replaceState
      state: size(container_id)
      id: section_id
    , section_id, prefix + cool.Util.cleanUrl(section_id)

  _back = ->
    prevent_hash_change = true
    window.history.back()

  _go = (position) ->
    prevent_hash_change = true
    window.history.go position

  _onPopState = (event) ->
    unless prevent_hash_change
      console.info "onpopstate"
      console.info event.state

  _onHashChange = (event) ->
    unless prevent_hash_change
      console.info event
      to_main = /#main/.test(document.location.hash)
      from_main = /#main/.test(event.oldURL)
      to_aside = /#aside/.test(document.location.hash)
      from_aside = /#aside/.test(event.oldURL)
      console.info "cool.Navigate.back()"  if to_main and from_main
      console.info "back in ASIDE"  if to_aside and from_aside
      console.info "HIDE aside"  if to_main and from_aside
    prevent_hash_change = false

  ###
    * Initializes the Navigation listeners.
    *
    * @method setup
    *
  ###
  setup = ->
    window.onpopstate = _onPopState
    window.onhashchange = _onHashChange


  ###
    * Create a new element to the browsing history
    *
    * @method add
    *
    * @param  {string} Id of the section.
  ###
  add = (options) ->
    section_id = options.section_id
    container_id = options.container_id or null
    replace_state = options.replace_state or false
    stack = (if not container_id then _mainStack() else _containerStack(container_id))
    stack.push section_id
    _containerStackLevel(container_id).size += 1
    if replace_state
      _replaceState section_id, container_id
    else
      _pushState section_id, container_id


  ###
    * Returns the current browsing history section id.
    *
    * @method current
    *
    * @return {string} Current section id.
  ###
  current = (container_id) ->
    stack = (if not container_id then _mainStack() else _containerStack(container_id))
    stack[stack.length - 1]
  ###
    * Removes the current item browsing history.
    *
    * @method removeLast
  ###
  removeLast = (container_id) ->
    stack = (if not container_id then _mainStack() else _containerStack(container_id))
    stack.length -= 1
    _containerStackLevel(container_id).size -= 1
    if container_id and _containerStackLevel(container_id).size is 0
      section_id = current(container_id)
      _replaceState section_id, container_id
      _containerStackLevel(container_id).size = 1
    else
      _back()
  ###
    * Returns lenght of history stack
    * 
    * @method size
  ###
  size = (container_id) ->
    stack = (if not container_id then _mainStack() else _containerStack(container_id))
    stack.length
  ###
    * Removes all history on container.
    *
    * @method clear
  ###
  clear = (container_id) ->
    console.info "clear" + container_id
    container_id = cool.Util.cleanUrl(container_id)  if container_id
    stack = (if not container_id then _mainStack() else _containerStack(container_id))
    stack.length -= 1
    if container_id
      if _containerStackLevel(container_id).size <= 0
        _back()
      else
        _go -1 * _containerStackLevel(container_id).size
      _containerStackLevel(container_id).size = 0

  add: add
  current: current
  removeLast: removeLast
  size: size
  clear: clear
  setup: setup
)(COOLSTRAP, document, window)
