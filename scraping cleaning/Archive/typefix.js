const fs = require('fs')
let result = [];
let myData = JSON.parse(fs.readFileSync('./typecleaned.json'))


myData.forEach((d) => {
    if (d.type == 'Motion pictures (visual works)') {
        d.type = 'Motion pictures'
    } else if (d.type == 'Dance' || d.type == 'Lectures' || d.type == 'Interviews' || d.type == 'Travelogs') {
        d.type = 'Video recordings'
    } else if (d.type == 'Songs' || d.type == 'Oral history') {
        d.type = 'Sound recordings'
    } else if (d.type == 'Books') {
        d.type = 'Archival materials'
    } else { null }
})

fs.writeFileSync('./typecomplete.json', JSON.stringify(myData), 'utf-8')
    // type중에 

// 'Motion pictures (visual works)' 를 'Motion pictures'로 바꿔야함

//'Dance','Lectures','Interviews','Travelogs' 는 Video recordings

// 'Songs' , 'Oral history'는 'Sound recordings'으로

// 'Books' 는 'Archival materials'



/*
let types=[];

myData.forEach((d)=>{
    types.push(d.type)
})

let unique = [...new Set(myArray)];

console.log(unique); 
// 이렇게 type set을 얻었다
*/