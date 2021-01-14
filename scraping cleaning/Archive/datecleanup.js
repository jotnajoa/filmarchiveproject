const fs = require('fs')

let dataforDates = JSON.parse(fs.readFileSync('./finalCont.json'))

let myData = [...dataforDates];
let finalData = [];
myData.forEach((d) => {

    let includesis = true;

    if (d.date.includes('-')) {
        let newDate = d.date.split('-')[0].trim()
        d.date = newDate
    }
    if (d.date.includes('ca')) {
        d.date.replace('ca', '').trim()
    }
    if (d.date.includes('c')) {
        d.date.replace('c', '').trim()
    }
    if (d.date.includes('and')) {
        let newDate = d.date.split('-')[0].trim()
        d.date = newDate
    }
    if (d.date.includes(',')) {
        let newDate = d.date.split('-')[0].trim()
        d.date = newDate
    }
    if (d.date.includes('unknown') ||
        d.date.includes('nd') ||
        d.date.includes('unknown date')) {
        includesis = false;
    }

    if (includesis) {
        finalData.push(d)
    }


})




console.log(finalData);
fs.writeFileSync('./contdateCleaned.json', JSON.stringify(finalData), 'utf-8')


// includes '-' 있으면, split('-')[0]
// ca있으면 제거
// c있으면 제거
// and 있으면 split('and')[0]