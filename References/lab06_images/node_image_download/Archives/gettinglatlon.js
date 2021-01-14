let async = require('async')
let baseURL = 'api.tomtom.com';
let versionNumber = 2;
// let query = 'United States of America';
let API_KEY = 'dUy5fW1uKlrM5QhG1yv6V9200Sc2IDOX';
let ext = 'json';
const axios = require('axios');

let fs = require('fs')
let addressArray = [];
let latlngs = [];


// making an array of adresses from the sourceFile


function makingAddress() {
    let tempdata = fs.readFile('./sources.json', (rej, res) => {
        let data = JSON.parse(res);



        data.forEach((d, i) => {
            if (d.geoLoc) {
                if (d.geoLoc.detailLoc) {
                    addressArray.push({
                        target: 'detailLoc',
                        content: d.geoLoc.detailLoc
                    })
                } else {
                    addressArray.push({
                        target: 'location',
                        content: d.geoLoc.location
                    })
                }
            }
        })


    })

}

function savefile(file) {
    fs.writeFileSync('./testing.json', JSON.stringify(file), 'utf8')
}

function buildFile() {
    makingAddress();
    setTimeout(() => {
        savefile(addressArray);
    }, 1000)

    setTimeout(() => {
        makingLatlon(addressArray)
    }, 2500)


    setTimeout(() => {
        fillLatlon(addressArray, latlngs)
    }, 10000)


    setTimeout(() => {
        saveFinal(addressArray)
    }, 11000)

}
buildFile()

function makingLatlon(data) {
    async.each(data, searchit)
}

function searchit(data) {

    let query = data.content;
    let apiCall = `https://${baseURL}/search/${versionNumber}/geocode/${query}.${ext}?key=${API_KEY}`;

    axios.get(apiCall)
        .then(response => {


            let data = response.data.results
            latlngs.push(data[0].position)


        }).catch(error => {
            console.log(error);
        });

}

function fillLatlon(address, latlon) {
    address.forEach((d, i) => {
        d.latlng = latlon[i]
    })
}

function saveFinal(file) {
    fs.writeFileSync('./finalArray.json', JSON.stringify(file), 'utf8')
}