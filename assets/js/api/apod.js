export default async function api(date="", count="", start_date="", end_date="", secao) {
    if(date !== "") {
        url = `https://api.nasa.gov/planetary/apod?api_key=D11v7QjGEbaTNyv33dKUWZVE2Dt6qwU9jFca9Uhg&date=${date}`;
    }else if(start_date !== "" || end_date !== "") {
        url = `https://api.nasa.gov/planetary/apod?api_key=D11v7QjGEbaTNyv33dKUWZVE2Dt6qwU9jFca9Uhg&start_date=${start_date}&end_date=${end_date}`;
    }else if(count !== "") {
        url = `https://api.nasa.gov/planetary/apod?api_key=D11v7QjGEbaTNyv33dKUWZVE2Dt6qwU9jFca9Uhg&count=${count}`;
    }else {
        url = `https://api.nasa.gov/planetary/apod?api_key=D11v7QjGEbaTNyv33dKUWZVE2Dt6qwU9jFca9Uhg&count=${count}&date=${date}&start_date=${start_date}&end_date=${end_date}`;
    }

    const apod = await fetch(url);
    const apodJSON = await apod.json();

    colocaImagemNaPagina(apodJSON, secao);
}

function colocaImagemNaPagina(urls, secao) {
    if(secao.dataset.resultadoApi === "resultadoApi") {
        secao.innerHTML = "";
    }

    if(urls.length === 1) {
        const blocoImagemDireito = `
        <div>
            <img src="${urls[0].url}" alt="Exemplo de uma imagem astronômica dada pela API" class="sobre-api__imagem-exemplo" data-imagem-exemplo>
            <h4 class="sobre-api__nome-imagem">Título: ${urls[0].title}</h4>
            <span class="sobre-api__direito-autoral">Autor: ${urls[0].copyright}</span>
            <a href="${urls[0].hdurl}" target="_blank" rel="external" class="sobre-api__link-hd">Link para imagem em HD</a>
        </div>
        `;
        
        secao.innerHTML += blocoImagemDireito;
    }else if(urls.length > 1) {
        urls.forEach(url => {
            const blocoImagemDireito = `
            <div>
                <img src="${url.url}" alt="Exemplo de uma imagem astronômica dada pela API" class="sobre-api__imagem-exemplo" data-imagem-exemplo>
                <h4 class="sobre-api__nome-imagem">Título: ${url.title}</h4>
                <span class="sobre-api__direito-autoral">Autor: ${url.copyright}</span>
                <a href="${url.hdurl}" target="_blank" rel="external" class="sobre-api__link-hd">Link para imagem em HD</a>
            </div>
            `;

            secao.innerHTML += blocoImagemDireito;
        });
    }else {
        const blocoImagemDireito = `
        <div>
            <img src="${urls.url}" alt="Exemplo de uma imagem astronômica dada pela API" class="sobre-api__imagem-exemplo" data-imagem-exemplo>
            <h4 class="sobre-api__nome-imagem">Título: ${urls.title}</h4>
            <span class="sobre-api__direito-autoral">Autor: ${urls.copyright}</span>
            <a href="${urls.hdurl}" target="_blank" rel="external" class="sobre-api__link-hd">Link para imagem em HD</a>
        </div>
        `;
        
        secao.innerHTML += blocoImagemDireito;
    }
}

let url;
