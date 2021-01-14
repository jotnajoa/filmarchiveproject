const fs = require('fs')

let coordsource = fs.readFileSync('./coord.json')
let coord = JSON.parse(coordsource)

let datesource = fs.readFileSync('./sources.json')
let dates = JSON.parse(datesource)


coord.forEach((d, i) => {
    d.dates = dates[i].dates
})

setTimeout(() => {
    fs.writeFileSync('./finalData.json', JSON.stringify(coord), 'utf8')
}, 2000)