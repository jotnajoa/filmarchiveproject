var accessToken = 'pJfnboGvofro9s43CHtxKZJdhys903xXBfxOo181pEHfhhNB62Gvut0kmmxy4HwP'
let ranonce = true;
var mymap;
var mytile;
let count = 0;



export const showmap = () => {



    if (ranonce && !mymap) {
        mymap = L.map('map', { zoomControl: false, scrollWheelZoom: false }).setView([30.2744, 5.7751], 1.5);
        mytile = L.tileLayer(`https://tile.jawg.io/b2258e08-5ee3-44f7-9e9e-ea1067d6f3b9/{z}/{x}/{y}.png?access-token=${accessToken}`, { noWrap: false }).addTo(mymap);


        L.svg().addTo(mymap);

        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .data(minifiedData)
            .join('circle')
            .attr('class', 'mapcircles')
            .attr('cx', d => d.coord.xy.cx)
            .attr('cy', d => d.coord.xy.cy)
            .attr('r', 2)
            .style('fill-opacity', (d) => {
                    if (d.latlng.lat) {
                        return Math.random() + 0.4
                    } else {
                        return 0
                    }
                }

            )
            .transition()
            .duration(2000)
            .attr("cx", function(d) {
                if (d.latlng.lat) {

                    return mymap.latLngToLayerPoint([d.latlng.lat, d.latlng.lon]).x + Math.random() * 5
                } else {
                    return 0
                }
            })
            .attr("cy", function(d) {

                if (d.latlng.lat) {

                    return mymap.latLngToLayerPoint([d.latlng.lat, d.latlng.lon]).y + Math.random() * 5
                } else {
                    return 0
                }

            })
            .attr('r', 1)
            .style('fill', `rgb(141,220,226)`)
            .transition().duration(500)
            .delay((d, i) => { return i })
            .style('fill-opacity', 0.2)
            .attr('r', 10)

        let options = ['#EB4B4B', '#C2EB7F', '#E2C8C8', '#AA3360', '#B79D8F', '#6D7787', '#34BBB6', '#EC79BB', '#FF52B6']
    }
    ranonce != ranonce

    // Function that update circle position if something change
    function update() {
        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .transition()
            .duration(10)
            .attr("cx", function(d) {

                return mymap.latLngToLayerPoint([d.latlng.lat, d.latlng.lon]).x

            })
            .attr("cy", function(d) {

                return mymap.latLngToLayerPoint([d.latlng.lat, d.latlng.lon]).y


            })
    }

    // // If the user change the map (zoom or drag), I update circle position:
    mymap.on('zoomend', update)

}

export const glow = () => {

    let svg = d3.select('#map').select('svg')

    // let def = svg.append('defs')

    // let filter = def.append('filter').attr('id', 'blur')

    // filter
    //     .attr('x', -2.5)
    //     .attr('y', -2.5)
    //     .attr('width', '600%')
    //     .attr('height', '600%')
    //     .append('feGaussianBlur')
    //     .attr('id', 'feGaussianBlur')
    //     .attr('in', "SourceGraphic")
    //     .attr('stdDeviation', '0')

    // var tl = gsap.timeline({
    //     paused: true,
    //     yoyo: true,
    //     repeat: -1,
    //     delay: 1
    // });

    // tl
    //     .to("#feGaussianBlur", 1, {
    //         attr: {
    //             "stdDeviation": 5
    //         }
    //     }).progress(1).progress(0).play()

    // let circles = svg.selectAll('circle')

    // circles.each(function(d) {
    //     d3.select(this)
    //         .style('fill-opacity', 0.2)
    //         .style('filter', 'url(#blur)')
    // })


}

export const colormap = () => {

    let svg = d3.select('#map').select('svg')

    svg.selectAll('circle').transition()
        .duration(500)
        .attr('r', 0)
        .style('opacity', 0)

    // svg.selectAll('circle').remove()



    function projectPoint(x, y) {

        var point = mymap.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);

    }

    function drawFeatures(json) {

        // console.log(numberofContents);
        let contlist = ['Africa', 'Asia', 'Europe', 'North America', 'Central America', 'South America', 'Oceania']
        var transform = d3.geoTransform({ point: projectPoint });
        var path = d3.geoPath().projection(transform)

        var featureElement = svg.selectAll("dummy")
            .data(json.features)
            .join('path')
            .attr('class', (d) => {
                return d.properties.continent
            })
            .classed('mapoutline', true)
            .style('stroke', '#ffffff')
            .style('stroke-width', 0.8)
            .style('fill', 'rgba(0,0,0,0)')
            .transition()
            .duration(1000)
            .style('fill', (d) => {


                let contname = d.properties.continent;
                let subname = d.properties.subregion;
                let target;

                if (subname == 'Central America') { target = subname } else { target = contname }


                return target == 'Africa' ? contScale(numberofContents[0].number) :
                    target == 'Asia' ? contScale(numberofContents[1].number) :
                    target == 'Europe' ? contScale(numberofContents[2].number) :
                    target == 'North America' ? contScale(numberofContents[3].number) :
                    target == 'Central America' ? contScale(numberofContents[4].number) :
                    target == 'South America' ? contScale(numberofContents[5].number) :
                    target == 'Oceania' ? contScale(numberofContents[6].number) : null

            })


        mymap.on("viewreset", update);
        mymap.on('zoomend', update)

        update();

        function update() {
            featureElement.attr("d", path);
        }
    }



    contJSON.forEach((d) => {
        drawFeatures(d)
    })
    showscale()
        // console.log(contJSON);
}

function showscale() {
    let scaleSVG = d3.select('#scalebar').attr('width', viewWidth * 2 / 3).attr('height', 100)

    let scaleMargin = {
        top: 60,
        bottom: 10,
        left: 50,
        right: 50
    }

    let max = d3.max(numberofContents, (d) => { return d.number })


    var defs = scaleSVG.append("defs");

    var linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");

    linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", mapgradient[0]);


    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", mapgradient[1]);

    let distance = max / 20;

    let scaleArray = d3.range(0, max + max / 20, distance)

    let xscale = d3.scaleLinear().domain([0, max]).range([0, viewWidth * 2 / 3 - scaleMargin.left - scaleMargin.right])

    let interpolate = d3.interpolate(mapgradient[0], mapgradient[1])
    let scaleContScale = d3.scaleSequential().interpolator(interpolate).domain([0, max])

    let scalebar = scaleSVG.append('g').attr('transform', `translate(${scaleMargin.left},${scaleMargin.top})`)
    let bandwidth = (viewWidth * 2 / 3 - scaleMargin.left - scaleMargin.right) / scaleArray.length

    scalebar.append('rect')
        .attr('width', viewWidth * 2 / 3 - scaleMargin.left - scaleMargin.right)
        .attr('height', 14)
        .style('fill', 'url(#linear-gradient)')



    scaleSVG.select('g').selectAll('lines').data(scaleArray).join('line')
        .attr('x1', d => xscale(d)).attr('y1', 0)
        .attr('x2', d => xscale(d)).attr('y2', 16).style('stroke', 'lightgrey')
        .style('stroke-width', 1)
        .style("stroke-dasharray", ("1, 1"))

    scaleSVG.append('text')
        .attr('x', 40)
        .attr('y', 50)
        .text('Number of Archives')
        .style('color', '#2b2b2b')
        .style('font-family', 'soleil')
        .style('font-size', 15)
        .style('font-weight', 500)

    scaleSVG.select('g').selectAll('lines')
        .data(
            [
                scaleArray[0],
                scaleArray[10],
                scaleArray[20]
            ]
        )
        .join('text')
        .attr('x', d => xscale(d) - bandwidth / 4)
        .attr('y', 30)
        .text(d => Math.ceil(d))

}

export const mostCircle = () => {


    let svg = d3.select('#map').select('svg')
    let asiaCoord = { lat: 39.93084, lon: 116.38634 }


    let highlightcircle = svg.append('circle')
        .attr('class', 'focusCircle')
        .attr("cx", function() { return mymap.latLngToLayerPoint([asiaCoord.lat, asiaCoord.lon]).x - 80 })
        .attr("cy", function() { return mymap.latLngToLayerPoint([asiaCoord.lat, asiaCoord.lon]).y })
        .attr('r', 120)
        .style('stroke', '#E23730')
        .style('stroke-width', 2)
        .style('fill', 'none')

    let length = highlightcircle.node().getTotalLength();

    highlightcircle
        .attr('stroke-dasharray', length + " " + length)
        .attr('stroke-dashoffset', length)
        .transition()
        .duration(2000)
        .attr('stroke-dasharray', 10 + " " + 10)
        .attr('stroke-dashoffset', 30)

}

export const leastCircle = () => {


    let svg = d3.select('#map').select('svg')
    let centralCoord = { lat: 19.43268, lon: -99.13421 }


    svg.select('.focusCircle').remove()

    let highlightcircle = svg.append('circle')
        .attr('class', 'focusCircle')
        .attr("cx", function() { return mymap.latLngToLayerPoint([centralCoord.lat, centralCoord.lon]).x })
        .attr("cy", function() { return mymap.latLngToLayerPoint([centralCoord.lat, centralCoord.lon]).y })
        .attr('r', 120)
        .style('stroke', '#E23730')
        .style('stroke-width', 2)
        .style('fill', 'none')

    let length = highlightcircle.node().getTotalLength();

    highlightcircle
        .attr('stroke-dasharray', length + " " + length)
        .attr('stroke-dashoffset', length)
        .transition()
        .duration(2000)
        .attr('stroke-dasharray', 10 + " " + 10)
        .attr('stroke-dashoffset', 30)

}

function scrollStop() {
    d3.select('body').style('overflow-y', 'hidden')
}

function scrollResume() {
    d3.select('body').style('overflow-y', 'scroll')
}