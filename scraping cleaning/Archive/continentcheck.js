const fs = require('fs')

let dataforcont = JSON.parse(fs.readFileSync('./typecomplete.json'))
let cont = [];

dataforcont.forEach((d) => {
    cont.push(d.area)
})

let uniqueCont = [...new Set(cont)]

fs.writeFileSync('./contlist.json', JSON.stringify(uniqueCont), 'utf-8')