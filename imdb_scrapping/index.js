const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const movies = ["https://www.imdb.com/title/tt6468322/?ref_=hm_fanfav_tt_2_pd_fp1",
    "https://www.imdb.com/title/tt7286456/?ref_=hm_fanfav_tt_4_pd_fp1",
    "https://www.imdb.com/title/tt0169547/?ref_=hm_stp_pvs_piv_tt_3",
    "https://www.imdb.com/title/tt8299768/?ref_=hm_stp_pvs_piv_tt_2",];


(async () => {
    try {
        let imdbData = [];
        for (let movie of movies) {
            const response = await request({
                uri: movie,
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en - GB, en - US; q = 0.9, en; q = 0.8"
                },
                gzip: true
            });
            let $ = cheerio.load(response);
            console.log($('div[class="subtext"] > time').text().trim())
            let title = $('div[class="title_wrapper"] > h1').text().trim()
            let rating = $('div[class="ratingValue"] > strong > span').text()
            let summary = $('div[class="summary_text"]').text().trim()
            let releaseDate = $('a[title="See more release dates"]').text().trim()
            let poster = $('div[class="poster"] > a > img').attr('src')


            imdbData.push({
                title, rating, summary, releaseDate,poster,
            });
        }
        const j2cp = new json2csv();
        const csv = j2cp.parse(imdbData);
        fs.writeFileSync("./imdb.csv", csv, "utf-8");
        // console.log(imdbData);
    }
    catch (err) {
        console.log(err.message);
    }
})();




