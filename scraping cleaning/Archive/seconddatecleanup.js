const fs = require('fs')

let dataforDates = JSON.parse(fs.readFileSync('./contdateCleaned2.json'))

let myData = [...dataforDates];
let finalData = [];
myData.forEach((d) => {

    let includesis = true;

    d.date.replace('s', '')

    finalData.push(d)

})




console.log(finalData);
fs.writeFileSync('./contdateCleaned3.json', JSON.stringify(finalData), 'utf-8')


// includes '-' 있으면, split('-')[0]
// ca있으면 제거
// c있으면 제거
// and 있으면 split('and')[0]