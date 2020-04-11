const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;



const url = "https://www.amazon.com/s?k=one+piece&ref=nb_sb_noss_2";



(async () => {
    try {
        let amazonData = [];
        fetchData();
    }
    catch (err) {
        console.log(err.message);
    }
})();


async function fetchData(){
    const response = request(url);
    const $ = cheerio.load(response);
    console.log($('div[class="sg-col-20-of-24 s-matching-dir sg-col-28-of-32 sg-col-16-of-20 sg-col sg-col-32-of-36 sg-col-8-of-12 sg-col-12-of-16 sg-col-24-of-28"]'));
}