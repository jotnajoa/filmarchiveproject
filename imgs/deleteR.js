const fs = require('fs')
const axios = require('axios')

let preData = fs.readFileSync('./coordinates.json')
let data = JSON.parse(preData);

let presource = fs.readFileSync('./finalData.json')
let source = JSON.parse(presource)

source.forEach((d, i) => {
    d.coord.xy = {
        cx: parseFloat(data[i].cx),
        cy: parseFloat(data[i].cy)
    }
})

setTimeout(() => {
    fs.writeFileSync('./data.json', JSON.stringify(source), 'utf8')
}, 2500)