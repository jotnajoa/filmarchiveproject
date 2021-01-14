const fs = require('fs')
const axios = require('axios')
const request = require('request');
const async = require('async')

// place none인 경우에는 그냥 냅두고
let myData = [];
let checking = [];

let continent = [
    'Asia', 'Africa', 'Europe', 'Oceania', 'South America', 'Central America'
]

console.log(myData);
// var str = "Hello world, welcome to the universe.";
// var n = str.includes("world");

let incoming = fs.readFileSync('./dataset.json');
let data = JSON.parse(incoming);



for (let datum of data) {

    let placecheck = false;
    let areaempty = false;

    continent.forEach((d) => {

        //각각의 element의 place가 대륙이름을 포함하고있는지 확인
        if (datum.place.includes(d)) {
            placecheck = true;
        } else {
            null
        }

        // 만약에 place가 대륙이름을 갖고있다면, area가 none인지 확인해서, none이 아니라면,swap해라
        if (placecheck && datum.area != 'none') {
            // console.log(datum.area);
            let actualArea = datum.place;
            let actualPlace = datum.area;

            datum.place = actualPlace;
            datum.area = actualArea
        }

    })

    if (datum.date != 'none') {

        if (datum.place != 'none' || datum.area != 'none') {
            myData.push(datum)
        } else if (datum.place == 'none' && datum.area == 'none') {
            if (datum.type.includes('YouTube')) {
                myData.push(datum)
            } else {
                checking.push(datum)
                console.log('this is useless', datum);
            }
        }
    } else { null }

}

// fs.writeFileSync('./test.json', JSON.stringify(myData), 'utf-8')

fs.writeFileSync('./test.json', JSON.stringify(myData), 'utf-8')
fs.writeFileSync('./checking.json', JSON.stringify(checking), 'utf-8')




// date==none이면 무조건 빼고 place랑 area가 둘다 none인데 youtube도 아니다? 이것도 뺀다
/*
iteratethrough를해서, place를 체크해서, cotinent중에 하나라도 includes한다
그러면, area가 none이 아닌경우에 place와 area를 swap한다 (이거먼저)

만약에 place가 none인데 area가 none이 아니면, 
id를 뱉어내봐

*/