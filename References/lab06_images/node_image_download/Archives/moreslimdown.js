const fs = require('fs');
const request = require('request');
const axios = require('axios')


let myArray = [];


function readFile() {


    fs.readFile('./sourceData.json', (rej, res) => {
        let data = JSON.parse(res)

        let newdata = data.map((d) => {
            if (d.geoLoc.continent) {
                if (d.geoLoc.detailLoc) {
                    return {...d,
                        geoLoc: {
                            continent: d.geoLoc.continent.content,
                            location: d.geoLoc.location.content,
                            detailLoc: d.geoLoc.detailLoc.content
                        }
                    }
                } else {
                    return {...d,
                        geoLoc: {
                            continent: d.geoLoc.continent.content,
                            location: d.geoLoc.location.content
                        }
                    }
                }
            }


        })

        fs.writeFileSync('./sources.json', JSON.stringify(newdata), 'utf8')
    })



}
readFile()