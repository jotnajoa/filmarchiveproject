const fs = require('fs')

let predata = fs.readFileSync('./finalData.json')
let data = JSON.parse(predata);

let typearray = [];
let continents = [];
let latlngcheck = [];
let targetcheck = [];

data.forEach((d) => {
    typearray.push(d.type);
    continents.push(d.geoLoc.continent)

    if (d.geoLoc.continent == 'none') {
        latlngcheck.push(d.latlng)
    }
    if (d.coord.target == 'none') {
        targetcheck.push(d.latlng)
    }
})

let uniquetype = [...new Set(typearray)];
let uniquecont = [...new Set(continents)];
let uniquelatlng = [...new Set(latlngcheck)]
let uniquetarget = [...new Set(targetcheck)]

fs.writeFileSync('./types.json', JSON.stringify(uniquetype), 'utf-8')

fs.writeFileSync('./conts.json', JSON.stringify(uniquecont), 'utf-8')

fs.writeFileSync('./latlng.json', JSON.stringify(uniquelatlng), 'utf-8')

fs.writeFileSync('./target.json', JSON.stringify(uniquetarget), 'utf-8')