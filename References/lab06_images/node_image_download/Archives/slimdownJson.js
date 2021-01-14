const fs = require('fs');
const request = require('request');
const axios = require('axios')

let myArray = [];

function readFile() {


    fs.readFile('./data.json', (rej, res) => {
        let data = JSON.parse(res)
        let d = data[0].response.rows

        d.forEach((d, i) => {
            let continent;
            let location;
            let medium;
            let detailLoc = undefined;
            let date;

            if (!d.content.indexedStructured.date) {
                console.log('there is no date!', d.id);
            } else {
                date = d.content.indexedStructured.date[0]
            }

            if (d.content.indexedStructured.geoLocation.length == 1) {

                if (d.content.indexedStructured.geoLocation[0].Other && d.content.indexedStructured.geoLocation[0].L2) {
                    continent = d.content.indexedStructured.geoLocation[0].L1
                    location = d.content.indexedStructured.geoLocation[0].L2
                    detailLoc = d.content.indexedStructured.geoLocation[0].Other
                } else if (d.content.indexedStructured.geoLocation[0].Other && !d.content.indexedStructured.geoLocation[0].L2) {
                    continent = d.content.indexedStructured.geoLocation[0].L1
                    location = d.content.indexedStructured.geoLocation[0].Other
                        // detailLoc = d.content.indexedStructured.geoLocation[0].Other
                } else if (d.content.indexedStructured.geoLocation[0].L2) {
                    continent = d.content.indexedStructured.geoLocation[0].L1
                    location = d.content.indexedStructured.geoLocation[0].L2
                } else {
                    continent = location = d.content.indexedStructured.geoLocation[0].L1
                    location = location = d.content.indexedStructured.geoLocation[0].L2
                }
            } else if (d.content.indexedStructured.geoLocation.length == 2) {

                if (d.content.indexedStructured.geoLocation[1].Other) {
                    continent = d.content.indexedStructured.geoLocation[1].L1;
                    location = d.content.indexedStructured.geoLocation[1].L2;
                    detailLoc = d.content.indexedStructured.geoLocation[1].Other
                } else if (d.content.indexedStructured.geoLocation[1].L3) {
                    continent = d.content.indexedStructured.geoLocation[1].L1;
                    location = d.content.indexedStructured.geoLocation[1].L3
                } else if (d.content.indexedStructured.geoLocation[1].L2) {
                    continent = d.content.indexedStructured.geoLocation[1].L1;
                    location = d.content.indexedStructured.geoLocation[1].L2
                }

            } else if (d.content.indexedStructured.geoLocation.length == 3) {

                if (d.content.indexedStructured.geoLocation[2].Other) {
                    continent = d.content.indexedStructured.geoLocation[2].L1;
                    location = d.content.indexedStructured.geoLocation[2].L2;
                    detailLoc = d.content.indexedStructured.geoLocation[2].Other
                } else if (d.content.indexedStructured.geoLocation[2].L4) {
                    continent = d.content.indexedStructured.geoLocation[2].L1;
                    location = d.content.indexedStructured.geoLocation[2].L3;
                    detailLoc = d.content.indexedStructured.geoLocation[2].L4
                } else if (d.content.indexedStructured.geoLocation[2].L3) {
                    continent = d.content.indexedStructured.geoLocation[2].L1;
                    location = d.content.indexedStructured.geoLocation[2].L3;
                }
            } else {
                let arrNum = d.content.indexedStructured.geoLocation.length - 1;
                if (d.content.indexedStructured.geoLocation[arrNum].Other && d.content.indexedStructured.geoLocation[arrNum].L3) {
                    continent = d.content.indexedStructured.geoLocation[arrNum].L1;
                    location = d.content.indexedStructured.geoLocation[arrNum].L3;
                    detailLoc = d.content.indexedStructured.geoLocation[arrNum].Other
                } else if (d.content.indexedStructured.geoLocation[arrNum].Other && d.content.indexedStructured.geoLocation[arrNum].L2) {
                    continent = d.content.indexedStructured.geoLocation[arrNum].L1;
                    location = d.content.indexedStructured.geoLocation[arrNum].L2;
                    detailLoc = d.content.indexedStructured.geoLocation[arrNum].Other
                } else {
                    continent = d.content.indexedStructured.geoLocation[arrNum].L1;
                    location = d.content.indexedStructured.geoLocation[arrNum].Other;
                    // detailLoc = d.content.indexedStructured.geoLocation[arrNum].L3
                }

            }

            if (d.content.indexedStructured.object_type.length == 1) {
                medium = d.content.indexedStructured.object_type[0]
            } else if (d.content.indexedStructured.object_type.length == 2) {
                medium = d.content.indexedStructured.object_type[1]
            } else {
                medium = d.content.indexedStructured.object_type[2]
            }


            myArray.push({
                id: d.id,
                title: d.content.descriptiveNonRepeating.title.content,
                geoLoc: {
                    continent: continent,
                    location: location,
                    detailLoc: detailLoc
                },
                medium: medium,
                dates: date
            })
        })
        console.log(myArray.length);
        fs.writeFileSync('./sourceData.json', JSON.stringify(myArray), 'utf8')
    })

}

readFile()