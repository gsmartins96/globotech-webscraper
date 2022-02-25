const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function search(){
    const url = 'https://g1.globo.com';
    const news = []

    try {
        const { data } = await axios.get(url)
        const html = data;
        const $ = cheerio.load(html)

        $('.feed-post-body', html).each((i, element) => {
            var relatedItems = []
            var noticeLink = $(element).find('.feed-post-link').attr("href")
            var title = $(element).find('.feed-post-link').text()                       // Item 2
            var image = $(element).find('.feed-media-wrapper').find('a').attr("href")   // Item 4
            var subtitle = $(element).find('.feed-post-header-chapeu').text()           // Item 1

            $(element).find('.bstn-relateditems').each((i, link) => {                   // Item 3
                $(link).find('a').each((i, text) => {
                    relatedItems.push({
                        relatedTitle: $(text).text(),
                        relatedLink: $(text).attr("href")
                    })                                   
                })
            })

            news.push({
                title,
                relatedItems,
                image,
                noticeLink,
                subtitle
            })
         })
    } catch (err) {
        console.log(err)
    }

    fs.writeFile(`${__dirname}/title.json`,  JSON.stringify(news, null, '\t'), 'utf-8', err => {
        if (err) {
          console.error(err)
          return
        }
    })
}

search()