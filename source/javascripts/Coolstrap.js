/**
* Coolstrapp.js 
*/
var COOLSTRAP = COOLSTRAP || {};
COOLSTRAP.VERSION = '0.9';

COOLSTRAP.Attributes || (COOLSTRAP.Attributes = {});
COOLSTRAP.Data || (COOLSTRAP.Data = {});
COOLSTRAP.View || (COOLSTRAP.View = {});
COOLSTRAP.Device || (COOLSTRAP.Device = {});
COOLSTRAP.Fallback || (COOLSTRAP.Fallback = {});
COOLSTRAP.Framework || (COOLSTRAP.Framework = {});
COOLSTRAP.dom = "undefined" !== typeof window ? window.jQuery || window.Zepto || null : null;