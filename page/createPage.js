const fs = require('fs');

async function page(){
    const news = await readFile()

    JSON.parse(news).forEach((noticia, i) => {
        console.log('Noticia: ', noticia)
        console.log('---------------------------------------------')
        document.querySelector('container').insertAdjacentHTML("afterbegin",`
            <div class="image-container">
                <img 
                    src="${noticia.image}"
                    class="image"
                />
            </div>
            <div>
                <h2 class="title">${noticia.title}</h2>
                <ul class="ul-relatedItems">
                    <li>
                        <a href="https://g1.globo.com/mundo/noticia/2022/02/25/guerra-na-ucrania-kiev-tem-registros-de-explosoes-pelo-2o-dia-apos-invasao-pela-russia.ghtml" class="subItem">
                            Putin admite negociar, mas incentiva golpe militar na Ucrânia
                        </a>
                    </li>
                </ul>
            </div>
        `)
    })
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

page()

