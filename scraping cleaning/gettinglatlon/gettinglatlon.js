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
let errorList = [];
let tag;
let numbers = [];
let comparison = [];
let smallArray = [];
let finalArray = [];

comparison.push({
        numberslength: 0,
        addressarraylength: 0
    })
    // making an array of adresses from the sourceFile


function makingAddress() {
    let tempdata = fs.readFileSync('./data4.json')
    let data = JSON.parse(tempdata);

    // final ID is "edanmdm:siris_arc_219393"
    // length is 3874


    data.forEach((d, i) => {




        if (comparison[comparison.length - 1].numberslength == comparison[comparison.length - 1].addressarraylength) {

            if (d.geoLoc.place != 'none' && d.geoLoc.continent != 'none') {
                if (d.geoLoc.place != d.geoLoc.continent) {
                    addressArray.push({
                        title: d.title,
                        type: d.type,
                        date: d.date,
                        id: d.id,
                        geoLoc: d.geoLoc,
                        coord: {
                            target: 'detailLoc',
                            content: d.geoLoc.place,
                        }
                    })
                } else if (d.geoLoc.place == d.geoLoc.continent) {

                    addressArray.push({
                        title: d.title,
                        type: d.type,
                        date: d.date,
                        id: d.id,
                        geoLoc: d.geoLoc,
                        coord: {
                            target: 'continent',
                            content: d.geoLoc.place,
                        }
                    })
                }
            } else if (d.geoLoc.place == 'none' && d.geoLoc.continent != 'none') {

                addressArray.push({
                    title: d.title,
                    type: d.type,
                    date: d.date,
                    id: d.id,
                    geoLoc: d.geoLoc,
                    coord: {
                        target: 'continent',
                        content: d.geoLoc.area,
                    }

                })
            } else if (d.geoLoc.place == 'none' && d.geoLoc.continent == 'none') {

                let checkif = d.type.includes('YouTube')
                if (!checkif) {
                    console.log('something wrong with', d);
                }

                addressArray.push({
                    title: d.title,
                    type: d.type,
                    date: d.date,
                    id: d.id,
                    geoLoc: d.geoLoc,
                    coord: {
                        target: 'none',
                        content: 'none',
                    }
                })
            }



            comparison.push({
                numberslength: i + 1,
                addressarraylength: addressArray.length
            })
        }



    })



}

function savefile() {
    fs.writeFileSync('./lengthcomparison.json', JSON.stringify(comparison), 'utf-8')
}

async function buildFile() {
    await makingAddress();

    await savefile();


    let lengthofArray = comparison[comparison.length - 1].addressarraylength;

    console.log(lengthofArray);
    let targetNumber = Math.round(lengthofArray / 5);
    console.log(targetNumber);
    for (let k = 0; k < targetNumber + 1; k++) {

        setTimeout(() => {
            console.log(k);
            let smallArr = [];

            for (let i = 5 * k; i < 5 * (k + 1); i++) {
                smallArr.push(addressArray[i])
            }

            makingLatlon(smallArr)


            if (k == targetNumber) {
                tag = targetNumber
                setTimeout(() => {
                    saveFinal(finalArray)
                }, 4000)
            }


        }, (k + 1) * 2000)

    }




    // 시간두고
    // makingLatlon에서 받은 값을 어딘가에 concat해서 계속 저장해나간다


}


buildFile()

function makingLatlon(data) {

    async.each(data, searchit)

}

function searchit(data) {

    let temp = data

    let query = data.coord.content
    let id = data.id


    if (query != 'none') {
        let apiCall = `https://${baseURL}/search/${versionNumber}/geocode/${query}.${ext}?key=${API_KEY}`;



        axios.get(apiCall)
            .then(response => {

                let responsedata = response.data.results[0];
                let latlng = responsedata.position;
                temp.latlng = latlng;
                finalArray.push(temp)

            }).catch(error => {
                temp.latlng = {
                    lat: 'none',
                    lon: 'none'
                };
                finalArray.push(temp)
                errorList.push({ name: query, id: id })
            });

    } else {
        temp.latlng = 'Youtube,none'
        finalArray.push(temp)
    }



}



function saveFinal(file) {
    fs.writeFileSync(`./addresstest${tag+295}.json`, JSON.stringify(file), 'utf8')
    fs.writeFileSync(`./problems${tag+295}.json`, JSON.stringify(errorList), 'utf-8')
}