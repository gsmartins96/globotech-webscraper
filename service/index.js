const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const create = require('../page/createPage')

async function main(){
    if(await getPageInfo()){
        const news = await readFile();

        create.page()
    }
}

async function getPageInfo(){
    const url = 'https://g1.globo.com';
    var noticeLink, title, image, subtitle
    var relatedItems = []
    const news = []

    try {
        const { data } = await axios.get(url)
        const html = data;
        const $ = cheerio.load(html)

        $('.feed-post-body', html).each((i, element) => {
            relatedItems = []
            noticeLink = $(element).find('.feed-post-link').attr("href")
            title = $(element).find('.feed-post-link').text()                       // Item 2
            image = $(element).find('.bstn-fd-picture-image').attr("src")   // Item 4
            subtitle = $(element).find('.feed-post-header-chapeu').text()           // Item 1

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

    fs.writeFileSync(`${__dirname}/news.json`,  JSON.stringify(news, null, '\t'), "utf8")
    if(news.length != null){
        return true
    } else {
        return false
    }
}

async function readFile(){
    var news;
    try{
        news = fs.readFileSync(`${__dirname}/news.json`, 'utf-8')
    } catch (err) {
        console.error(err)
    }

    return news
}

main()
