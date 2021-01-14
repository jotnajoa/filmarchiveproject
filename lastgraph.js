function animate(target, upvalue, downvalue) {


    const start = `M0 50 C10 50 40 50 50 50 C40 50 10 50 0 50 z`;
    const end = `M0 50 C10 ${upvalue} 40 ${upvalue} 50 50 C40 ${downvalue} 10 ${downvalue} 0 50 z`;
    let tl = gsap.timeline()
    tl.from(target, 0.4, { attr: { d: start }, ease: Power2.easeIn })
    tl.to(target, 1, { attr: { d: end }, ease: Power2.easeIn })
};



let types = ["YouTube Videos", "Motion pictures", "Projected media", "Video recordings",
    "Archival materials", "Sound recordings",
    "Television programs", "Photographs", "Videotapes"
]

let colors = ['#EB4B4B', '#C2EB7F', '#E2C8C8', '#AA3360', '#B79D8F', '#6D7787', '#34BBB6', '#EC79BB', '#FF52B6']
let colorscale = d3.scaleOrdinal().domain(types).range(colors)


export async function loadData() {

    let types = ["YouTube Videos", "Motion pictures", "Projected media", "Video recordings",
        "Archival materials", "Sound recordings",
        "Television programs", "Photographs", "Videotapes"
    ]

    let colors = ['#EB4B4B', '#C2EB7F', '#E2C8C8', '#AA3360', '#B79D8F', '#6D7787', '#34BBB6', '#EC79BB', '#FF52B6']
    let colorscale = d3.scaleOrdinal().domain(types).range(colors)


    let decades = d3.range(1870, 2020, 10);

    let data = await d3.json('./data/datadecades.json')
    let yearData = []

    let mappos = $('#map').position()

    tltl.kill()
    $('#scalebar').css('opacity', 0)
    $('.gradscale').css('opacity', 0)
    $('.msgbox').css('opacity', 0)
    $('#map').css('opacity', 0)

    $('.lastgraph').css('width', `100%`)
    $('.lastgraph').css('top', `3%`)
    $('.lastgraph').css('left', `0%`)
    $('.lastgraph').css('opacity', `0%`)


    $('.lastheadline').css('width', '850px')
    $('.graphpart').css('width', '850px')
    $('.radialLegend').css('left', '80%')
    $('.radialLegend').css('width', '200px')

    $('.lastgraph').css('visibility', 'visible')
    d3.select('.lastgraph').transition().duration(500).style('opacity', 1)

    types.forEach((d) => {

        decades.forEach((t) => {
            yearData.push({
                medium: d,
                year: t,
                qty: 0
            })

        })

    })

    data.forEach((d) => {

        yearData.forEach((t) => {
            if (d.type == t.medium && d.date.split('s')[0] == t.year) {
                t.qty++
            }

        })

    })



    types.forEach((l) => {
        addOn(l, yearData)
    })

    // addon을 하고, 그다음에 맵 애니메이션을 하고, 맵 애니메이션이 끝나면, on('end',()=>{그래프소환 하면될듯?})






    let pathdata = document.querySelectorAll('.graphpath')
    let path = Array.from(pathdata)

    setTimeout(() => {
        path.forEach((d, i) => {
            animate(d, valueset[i].upvalue, valueset[i].downvalue);
        })
    }, 1000)


}



function addOn(list, yearData) {
    // upper part = 20 max, 50min
    // lower part = 80 max, 50min

    // 997 => max
    // mostly 0
    // some 1s

    $('.eachmedium').append(`<div class ="types ${list.replace(/ /g, "")}">
                            <div class='category'>${list}</div>
                        </div>`)



    yearData.forEach((t) => {
        let svgpath;
        if (t.medium == list) {
            svgpath = scaleGenerator(t.medium, t.qty, 244)

            $(`.types.${list.replace(/ /g, "")}`).append(`<div class='years ${t.year}'>
            ${svgpath}
            </div>`)

            /*
            let types = ["YouTube Videos", "Motion pictures", "Projected media", "Video recordings",
                "Archival materials", "Sound recordings",
                "Television programs", "Photographs", "Videotapes"
            
            let colors = ['#EB4B4B', '#C2EB7F', '#E2C8C8', '#AA3360', '#B79D8F', '#6D7787', '#34BBB6', '#EC79BB', '#FF52B6']
            let colorscale = d3.scaleOrdinal().domain(types).range(colors)

            */

        }

    })




    // for inputs, type = yearData.medium, input=yearData.qty

}

function scaleGenerator(type, input, max) {
    let multiplyer = 10
    let types = ["YouTube Videos", "Motion pictures", "Projected media", "Video recordings",
        "Archival materials", "Sound recordings",
        "Television programs", "Photographs", "Videotapes"
    ]

    let colors = ['#E87255', '#9D76D3', '#48C48C', '#3197DB', '#EDD1C7', '#505050', '#99B78E', '#00B7B0', '#FF52B6']
    let colorscale = d3.scaleOrdinal().domain(types).range(colors)
    let upvalue, downvalue;
    let opacity;

    if (input >= max) {
        upvalue = 20
        downvalue = 80
        opacity = 1;
    }
    if (input > max / 15 && input < max) {
        upvalue = 50 - (input / max) * 30
        downvalue = 50 + (input / max) * 30
        opacity = input / max
    }
    if (input < max / 15) {
        upvalue = 50 - (input * multiplyer / max) * 30
        downvalue = 50 + (input * multiplyer / max) * 30
        opacity = 5 * input * multiplyer / max
    }
    //multiplying factor is for visual purpose actual data shouldn't be multiplied by ten
    valueset.push({
        upvalue: upvalue,
        downvalue: downvalue
    })
    let output = `<svg class='graphbody'>
                    <path class='graphpath'style='stroke:${colorscale(type)};stroke-width:0.4px;fill:${colorscale(type)};opacity:${opacity}'
                    d="M0 50 C10 ${50} 40 ${50} 50 50 C40 ${50} 10 ${50} 0 50 z"/>
                  </svg>`

    return output

}

export function testlog() {
    console.log('testlog');
}