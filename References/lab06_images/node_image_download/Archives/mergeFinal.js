const fs = require('fs')
const axios = require('axios')


let source = fs.readFileSync('./sources.json')
let sourcedata = JSON.parse(source);

let latlngsource = fs.readFileSync('./revampFinal.json')
let latlngdata = JSON.parse(latlngsource)


for (let i = 0; i < latlngdata.length; i++) {
    sourcedata[i].latlng = latlngdata[i]
}

setTimeout(() => {
    fs.writeFileSync('./completeData.json', JSON.stringify(sourcedata), 'utf8')
}, 2000)