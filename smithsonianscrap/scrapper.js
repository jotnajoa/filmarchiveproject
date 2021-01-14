const puppeteer = require('puppeteer');
const URL = 'https://collections.si.edu/search/results.htm?q=&fq=data_source%3A%22Human+Studies+Film+Archives%22&start=0';
const doSplit = str => {
    const [, ...arr] = str.match(/(\d*)([\s\S]*)/);
    return arr;
};

const regex = /[(]/g;
let counter = 0;
const scrapper = {
    browser: null,
    pages: null,

    initialize: async() => {

        scrapper.browser = await puppeteer.launch({
            headless: false
        });

        scrapper.page = await scrapper.browser.newPage();

        await scrapper.page.goto(URL, { waitUntil: 'networkidle0' });
    },

    getResults: async(nr) => {
        let results = [];
        do {
            let new_results = await scrapper.parseResults();
            results = [...results, ...new_results];

            if (results.length < nr) {
                let nextPageButton;
                let length = await scrapper.page.$$('div[id="results-paging"]>ul>li>a:not(.page)')
                length = Array.from(length).length

                console.log(length);


                if (length == 2) {
                    console.log('length is 2');
                    nextPageButton = await scrapper.page.$$('div[id="results-paging"]>ul>li>a:not(.page)', el => el[1])
                    nextPageButton = nextPageButton[1]
                } else if (length == 1)(
                    nextPageButton = await scrapper.page.$('div[id="results-paging"]>ul>li>a:not(.page)')
                )

                // nextpagebutton을 querySelector로 찾아내서, 저장한다
                // puppeteer를 보면, self.page.$() 이것은 document.querySelector()와 같은것이고
                // self.page.$$() 이것은 document.querySelectorAll()와 같다고 보면된다


                if (nextPageButton) {

                    await nextPageButton.click();
                    await scrapper.page.waitForNavigation({ waitUntil: 'networkidle0' })
                        // 완전히 load될 때 까지 기다리라는 말이다

                } else {
                    break;
                    // do while loop를 끊어버리는 것이다
                }
            }

        }
        while (results.length < nr);
        return results.slice(0, nr)
    },

    parseResults: async() => {

        let elements = await scrapper.page.$$('.listing>div[class="record inactive-record"]');


        let results = [];
        // siteTable이라는 id에서 div 중에 'thing'이라는 이름이 들어간 class를 모두 선택한다
        // elements는 이제 이 모든것을 holding하고있다고 보면된다 $$두개를 쓰면 여러개의 아이템을 홀딩한다는 의미라는데
        // 뭔개소리임?

        for (let element of elements) {
            counter++;

            let title = 'none'
            let type = 'none';
            let date = 'none';
            let place = 'none';
            let id = 'none';
            let area = 'none'

            let titleTrue = await element.$('div[class="span10"]>h2').then(res => !!res);

            if (titleTrue) {
                title = await element.$eval(('div[class="span10"]>h2'), node => node.textContent.trim())
            }
            // 나중에 date가 none인 애들 솎아내야함

            let detailTypeTrue = await element.$('dd[class="objectType"]').then(res => !!res);
            let generalTypeTrue = await element.$('dt[class="objectType-first"]').then(res => !!res);
            if (counter == 11) {
                console.log('---------');
            }

            if (detailTypeTrue && generalTypeTrue) {


                let dltypeCheck = await element.$eval(('dd[class="objectType"]'), node => node.textContent.trim())
                let gtypeCheck = await element.$eval(('dt[class="objectType-first"]'), node => node.textContent.trim())




                if (dltypeCheck == "Collection descriptions" || dltypeCheck == "Archival materials") {
                    type = await element.$eval(('dd[class="objectType-first"]'), node => node.textContent.trim())
                } else if (gtypeCheck == "Collection descriptions" || gtypeCheck == "Archival materials") {
                    type = await element.$eval(('dd[class="objectType"]'), node => node.textContent.trim())
                }


            } else if (!detailTypeTrue && generalTypeTrue) {
                type = await element.$eval(('dt[class="objectType-first"]'), node => node.nextElementSibling.textContent.trim())

            } else {
                null
            }


            let detailDateTrue = await element.$('dd[class="unitdate-first"]').then(res => !!res);
            let generalDateTrue = await element.$('dd[class="date-first"]').then(res => !!res);
            if (generalDateTrue && detailDateTrue) {
                let predate = await element.$eval(('dd[class="date-first"]'), node => node.textContent.trim());
                date = doSplit(predate)[0]

            } else if (generalDateTrue && !detailDateTrue) {
                date = await element.$eval(('dd[class="date-first"]'), node => node.textContent.trim());

            }

            let placeTrue = await element.$('dd[class="place"]').then(res => !!res);
            let areaTrue = await element.$('dd[class="place-first"]').then(res => !!res);

            if (counter == 11) {
                console.log(placeTrue);
                console.log(areaTrue);
            }

            if (placeTrue && areaTrue) {

                place = await element.$eval(('dd[class="place"]'), node => node.textContent.trim())
                area = await element.$eval(('dd[class="place-first"]'), node => node.textContent.trim())



            } else if (!placeTrue && areaTrue) {

                let checkToogeneral = await element.$eval(('dd[class="place-first"]'), node => node.textContent.trim())

                if (checkToogeneral == 'International') {
                    place = 'none';
                } else {
                    place = await element.$eval(('dd[class="place-first"]'), node => node.textContent.trim())
                    area = await element.$eval(('dd[class="place-first"]'), node => node.textContent.trim())

                }

            } else {
                null
            }

            let idTrue = await element.$('dl[class="details edan-url"]>dd').then(res => !!res);
            if (idTrue) {
                id = await element.$eval(('dl[class="details edan-url"]>dd'), node => node.textContent.trim())
            } else {
                null
            }

            place = place.split(regex)[0];
            area = area.split(regex)[0];


            results.push({
                title,
                type,
                date,
                place,
                id,
                area
            })

        }

        return results

    }


}

module.exports = scrapper;