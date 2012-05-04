
$(document).ready(function(){

	var flex = '<div class="flex"/>';

	var hgroup = $('header hgroup');
	var h1 = hgroup.find('h1').height();
	var h2 = hgroup.find('h2').height();
	var hgheight = hgroup.height();
	var hheight = h1 + h2;

	if (hgheight > hheight)
		hgroup.prepend(flex).append(flex);

	// TODO: @abraham el iScroll no deja hacer click en un input (en lungo se puede)
	myScroll = new iScroll('demo');

	


});


/*
Modernizr.load({
  test: Modernizr.flexbox,
  nope: 'libs/flexie-1.0.3.js'
});
*/


/*
var htmlHeight = $('html').height();
var bodyHeight = $('body').height();
var windowHeight = $(window).height();
var divHeight = $('div').height();

//alert(windowHeight + ' ' + htmlHeight + ' ' + bodyHeight + ' ' + divHeight);
*/
