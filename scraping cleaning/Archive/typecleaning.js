const fs = require('fs')
const axios = require('axios')
const request = require('request');
const async = require('async')

// place none인 경우에는 그냥 냅두고
let myData = [];
let checking = [];


let incoming = fs.readFileSync('./test.json');
let data = JSON.parse(incoming);

for (let datum of data) {
    let remain = true;

    if (datum.type == 'none' && datum.title.includes('Film')) {
        datum.type = 'Motion pictures'
    } else if (datum.type == 'none' && !datum.title.includes('Film')) {
        remain = false;
    }

    if (remain) {
        myData.push(datum)
    }
}


fs.writeFileSync('./typecleaned.json', JSON.stringify(myData), 'utf-8')