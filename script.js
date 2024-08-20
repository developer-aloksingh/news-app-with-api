//api_key
function _0x1788(_0x35eda2,_0x5b5064){const _0xf09a83=_0xf09a();return _0x1788=function(_0x1788d0,_0x224877){_0x1788d0=_0x1788d0-0x71;let _0x143d21=_0xf09a83[_0x1788d0];return _0x143d21;},_0x1788(_0x35eda2,_0x5b5064);}const _0x20a07b=_0x1788;(function(_0x44e171,_0x42b1cc){const _0x55f2e0=_0x1788,_0x5d6f82=_0x44e171();while(!![]){try{const _0x2d589b=parseInt(_0x55f2e0(0x77))/0x1+parseInt(_0x55f2e0(0x7b))/0x2*(parseInt(_0x55f2e0(0x79))/0x3)+-parseInt(_0x55f2e0(0x7a))/0x4*(parseInt(_0x55f2e0(0x76))/0x5)+-parseInt(_0x55f2e0(0x71))/0x6+parseInt(_0x55f2e0(0x74))/0x7*(parseInt(_0x55f2e0(0x78))/0x8)+-parseInt(_0x55f2e0(0x72))/0x9+-parseInt(_0x55f2e0(0x73))/0xa;if(_0x2d589b===_0x42b1cc)break;else _0x5d6f82['push'](_0x5d6f82['shift']());}catch(_0x2c9310){_0x5d6f82['push'](_0x5d6f82['shift']());}}}(_0xf09a,0xc12e2));const API_KEY=_0x20a07b(0x75);function _0xf09a(){const _0x175f04=['724023977bc64f9b9890a4e33a7326e9','2455YiRbFN','1213828lCerZt','1032488hTbggD','44199TzTCdU','12nQfsFh','50DXaMjC','1282962kTuOAV','5375457fYfIsm','6236190HlZTgD','35IIAZMu'];_0xf09a=function(){return _0x175f04;};return _0xf09a();}


const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});