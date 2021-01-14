breathing_dropshadow.js#

// d3.js animated drop shadow example
// put together by http://charlbotha.com/
// see http://bl.ocks.org/cpbotha/5205319 for the live action version
// it demonstrates:
// 1. drop shadows with SVG filters
// 2. repeated animation with transition + "end" callback
// 3. the hoving in and out of the page illusion that results from
//    manipulating the shadow.

var items = [
    { x: 50, y: 10 },
    { x: 100, y: 170 },
    { x: 320, y: 70 }
];

// we can increase this, everything will scale up with us
var w = 960,
    h = 500,
    svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// filter chain comes from:
// https://github.com/wbzyl/d3-notes/blob/master/hello-drop-shadow.html
// cpbotha added explanatory comments
// read more about SVG filter effects here: http://www.w3.org/TR/SVG/filters.html

// filters go in defs element
var defs = svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%");

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
var feOffset = filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

// for each rendered node, apply #drop-shadow filter
var item = svg.selectAll("rect")
    .data(items)
    .enter().append("rect")
    .attr("width", 170)
    .attr("height", 100)
    .attr("fill", "steelblue")
    .attr("stroke-width", 2)
    .style("filter", "url(#drop-shadow)")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

// here's the bit of code that makes the blocks breathe for you
var dest_min = 2,
    dest_max = 10,
    dest = dest_min;

// when floater is called:
// 1. it flips the destination
// 2. starts a transition to the new destination
// 3. asks to be called again when the transition reaches it
var floater = function() {
    if (dest == dest_min) {
        dest = dest_max;
    } else {
        dest = dest_min;
    }
    feOffset.transition()
        .duration(600)
        .attr("dx", dest)
        .attr("dy", dest)
        .each("end", floater)
}

// start the whole business
floater()