###
 * Coolstrap Core functions
 * 
 * @namespace COOLSTRAP.Util
 * @class Core
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 * Inspired by LungoJS
###

COOLSTRAP.Util.Core = ((cool) ->
  _toArray = (obj) ->
    Array::slice.call obj, 0

  _getType = (obj) ->
    Object::toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()



  ###
     * Executes callbacks based on the parameters received.
     *
     * @method execute
     *
     * @param {Function} callback to execute
  ###
  execute = ->
    args = _toArray(arguments)
    callback = args.shift()
    callback.apply null, args  if _getType(callback) is "function"

  ###
     * Mix two objects
     *
     * @method extend
     *
     * @param {object} arguments to mix them all into a new object.
     * @return {object} child a new object with all the objects from the arguments mixed.
  ###
  extend = ->
    child = child or {}
    arg = 0
    len = arguments.length

    while arg < len
      argument = arguments[arg]
      for prop of argument
        child[prop] = argument[prop]
      arg++
    child

  execute: execute
  extend: extend
)(COOLSTRAP)