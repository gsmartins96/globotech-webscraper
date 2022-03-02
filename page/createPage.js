function page(){
    fetch('../webCrawler/news.json')
        .then(response => response.json()) 
        .then(news => 
            news.forEach(noticia => {
                document.querySelector('.main_container').insertAdjacentHTML("afterbegin", `
                    <div class="container">
                        <div class="image-container">
                            <img 
                                src="${noticia.image}"
                                class="image"
                            />
                        </div>
                        <div>
                            ${noticia.subtitle !== "" ? `<span>${noticia.subtitle}</span>` : ""}
                            <h2 class="title"<a href="${noticia.noticeLink}" target="_blank">${noticia.title}</h2>
                            <ul class="ul-relatedItems">
                                ${noticia.relatedItems.length > 0 ?
                                    noticia.relatedItems.length === 1 ? `
                                        <li>
                                            <a href="${noticia.relatedItems[0].relatedLink}" class="subItem" target="_blank">
                                                ${noticia.relatedItems[0].relatedTitle}
                                            </a>
                                        </li>
                                    `:`
                                        <li>
                                            <a href="${noticia.relatedItems[0].relatedLink}" class="subItem" target="_blank">
                                                ${noticia.relatedItems[0].relatedTitle}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="${noticia.relatedItems[1].relatedLink}" class="subItem" target="_blank">
                                                ${noticia.relatedItems[1].relatedTitle}
                                            </a>
                                        </li>
                                `    
                                : ``}
                            </ul>
                        </div>
                    </div>
                `)
            })
        )  
}

window.onload = () => page()
