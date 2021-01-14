const fs = require('fs')

let data1 = JSON.parse(fs.readFileSync('./addresstest97.json'))
let data2 = JSON.parse(fs.readFileSync('./addresstest101.json'))
let data3 = JSON.parse(fs.readFileSync('./addresstest217.json'))
let data4 = JSON.parse(fs.readFileSync('./addresstest295.json'))
let data5 = JSON.parse(fs.readFileSync('./addresstest776.json'));



console.log(data1);

let merged = [];
merged = data1.concat(data2).concat(data3).concat(data4).concat(data5)

fs.writeFileSync('./finalData.json', JSON.stringify(merged), 'utf-8')