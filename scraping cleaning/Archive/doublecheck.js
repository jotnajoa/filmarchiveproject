const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./contdateCleaned3.json'))

let conts = [];

data.forEach((d) => {
    conts.push(d.date)
})

let uniqcont = [...new Set(conts)]

console.log(uniqcont);

fs.writeFileSync('./datescheck.json', JSON.stringify(uniqcont), 'utf-8')

/*
let tobeAsia = [
    'Ladakh '
    'Namibia'
    'Szechuan, China'
    'Afhganistan'
    'Kathmandu '
    'Manila'
    'Macau '
    'India'
    'Nepal'
    'Middle East'
    'Cambodia'
    'Djakarta, Java'
    'Phillippines'
    'New Delhi '
]

let tobeNorthAmerica = ['Alberta']
*/