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
                            <h2 class="title">${noticia.title}</h2>
                            <ul class="ul-relatedItems">
                                ${noticia.relatedItems.forEach(item => {`
                                    <li>
                                        <a href="${item.relatedLink}" class="subItem">
                                            ${item.relatedTitle}
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

window.onload = () => page()
