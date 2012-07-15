###
 * Coolstrapp Utils functions
 * 
 * @namespace COOLSTRAP
 * @class Util
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
###

COOLSTRAP.Util = ((cool) ->
  ###
     * Returns a correct URL using hashtag character
     *
     * @method parseUrl
     *
     * @param {string} Url
     * @return {string} Url parsed
  ###
  parseUrl = (href) ->
    href_hashtag = href.lastIndexOf("#")
    if href_hashtag > 0
      href = href.substring(href_hashtag)
    else href = "#" + href  if href_hashtag is -1
    href

  ###
     * Returns a URL without hashtag character
     *
     * @method cleanUrl
     *
     * @param {string} Url
     * @return {string} Url parsed
  ###
  cleanUrl = (href) ->
    href_hashtag = href.lastIndexOf("#")
    href = href.substring(href_hashtag + 1)  if href_hashtag >= 0
    href

  parseUrl: parseUrl
  cleanUrl: cleanUrl
)(COOLSTRAP)