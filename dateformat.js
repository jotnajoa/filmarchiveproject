const fs = require('fs')

let predata = fs.readFileSync('./data/data.json')
let data = JSON.parse(predata)
let newData = [];


for (datum of data) {
    let decade;
    let x = parseInt(datum.date)
    decade = Math.floor(x / 10) * 10

    datum.date = `${decade}s`;

    newData.push(datum)
}

fs.writeFileSync('./data/datadecades.json', JSON.stringify(newData), 'utf-8')