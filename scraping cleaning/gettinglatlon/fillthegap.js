const fs = require('fs')
let finalData = []
let predata = fs.readFileSync('./addresstest299.json')
let data = JSON.parse(predata)

let addressArray = [];

data.forEach((d) => {
    if (d.latlng && d.latlng != "Youtube,none") {
        addressArray.push(
            d.coord.content
        )
    }
})



finalData = [...new Set(addressArray)]






setTimeout(() => {
    console.log(finalData);
    fs.writeFileSync('./filling.json', JSON.stringify(finalData), 'utf-8')
}, 1000)