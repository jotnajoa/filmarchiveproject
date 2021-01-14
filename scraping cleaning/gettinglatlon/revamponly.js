const axios = require('axios');
let async = require('async')
let fs = require('fs')

let filepath = `./revampFinal.json`
let revampArray = []

revampFile(filepath)
    // setTimeout(() => { saveRevamp(revampArray) }, 2500)



function revampFile(target) {
    let preRevamp = fs.readFileSync(`${target}`)
    revampArray = JSON.parse(preRevamp);

    revampArray.forEach((d, i) => {

        if (!d.latlng) {
            console.log(d);
            let query = d.content;
            // console.log(query);
            let baseURL = 'api.tomtom.com';
            let versionNumber = 2;
            // let query = 'United States of America';
            let API_KEY = 'dUy5fW1uKlrM5QhG1yv6V9200Sc2IDOX';
            let ext = 'json';

            let apiCall = `https://${baseURL}/search/${versionNumber}/geocode/${query}.${ext}?key=${API_KEY}`;


            axios.get(apiCall)
                .then(response => {

                    let newData = response.data.results
                    console.log(newData[0].position);
                    let input = newData[0].position

                    revampArray[i].latlng = input
                    fs.writeFileSync('./revampFinal.json', JSON.stringify(revampArray), 'utf8')

                }).catch(error => {
                    // console.log(error);
                });

        }

    })
}

// function saveRevamp(revamp) {
//     fs.writeFileSync('./revampFinal.json', JSON.stringify(revamp), 'utf8')
// }