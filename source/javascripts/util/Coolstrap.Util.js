/**
 * Coolstrapp Utils functions
 * 
 * @namespace COOL
 * @class Util
 * 
 * @author Abraham Barrera <abarrerac@gmail.com> || @abraham_barrera
 */

COOL.Util = (function(cool) {
   
  /**
   * Returns a correct URL using hashtag character
   *
   * @method parseUrl
   *
   * @param {string} Url
   * @return {string} Url parsed
   */
  var parseUrl = function(href) {
    var href_hashtag = href.lastIndexOf('#');
    if (href_hashtag > 0) {
      href = href.substring(href_hashtag);
    } else if (href_hashtag === -1) {
      href = CHAR.HASHTAG + href ;
    }
    return href;
  };

  /**
   * Returns a URL without hashtag character
   *
   * @method cleanUrl
   *
   * @param {string} Url
   * @return {string} Url parsed
   */
  var cleanUrl = function(href) {
    var href_hashtag = href.lastIndexOf('#');
    if (href_hashtag >= 0) {
      href = href.substring(href_hashtag + 1);
    } 
    return href;
  };
 
  return {
    parseUrl: parseUrl,
    cleanUrl: cleanUrl
  };

})(COOL);