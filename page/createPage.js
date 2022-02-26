function page(){
    fetch('../webCrawler/news.json')
        .then(response => response.json()) 
        .then(news => 
            news.forEach((noticia, i) => {
                document.querySelector('.main_container').insertAdjacentHTML("afterbegin", `
                    <div class="container">
                        <div class="image-container">
                            <img 
                                src="${noticia.image}"
                                class="image"
                            />
                        </div>
                        <div>
                            <h2 class="title">${noticia.title}</h2>
                            <ul class="ul-relatedItems">
                            ${noticia.relatedItems.forEach((relatedItem, i) => {`
                                ${console.log(relatedItem.relatedTitle)}
                                <li>
                                    <a href="${relatedItem.relatedLink}" class="subItem">
                                        "${relatedItem.relatedTitle}"
                                    </a>
                                </li>
                            `})}
                            </ul>
                        </div>
                    </div>
                `)
            })
        )  
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

window.onload = () => page()
