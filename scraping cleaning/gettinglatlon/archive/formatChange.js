const fs = require('fs')

let newData = [];

let predata = fs.readFileSync('./allData.json')
let data = JSON.parse(predata)

newData = data.map((d) => {
    return {
        title: d.title,
        type: d.type,
        date: d.date,
        id: d.id,
        geoLoc: {
            place: d.place,
            continent: d.area
        }
    }
})

fs.writeFileSync('./data.json', JSON.stringify(newData), 'utf-8')