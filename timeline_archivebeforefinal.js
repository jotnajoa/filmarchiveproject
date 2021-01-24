let selected = 'rgba(182,232,102,0.4)'
window.tltl = gsap.timeline()
let targetContinent;
let mainsource;
let nums;
let margin = { left: 10, right: 10, top: 5, bottom: 5 }
let scaleSection = 150
let decades = d3.range(1870, 2020, 10)
let numsArray = []
let xscale, yscale;
let data = [];

import * as lastgraph from './lastgraph.js'
import * as mapanimation from './map.js'
export const timeanimation = () => {
    // scalebar에있는 사각형과 text를 모두 지우고
    // transition으로 날려버림

    // svg width를 100%로 바꿔주고
    // left 0%로 바꿔준다
    let decades = d3.range(1870, 2020, 10)

    decades.forEach((d, i) => {
        timeflow(d, i)
    })

    linegraph()
        // 대형 메세지 div를 보여준다

    d3.select('.msgbox')
        .transition()
        .duration(500)
        .style('opacity', 1)

    gsap.to('.msgbox', 1, { css: { left: '5%' } })



    function timeflow(years, i) {


        if (i == 1) {
            setTimeout(() => {
                skiptoNext()
                d3.select('.skipbtn').transition().duration(500).style('opacity', 1)
            }, 1000)
        }

        if (i < decades.length - 1) {


            tltl.to('.mapoutline', 2, {
                onStart: () => {
                    console.log(years);
                    contofYear(dataset, years)
                    yearIndicator(years)
                        // msgbox(years, targetContinent, nums, mainsource)
                    setTimeout(() => {
                        update()
                    }, 1600)

                },
            })
        } else if (i == decades.length - 1) {
            tltl.to('.mapoutline', 2, {
                onStart: () => {
                    contofYear(dataset, years)
                    yearIndicator(years)

                },
            })
        }

    }




}


function contofYear(array, decades) {
    let contNumpair = [];
    update()
    targetContinent = [];
    let conts = []
    nums = 0;
    mainsource;
    let sources = [];
    let sourceUnique = [];
    let thisArray = [];


    array.forEach((d) => {
        if (parseInt(d.date.split('s')[0]) == decades) {
            conts.push(d.geoLoc.continent)
            nums++
            sources.push(d.type)
            thisArray.push(d)
        }
    })

    if (nums > 0) {
        sourceUnique = [...new Set(sources)]

        var occurence = sources.reduce(function(acc, curr) {

            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }

            return acc;
        }, {});


        mainsource = Object.keys(occurence).reduce((a, b) => occurence[a] > occurence[b] ? a : b)
        targetContinent = [...new Set(conts)]

        targetContinent.forEach((d) => {
            contNumpair.push({
                continent: d,
                number: 0
            })
        })

        contNumpair.forEach((d) => {
            thisArray.forEach((t) => {
                if (t.geoLoc.continent == d.continent) {
                    d.number = d.number + 1
                }
            })
        })
    }

    msgbox(decades, targetContinent, nums, mainsource)






    if (nums > 0) {
        targetContinent.forEach((t) => {
            colorMap(t, nums, contNumpair)
        })
    }


}

function update() {
    d3.selectAll('.mapoutline')
        .transition().duration(500)
        .style('fill', 'rgba(15,15,15,0.2)')
        .style('stroke', 'none')
}

function colorMap(targetArea, nums, contNumpair) {

    // totalnumber 중에서 각 대륙의 비율을 구하고 그것은 달라사인안에 넣으면 될듯

    d3.selectAll('.mapoutline').each(function(d) {

        if (d3.select(this).data()[0].properties.continent == targetArea || d3.select(this).data()[0].properties.subregion == targetArea) {
            let ratio;
            let conCount;
            contNumpair.forEach((k) => {
                if (k.continent == targetArea) {
                    conCount = k.number
                }
            })
            ratio = conCount / nums

            d3.select(this)
                .transition().duration(500).style('fill', `rgba(182,232,102,${ratio+0.2})`)
                .style('stroke', '#ffffff')
        }
    })
}

function linegraph() {

    margin = { left: 50, right: 150, top: 5, bottom: 50 }
    scaleSection = 150
    data = [];

    decades.forEach((d) => {
        data.push({
            year: d,
            value: 0
        })
    })

    dataset.forEach((d) => {

        decades.forEach((t) => {

            if (parseInt(d.date.split('s')[0]) == t) {

                data.forEach((k) => {
                    if (k.year == t) {
                        k.value++
                    }

                })
            }
        })
    })



    xscale = d3.scaleLinear().domain([1870, 2010]).range([margin.left, viewWidth - scaleSection - margin.right])
    yscale = d3.scaleLinear().domain([0, 1271]).range([100 - margin.bottom, 0])

    let svg = d3.select('#scalebar')

    svg.append('g').attr('class', 'xaxis')
        .attr('transform', `translate(${0},${100-margin.bottom})`)
        .call(d3.axisBottom(xscale).ticks(15).tickSizeOuter(3).tickFormat(d3.format("d")))

    svg.append('g').attr('class', 'yaxis')
        .attr('transform', `translate(${margin.left},${-5})`)
        .call(d3.axisLeft(yscale).ticks(5).tickSizeOuter(0).tickSizeInner(1))

    let line = d3.line()
        .x(function(d) {

            return xscale(d.year)
        })
        .y(function(d) {

            return yscale(d.value)
        })

    svg.append('path')
        .attr('d', line(data))
        .style('stroke', '#2b2b2b')
        .style('stroke-width', 0.5)
        .style('fill', 'none')
        .style("stroke-dasharray", ("3, 3"))

    svg.append('circle')
        .attr('class', 'yearhere')
        .attr('cx', xscale(1870))
        .attr('cy', yscale(0))
        .attr('r', 4)
        .style('fill', '#D86A50')

    svg.append('circle')
        .attr('class', 'yearhere')
        .attr('cx', xscale(1870))
        .attr('cy', yscale(0))
        .attr('r', 6)
        .style('fill', 'none')
        .style('stroke-width', 0.5)
        .style('stroke', '#2b2b2b')

    svg.append('line')
        .attr('class', 'yearline')
        .attr('x1', xscale(1870))
        .attr('x2', xscale(1870))
        .attr('y1', yscale(0))
        .attr('y2', yscale(0))
        .style('stroke-width', 0.5)
        .style('stroke', '#E61F1F')

    $('.gradscale').css('opacity', 1)
}

function msgbox(decades, targetContinent = '', nums = 0, mainsource = '') {

    document.querySelector('.continents').innerHTML = ''
    document.querySelector('.nums').innerHTML = ''
    document.querySelector('.mainsource').innerHTML = ''


    document.querySelector('.decade').innerHTML = `${decades}s`

    if (nums == 0) {

        document.querySelector('.nums').innerHTML = 'No archives are available'
    } else {
        targetContinent.forEach((t, i) => {
            if (i < targetContinent.length - 1 && t != 'none') {
                document.querySelector('.continents').innerHTML += `${t},`
            } else if (i == targetContinent.length - 1) {
                document.querySelector('.continents').innerHTML += `${t}`
            }
        })

        document.querySelector('.nums').innerHTML = `${nums} Archives`
        document.querySelector('.mainsource').innerHTML = ` <span style='font-weight:500;color:#7c7c7c'>Main Medium: </span> ${mainsource}`
    }

}

function yearIndicator(year) {
    let svg = d3.select('#scalebar')
    svg.style('opacity', 1)
    year
    let xscale = d3.scaleLinear().domain([1870, 2010]).range([margin.left, viewWidth - scaleSection - margin.right])
    let yscale = d3.scaleLinear().domain([0, 1271]).range([100 - margin.bottom, 0])
    let targetValue;
    data.forEach((d) => {
        if (d.year == year) {
            targetValue = d.value
        }
    })

    d3.selectAll('.yearhere').transition().duration(1000)
        .attr('cx', xscale(year))
        .attr('cy', yscale(0))

    d3.select('.yearline').transition().duration(1000)
        .attr('x1', xscale(year))
        .attr('x2', xscale(year))
        .attr('y1', yscale(0))
        .attr('y2', yscale(targetValue))
        .style('stroke-width', 0.5)
        .style('stroke', '#E61F1F')

}

function skiptoNext() {
    $('.msgbox')
        .append(`<div class='skipbtn'>
        <div class='skipbtntext' style='width:60px'>Skip Animation</div>
        <img style='display:inline;position:relative;left:70px;top:-40px' src='./imgs/next.png'>
        </div>`)


    $('.skipbtn').on('click', () => {
        lastgraph.testlog()

        lastgraph.loadData()

        $('body').css('overflow-y', 'hidden')
        $('.overtime').css('opacity', 0)

    })





}

export const hideTimeAnimaiton = () => {
    d3.select('.skipbtn').style('opacity', 0)
    d3.select('.msgbox').style('opacity', 0)
    d3.select('#scalebar').style('opacity', 0)
    d3.select('.gradscale').style('opacity', 0)
}