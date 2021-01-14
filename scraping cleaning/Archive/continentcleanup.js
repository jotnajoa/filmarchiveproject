const fs = require('fs')

let dataforcont = JSON.parse(fs.readFileSync('./typecomplete.json'))
let tobeAfrica = [
    'Abomey, Dahomey',
    'Algeria', 'Ceylon', 'Chad', 'Congo ', 'Egypt', 'Elmina ', 'Ethiopia', 'Ituri Rainforest, Zaire', 'Kampala, Uganda', 'Kenya', 'Mali', 'Maragoli, Kenya', 'Nigeria', 'Sudan', 'Tanzania', 'Turkana', 'Uganda', 'White Nile', 'Yemen'
];
// .includes('Africa')

let tobeAsia = [
    'Afghanistan', 'Bali', 'Bangkok, Thailand', 'Bangladesh', 'Beijing ', 'Bhutan', 'Bombay ', 'Burma', 'China', 'Darjeeling ', 'Delhi, India', 'Delhi, India', 'Hokkaido, Japan', 'Hong Kong', 'India, Burkina-Fasu, Ivory Coast, Belize, Fiji, Trinidad, Tobago', 'Indonesia', 'Iran', 'Iraq', 'Irianjaya', 'Israel', 'Japan', 'Java', 'Kashmir ', 'Kastamandapa', 'Kathmandu', 'Korea', 'Kuwait', 'Ladakh', 'Laos', 'Luzon ', 'Macao', 'Macau', 'New Delhi  ', 'Nilgiri Hills, India', 'Northern India', 'Pakistan', 'Pashupatinath', 'Patan, Gujerat, India', 'Philippines', 'Russia', 'Shanghai ', 'Singapore', 'Sri Lanka', 'Sumatra', 'Svayambu', 'Szechuwan Province', 'Taiwan', 'Thailand', 'Thailand, Maesai', 'Tibet', 'Turkey', 'Vietnam'
];

let tobeArctic = ["Arctic", "Arctic regions", "Ellesmere Island, Canadian Arctic", "Yup'ik"];

let tobeCentralAmerica = ['Caribbean', 'Central America', 'Central America, Oaxaca', 'Haiti', 'Jamaica', 'Mexico', 'Mirebalais, Haiti', 'Panama', 'Puerto Rico', 'Taos'];
let tobeEurope = ['Albania', 'Alps', 'Australia', 'Austria', 'Belgium', 'Croatia', 'Dalmatia,Yugoslavia', 'Denmark', 'England', 'Europe', 'France', 'Germany', 'Great Britain', 'Greece', 'Greenland', 'Holland', 'Ireland', 'Italy', 'Montenegro', 'Moscow', 'Netherlands', 'Norway', 'Portugal', 'Romania', 'Scotland', 'Serbia', 'Spain', 'Swaziland', 'Switzerland', 'Yugoslavia', ];

let tobeNorthAmerica = ['Alaska', 'America', 'Apache', 'Appalachian Region', 'Arizona', 'British Columbia', 'California', 'Canada', 'Cherokee', 'Cheyenne', 'Colorado', 'Comanche', 'curanderismo', 'Everglades ', 'Florida', 'Gallup, New Mexico', 'Grand Canyon ', 'Great Plains', 'Hawaii', 'Iroquois', 'Kalahari', 'Kentucky', 'Lake States', 'Mesa Verde ', 'Mesa Verde, Colorado', 'Navajo', 'Nebraska', 'New Jersey', 'New Mexico', 'New York', 'New York ', 'Nome Alaska', 'North America', 'Northern California', 'Northwestern States', 'Omaha', 'Oregon', 'Pennsylvania', 'Seminole', 'Sioux', 'South Dakota', 'Tennessee', 'The Americas', 'United States', 'United States of America', 'USA', 'Washington ', 'West Virginia', 'Western states ', 'Whiting Indiana', 'Wolf Mountains', 'Wyoming', 'Yellowstone National Park']
let tobeOceania = ['Arno Atoll', 'Cook Islands', 'Federated States of Micronesia', 'Fiji', 'Galapagos Islands', 'Gold Coast', 'Guam', 'Kiribati', 'Madagascar', 'Manua ', 'Melanesia', 'Micronesia', 'New Hebrides', 'Oceania', 'Papua New Guinea', 'Ponape ', 'Samoa', 'Sepik River ', 'Solomon Islands', 'Tuvalu', ];

let tobeSouthAmerica = ['Andes', 'Andes Region', 'Argentina', 'Aymara', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Cuba', 'Ecuador', 'Guyana', 'Maranhao, Brazil', 'Maranhao,Brazil', 'Matto Grosso', 'Mexico City', 'New Guinea', 'Peru', 'Surinam', 'Uruguay', 'Venezuela']

let tobeNone = ['Beth', 'International', 'Northwest, Pacific', 'seacoasts', 'Southwest, New']
let myData = [...dataforcont];




myData.forEach((d) => {

    if (d.area.includes('Africa')) {
        d.area = 'Africa'
    }
    tobeAfrica.forEach((t) => {
        if (d.area == t) {
            d.area = 'Africa'
        }
    });
    tobeAsia.forEach((t) => {
        if (d.area == t) {
            d.area = 'Asia'
        }
    });
    tobeArctic.forEach((t) => {
        if (d.area == t) {
            d.area = 'Arctic'
        }
    });
    tobeCentralAmerica.forEach((t) => {
        if (d.area == t) {
            d.area = 'Central America'
        }
    });
    tobeEurope.forEach((t) => {
        if (d.area == t) {
            d.area = 'Europe'
        }
    });
    tobeNorthAmerica.forEach((t) => {
        if (d.area == t) {
            d.area = 'North America'
        }
    });
    tobeOceania.forEach((t) => {
        if (d.area == t) {
            d.area = 'Oceania'
        }
    });
    tobeSouthAmerica.forEach((t) => {
        if (d.area == t) {
            d.area = 'South America'
        }
    });
    tobeNone.forEach((t) => {
        if (d.area == t) {
            d.area = 'none'
        }
    });


})


// fs.writeFileSync('./contcleaned.json', JSON.stringify(myData), 'utf-8')



let secondData = JSON.parse(fs.readFileSync('./contcleaned.json'))

let secondEmpty = [...secondData]

let secondtobeAsia = [
    'Ladakh ',
    'Namibia',
    'Szechuan, China',
    'Afhganistan',
    'Kathmandu ',
    'Manila',
    'Macau ',
    'India',
    'Nepal',
    'Middle East',
    'Cambodia',
    'Djakarta, Java',
    'Phillippines',
    'New Delhi '
]

let secondtobeNorthAmerica = ['Alberta']

secondEmpty.forEach((d) => {

    secondtobeAsia.forEach((t) => {
        if (d.area == t) {
            d.area = 'Asia'
        }
    })

    if (d.area == 'Alberta') {
        d.area = 'North America'
    }

})

fs.writeFileSync('./finalCont.json', JSON.stringify(secondEmpty), 'utf-8')