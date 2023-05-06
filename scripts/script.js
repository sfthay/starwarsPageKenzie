async function renderizaCards() { //Assync, pois precisa carregar a função "fora do tempo do JS";
    
    const lista = document.querySelector('#cardList') //Serve para acessar o HTML;
    
    lista.innerHTML = "" //Vai inserir HTML na UL; Nesse caso, uma string vazia, limpando a lista e evitando que as mesmas informações sejam renderizadas várias vezes;

    const listaDeDados = await fetch('https://swapi.dev/api/people', {//Vai buscar na API as informações que eu preciso para renderizar na tela e esperar o retorno; // É o fetch que vai na API buscar as informações; No HTML é correspondente à UL;
        method: "GET"
    })

    .then(function(resposta) {
        return resposta.json() //Ou seja, o JS vai pegar a resposta da API e transformar em JSON;
    })

    for(let indice = 0; indice < listaDeDados.results.length; indice++) { // Vai repetir enquanto a caixinha tiver elementos; Vai criar HTML;
        const elemento = listaDeDados.results[indice] //Informa qual posição será utilizada;
        
        const li = document.createElement("li") //Cria a tag li no HTML;

        const divFrente = document.createElement("div")

        const divVerso = document.createElement("div")

        const divNomeFrente = document.createElement("div")

        const divNomeVerso = document.createElement("div")

        const listaDados = document.createElement("ul")

        const anoNasc = document.createElement("li")

        const planeta = document.createElement("li")

        const imagem = document.createElement("img")

        li.classList.add('card', 'listCard') //Adicionar classe nas tags, de acordo com o HTML base;
        divFrente.classList.add('face');
        divFrente.classList.add('front');

        divNomeFrente.classList.add('titleCard')
        divNomeFrente.innerText = elemento.name // Adiciona o nome, com base no JSON recebido;
        
        divNomeVerso.classList.add('titleCard')
        divNomeVerso.innerText = elemento.name 

        listaDados.classList.add('cardData')

        anoNasc.innerHTML = 'Ano de Nascimento: ' + elemento.birth_year

        const nomePlaneta = await fetch(elemento.homeworld, {
            method: "GET"
        })
    
        .then(function(resposta) {
            return resposta.json() 
        })

        planeta.innerText = 'Planeta: ' + nomePlaneta.name

        divVerso.classList.add('face', 'back')

        imagem.src = "./assets/starduck.png"
        imagem.alt = "starduck"

        listaDados.append(anoNasc, planeta) //Determina que listaDados insira ambas as informações em sua estrutura;
        divFrente.append(divNomeFrente, listaDados)
        divVerso.append(divNomeVerso, imagem)
        li.append(divFrente, divVerso)
        lista.append(li)
    }
    viraCard()
}

function viraCard() {
    const cards = document.querySelectorAll('.listCard') //Selecionar tudo o que contém essa classe;

    for(let indice = 0; indice < cards.length; indice++) {

        const card = cards[indice] //A cada passada do FOR o card será uma LI diferente;

        card.addEventListener('click', function(){
            card.classList.toggle('flip')
        })

    }
}

renderizaCards()