const fs = require('fs')

let datatofix = JSON.parse(fs.readFileSync('./data/data.json'))
let data = datatofix.filter((d) => { return d.latlng != 'Youtube,none' })

let errors = [];

data.forEach((d) => {
    if (d.latlng.lat == 'none' || d.latlng.lon == 'none') {
        errors.push(d)
    }
})

fs.writeFileSync('./errors.json', JSON.stringify(errors), 'utf-8')