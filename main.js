import * as mapmodule from './map.js'
import * as timeline from './timeline.js'
import * as lastgraph from './lastgraph.js'
let sectionheight = 800;
let datatest = [];
let margin = {};
let marginRatio = 0.05;
let circles;
let rendermap;


let types = ["YouTube Videos", "Motion pictures", "Projected media", "Video recordings",
    "Archival materials", "Sound recordings",
    "Television programs", "Photographs", "Videotapes"
]

let colors = ['#EB4B4B', '#C2EB7F', '#E2C8C8', '#AA3360', '#B79D8F', '#6D7787', '#34BBB6', '#EC79BB', '#FF52B6']

let conts = ["none", "Africa", "Oceania", "Central America", "North America", "Europe", "Arctic", "Asia", "South America"]
    // circles length = 3862
    // continent가 none이면 youtube란 얘기고 이러면 latlng은 유튜브,논 으로 나온다
    // conts doesnt need color codes
window.contJSON = [];
window.mapgradient = ['rgba(121,210,226,0.2)', 'rgba(121,210,226,0.8)']
window.valueset = [];

d3.json('./data/datadecades.json').then((d) => {
    window.minifiedData = [];
    window.dataset = d;
    for (let i = 500; i < 2500; i++) {
        minifiedData.push(dataset[i])
    }
})

// window.colorscale = d3.scaleOrdinal().domain(types).range(colors)
window.fillOpacity = 0.3


$(document).ready(function() {

    $(window).scroll(function() {
        if (
            $(window).innerHeight() + $(window).scrollTop() >= $('.main').height()
        ) {
            console.log('reach to End')
                // $('body').css('overflow-y', 'hidden')

        }
    })



    window.viewWidth = $('.main').css('width')
    viewWidth.replace('px', '')
    viewWidth = parseInt(viewWidth)

    window.imgHeight = $('.frontgroundimg').css('height')
    imgHeight.replace('px', '')
    imgHeight = parseInt(imgHeight)

    let svg = d3.select('svg')
    svg.attr('width', viewWidth)
        .attr('height', imgHeight)

    margin.top = viewWidth * marginRatio;
    margin.bottom * marginRatio;
    margin.left * marginRatio * 0.5;
    margin.right * marginRatio * 0.5;

    let entry = $('.entry')
    entry.css('height', `${sectionheight}px`)
    let backgroundmap = $('.backgroundmap')
    backgroundmap.css('top', `${sectionheight}px`)
    let boxdesc1 = $('.boxdesc1')
    boxdesc1.css('top', `${sectionheight*2.5}px`)

    let boxdesc2 = $('.boxdesc2')
    boxdesc2.css('top', `${sectionheight*6}px`)

    let mostcontinent = $('.mostcontinent')
    mostcontinent.css('top', `${sectionheight*8}px`)

    let leastcontinent = $('.leastcontinent')
    leastcontinent.css('top', `${sectionheight*10}px`)

    let box2title = $('.box2title')
    box2title.css('top', `${sectionheight*0.1}px`)



    let overview = $('.overview')
    overview.css({
        'top': '10%',
        'opacity': '0%'
    })

    let overtime = $('.overtime')
    overtime.css({
        'top': '10%',
        'opacity': '0%'
    })

    let msgbox = $('.msgbox')
    msgbox.css({
        'top': '30%',
        'opacity': '0%',
        'left': '-10%'
    })
    let scroller = $('.scroller1')
    scroller.css('top', `${sectionheight*12}px`)

    let scalebar = $('#scalebar')
    scalebar.css('top', `${sectionheight*0.75}px`)
    scalebar.css('left', `5%%`)

    let gradscale = $('.gradscale')
    gradscale.css('top', `${sectionheight*0.75}px`)
    gradscale.css('right', `10%`)


    let foregroundimg = $('.frontgroundimg')
    foregroundimg.css('top', `${sectionheight*2}px`)

    let map = $('#map')
    map.css({
        'top': `${sectionheight*2}px`,
        'width': `${viewWidth}px`
    })
    $('#map').css('height', `${imgHeight}px`)


    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline()


    tl.to('.header', {
        scrollTrigger: {
            trigger: '.main',
            start: `+=${sectionheight} bottom`,
            onEnter: () => { $('.header').css('opacity', 1) },
            onLeaveBack: () => { $('.header').css('opacity', 0) }
        }
    })

    tl.to('.backgroundmap', {
        scrollTrigger: {
            trigger: '.frontgroundimg',
            start: `top bottom`,
            end: `+=${sectionheight*0.5} +=${sectionheight*3/4}`,
            pin: '.backgroundmap',

            onLeave: () => {

                $('.frontgroundimg').css({
                    'position': 'fixed',
                    'top': '100px',
                    'width': '1050px'
                })

                $('#map').css({
                    'position': 'fixed',
                    'top': '130px',
                    'width': '1050px'
                })
                loadConts()
                $('.backgroundmap').animate({
                    opacity: 0
                })
            }
        }
    })

    tl.to('.boxdesc1', {

        scrollTrigger: {
            trigger: '.boxdesc1',
            start: 'center center',
            end: `${sectionheight} top`,
            pin: '.boxdesc1',
            scrub: true,
        },
        opacity: 1

    })

    tl.to('.frontgroundimg', {

        scrollTrigger: {
            trigger: '.boxdesc1',
            start: 'center center',
            end: `${sectionheight} top`,
            pin: '.boxdesc1',
            scrub: true,
            onLeave: () => {
                mapmodule.showmap()
                $('.frontgroundimg').remove()
                    // loadConts()
            }
        },
        opacity: 0.1

    })

    tl.to('.box2title', {

        scrollTrigger: {
            trigger: '.boxdesc1',
            start: 'bottom center',
            end: `${sectionheight} top`,
            scrub: true,
        },
        opacity: 1
    })

    tl.to('.boxdesc2', {

        scrollTrigger: {
            trigger: '.boxdesc2',
            start: 'center center',
            end: `${sectionheight} top`,
            pin: '.boxdesc2',
            scrub: true,
            onLeave: () => {
                mapmodule.colormap()
                $('.box2title').css('opacity', 0)
            }
        },
        opacity: 0.4
    })


    tl.to('.overview', {
        scrollTrigger: {
            trigger: '.mostcontinent',
            start: 'top bottom',
            scrub: true
        },
        opacity: 1
    })

    tl.to('.mostcontmsgbox', {
        scrollTrigger: {
            trigger: '.mostcontinent',
            start: 'bottom center',
            scrub: true,
            onEnter: () => {
                mapmodule.mostCircle()
            }
        }
    })

    tl.to('.mostcontmsgbox', {
        scrollTrigger: {
            trigger: '.mostcontinent',
            start: 'bottom center',
            scrub: true,
        },
        left: '5%',
        opacity: 1
    })

    tl.to('.mostcontmsgbox', {
        scrollTrigger: {
            trigger: '.leastcontinent',
            start: 'bottom center',
            scrub: true
        },
        left: '-10%',
        opacity: 0
    })

    tl.to('.leastcontmsgbox', {
        scrollTrigger: {
            trigger: '.leastcontinent',
            start: 'bottom top',
            scrub: true,
            onEnter: () => {
                mapmodule.leastCircle()
            }
        }
    })

    tl.to('.leastcontmsgbox', {
        scrollTrigger: {
            trigger: '.leastcontinent',
            start: 'bottom top',
            scrub: true,
        },
        left: '5%',
        opacity: 1
    })

    tl.to('.leastcontmsgbox', {
        scrollTrigger: {
            trigger: '.scroller1',
            start: 'top bottom',
            scrub: true,
            onEnter: () => {
                d3.select('.focusCircle').style('opacity', 0)
                d3.select('.overview').style('opacity', 0)
            }
        },
        left: '-10%',
        opacity: 0
    })



    tl.to('.overtime', {
        scrollTrigger: {
            trigger: '.scroller1',
            start: 'top bottom'
        },
        opacity: 1
    })

    tl.to('.scroller', {
        scrollTrigger: {
            trigger: '.scroller1',
            start: 'top bottom',
            scrub: true,
            onEnter: () => {
                d3.select('#scalebar').selectAll('line').remove()
                d3.select('#scalebar').selectAll('text')
                    .transition()
                    .duration(500)
                    .remove()
                d3.select('#scalebar').selectAll('rect')
                    .remove()
                    .call(() => {

                        d3.select('#scalebar').attr('width', viewWidth)
                        d3.select('#scalebar').style('left', '5%')
                    })

                timeline.timeanimation()
            },
            onLeave: () => {
                $('.overview').css('opacity', 0)
            }
        },
        opacity: 1
    })









    function showSVG() {

        svg.transition().duration(200).style('opacity', 1);
        foregroundimg.css('opacity', 0)


        circles = svg.append('g')
        circles.selectAll('circles')
            .data(minifiedData)
            .join('circle')
            .attr('class', 'circles')
            .attr('cx', d => d.coord.xy.cx)
            .attr('cy', d => d.coord.xy.cy)
            .attr('r', 0)
            .style('fill', `#595F69`)
            .style('fill-opacity', () => { return Math.random() + 0.4 })
            .transition()
            .duration(500)
            .delay((d, i) => { return i })
            .attr('r', () => { return Math.random() + 2 })
            .on('end', () => {
                d3.select('.boxdesc1').transition().duration(500).style('opacity', 0)
                moveCircle()
            })


        // move circle first 
        // leaflet addition
        // circle moves accordingly
        function moveCircle() {
            mapmodule.showmap()
        }

    }




});


async function loadConts() {
    let africa = await d3.json('./data/africa.json')
    let asia = await d3.json('./data/asia.json')
    let europe = await d3.json('./data/europe.json')
    let northamericana = await d3.json('./data/northamerica.json')
    let southamerica = await d3.json('./data/southamerica.json')
    let oceania = await d3.json('./data/oceania.json')


    let northamerica = {
        type: 'FeatureCollection',
        features: []
    }

    let centralamerica = {
        type: 'FeatureCollection',
        features: []
    }

    let north = northamericana.features.filter((t) => { return t.properties.subregion != 'Central America' })

    north.forEach((k) => {
        northamerica.features.push(k)
    })

    let central = northamericana.features.filter((t) => { return t.properties.subregion == 'Central America' })

    central.forEach((k) => {
        centralamerica.features.push(k)
    })



    contJSON.push(africa)
    contJSON.push(asia)
    contJSON.push(europe)
    contJSON.push(northamerica)
    contJSON.push(centralamerica)
    contJSON.push(southamerica)
    contJSON.push(oceania)

    generateColorscale()

}

function generateColorscale() {
    window.numberofContents = []

    let conts = ['Africa', 'Asia', 'Europe', 'North America', 'Central America', 'South America', 'Oceania', "none", "Arctic"]
    dataset

    for (let cont of conts) {
        let target = cont
        let number = 0;

        dataset.forEach((d) => {

            if (d.geoLoc.continent == cont) {
                number++;
            }

        })
        numberofContents.push({ cont, number })
    }
    let max = d3.max(numberofContents, (d) => { return d.number })
    console.log(numberofContents);


    let interpolate = d3.interpolate(mapgradient[0], mapgradient[1])
    window.contScale = d3.scaleSequential().interpolator(interpolate).domain([0, max])



    d3.scaleLinear().domain([0, max]).range(['#70A4C4', '#D86A50'])

}