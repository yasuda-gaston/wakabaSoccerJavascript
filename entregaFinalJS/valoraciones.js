let valoraciones = document.getElementById('valoraciones')


let frases = ["Muy buena calidad!", "Excelente atencion!", "Todo muy rapido!", "Buena opción para regalos!"];


for (let i = 0; i < 4; i++) {

    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            let divCard = document.createElement('div')
            divCard.className = 'divCard';
            divCard.innerHTML = `
            <img src="${data.results[0].picture.large}">
            <div class="textContainer">
                <h3>${data.results[0].name.first} ${data.results[0].name.last}</h3>
                <h5>${frases[i]}</h5>
                <p>from ${data.results[0].location.country}</p>
            </div>
            `
            valoraciones.appendChild(divCard)
        })


}

