const smithScrapper = require('./scrapper.js');
const fs = require('fs');
const numberofTotal = 5955;

(async() => {
    await smithScrapper.initialize('node');

    let results = await smithScrapper.getResults(numberofTotal);
    // getResults(number) -> number of elements I will get first

    fs.writeFileSync('./dataset.json', JSON.stringify(results), 'utf8')
    debugger;

})();