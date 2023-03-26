let misCamisetas = document.getElementById('misCamisetas')
let miCarrito = document.getElementById('miCarrito')
let totalaPagar = document.getElementById('totalaPagar')
let verCarrito = document.getElementById('verCarrito')
let contenedorResultado = document.getElementById('contenedorResultado')
let botonBuscador = document.getElementById('botonBuscador')
let resultadoBuscador = document.getElementById('resultadoBuscador')


let camisetas = [];
let carrito = [];
let noRepetirCarrito = []
let pagoTotalPorCamiseta = [];


class NuevaCamiseta {
    constructor(id, foto, equipo, descripcion, precio, cantidad) {
        this.id = id;
        this.foto = foto;
        this.equipo = equipo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}


//--------------------------------------------FUNCION PARA SWEET ALERT

function sweetAlert(titulo, texto, icono, boton) {
    swal({
        title: titulo,
        text: texto,
        icon: icono,
        button: boton,
    });
}


//--------------------------------------------FUNCION PARA INGRESAR AL LOCALSTORAGE

function ingresarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor))
}


//--------------------------------------------FUNCION PARA SUMAR CON SPREAD

function sumar(...todosLosNumeros) {
    const resultado = todosLosNumeros.reduce(
        (prevValue, nextValue) => prevValue + nextValue,
        0
    );
    return resultado
}


//--------------------------------------------FUNCION PARA MOSTRAR LAS CAMISETAS

function mostrarCamisetas(valor, donde) {

    tituloNew.innerHTML = '<h2>- NEW -</h2>'

    let contenedorLiCamisetas = document.createElement('div')
    contenedorLiCamisetas.className = 'contenedorLiCamisetas'
    donde.appendChild(contenedorLiCamisetas)

    //muestra por pantalla las camisetas guardadas
    for (let i = 0; i < valor.length; i++) {

        let liCamisetas = document.createElement('li')
        liCamisetas.className = 'liCamisetas'
        liCamisetas.innerHTML = `
                <img src="${valor[i].foto}" alt="">
                <h3 class="item-equipo">${valor[i].equipo}</h3>
                <p>${valor[i].descripcion}</p>
                <div class="cantPrecio">
                    <form action="" id="formulario">
                        <input type="number" class="inputCounter" value="1">
                    </form>
                    <h5>$${valor[i].precio}</h5>
                </div>
            `
        contenedorLiCamisetas.appendChild(liCamisetas)

        let botonEnviar = document.createElement('button')
        botonEnviar.className = 'botonEnviar'
        botonEnviar.innerHTML = `<p>Agregar al Carrito</p>`
        liCamisetas.appendChild(botonEnviar)

        //creo evento a boton para enviar al carrito
        botonEnviar.addEventListener('click', valorCounterIngresarStorage)

        function valorCounterIngresarStorage() {

            let inputCounterValor = inputCounter[i].value;

            if (inputCounterValor <= 0) {
                sweetAlert('error', 'Debe ingresar cantidad mayor a 0', 'error', 'Continuar');
            } else {

                Toastify({
                    text: "Elemento nuevo en el carrito!",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#00d4ff6b",
                        color: "#020024",
                    }
                }).showToast();

                valor[i]['cantidad'] = inputCounterValor;

                carrito.push(valor[i])

                carrito = [... new Set(carrito)]

                ingresarLocalStorage('CARRITO', carrito)

                document.getElementById("formulario").reset()
            }

            sumaTotal(carrito)

        }

        //cantidad de camisetas seleccionadas por el cliente
        inputCounter[i] = inputCounter

    }

}


//--------------------------------------------FUNCION PARA SUMAR

function sumaTotal(queCarrito) {

    let resultadoSumaPorCamiseta = 0;
    let resultadoSuma = 0;

    if (pagoTotalPorCamiseta !== '') {

        pagoTotalPorCamiseta.splice(0, pagoTotalPorCamiseta.length)
        sumaDePreciosCamiseta()

    } else {

        sumaDePreciosCamiseta()

    }

    function sumaDePreciosCamiseta() {

        for (let i = 0; i < queCarrito.length; i++) {

            let precio = Number(queCarrito[i].precio)
            let cantidad = Number(queCarrito[i].cantidad)

            resultadoSumaPorCamiseta = precio * cantidad;

            pagoTotalPorCamiseta.push(resultadoSumaPorCamiseta)
        }

        resultadoSuma = sumar(...pagoTotalPorCamiseta)

    }

    let imprimirMonto = document.createElement('h4')
    imprimirMonto.innerHTML = `$ ${resultadoSuma}`
    totalaPagar.innerHTML = '';
    totalaPagar.appendChild(imprimirMonto)

}


//--------------------------------------------MUESTRA CAMISETAS INGRESADAS EN EL CARRITO

function muestroElementosCarro() {

    let valorCarrito = JSON.parse(localStorage.getItem('CARRITO'))

    resultadoBuscador.innerHTML = '';

    if (valorCarrito.length > 0) {

        let tituloCarrito = document.createElement('h2')
        tituloCarrito.innerHTML = '<h2>MI CARRITO</h2>'
        resultadoBuscador.appendChild(tituloCarrito)

        mostrarCamisetasDelCarrito();

    } else {
        mostrarCamisetasDelCarrito();
    }

    //creacion de la camiseta junto al boton eliminar
    function mostrarCamisetasDelCarrito() {
        for (let i = 0; i < valorCarrito.length; i++) {

            let liMuestroProductosCarrito = document.createElement('li')
            liMuestroProductosCarrito.className = 'liMuestroProductosCarrito'
            liMuestroProductosCarrito.innerHTML = `
            <div class="contenedorDatosCarrito">
                <img src="${valorCarrito[i].foto}" alt="">
                <div class="contenedorInfoCarrito">
                <h3 class="item-equipo">${valorCarrito[i].equipo}</h3>
                <p>Cantidad: ${valorCarrito[i].cantidad}</p>
                <h5>Precio x Uni.: $${valorCarrito[i].precio}</h5>
                </div>
            </div>

             `
            resultadoBuscador.appendChild(liMuestroProductosCarrito)

            let botonEliminar = document.createElement('button')
            botonEliminar.className = 'botonEliminar'
            botonEliminar.innerHTML = `
            <img src="image/deleteIcon.png" alt="">
            `;
            liMuestroProductosCarrito.appendChild(botonEliminar)

            botonEliminar.addEventListener('click', () => {

                let dondeEliminar = valorCarrito.indexOf(valorCarrito[i]);
                carrito.splice(dondeEliminar, 1)

                ingresarLocalStorage('CARRITO', carrito)

                muestroElementosCarro()
            })

        }
        sumaTotal(carrito)
    }

}


//--------------------------------------------CAMISETAS DE LA TIENDA

let argentina = new NuevaCamiseta("ARGENTINA", `image/camiseta/arg22.jpg`, `Argentina`, `Camiseta titular 2022`, 5000)
let argentinaAway = new NuevaCamiseta("ARGENTINA", `image/camiseta/argAway22.jpg`, `Argentina Away`, `Camiseta suplente 2022`, 3000)
let colombia = new NuevaCamiseta("COLOMBIA", `image/camiseta/col22.jpg`, `Colombia`, `Camiseta titular 2022`, 5000)
let alemania = new NuevaCamiseta("ALEMANIA", `image/camiseta/ger22.jpg`, `Alemania`, `Camiseta titular 2022`, 6000)
let alemaniaAway = new NuevaCamiseta("ALEMANIA", `image/camiseta/gerAway22.jpg`, `Alemania Away`, `Camiseta suplente 2022`, 3000)
let hungria = new NuevaCamiseta("HUNGRIA", `image/camiseta/hung22.jpg`, `Hungría`, `Camiseta titular 2022`, 1000)
let japon = new NuevaCamiseta("JAPON", `image/camiseta/japan22.jpg`, `Japón`, `Camiseta titular 2022`, 6000)
let japonAway = new NuevaCamiseta("JAPON", `image/camiseta/japanAway22.jpg`, `Japón Away`, `Camiseta suplente 2022`, 3000)
let serbia = new NuevaCamiseta("SERBIA", `image/camiseta/serb22.jpg`, `Serbia`, `Camiseta titular 2022`, 8000)
let espana = new NuevaCamiseta("ESPAÑA", `image/camiseta/spain22.jpg`, `España`, `Camiseta titular 2022`, 4000)
let espanaAway = new NuevaCamiseta("ESPAÑA", `image/camiseta/spainAway22.jpg`, `España Away`, `Camiseta suplente 2022`, 3000)

//ingreso al array y luego se pasan al local storage
camisetas.push(argentina, argentinaAway, colombia, alemania, alemaniaAway, hungria, japon, japonAway, serbia, espana, espanaAway)
ingresarLocalStorage('CAMISETAS', camisetas)


let tituloNew = document.createElement('h2')
misCamisetas.appendChild(tituloNew)

let ulContenedor = document.createElement('ul')
ulContenedor.className = 'ulContenedor'
misCamisetas.appendChild(ulContenedor)

//trae datos guardados en el localStorage
let valorPrimero = JSON.parse(localStorage.getItem('CAMISETAS'))
let inputCounter = document.getElementsByClassName('inputCounter');


//--------------------------------------------ADJUDICA EVENTO AL BOTON PARA VER LAS CAMISETAS INGRESADAS

verCarrito.addEventListener('click', mostrameCarrito)

function mostrameCarrito() {

    let valorCarrito = JSON.parse(localStorage.getItem('CARRITO'))

    valorCarrito.length > 0 ? muestroElementosCarro() : muestroError();

    function muestroError() {
        sweetAlert('error', 'Carrito de compras esta vacio...', 'error', 'Continuar');
    }
}


//--------------------------------------------ADJUDICA EVENTO AL BOTON PARA EL BUSCADOR

botonBuscador.addEventListener('click', mostrarBuscado)

function mostrarBuscado(e) {

    resultadoBuscador.innerHTML = '';

    e.preventDefault()

    let buscarPorNombreValue = document.getElementById('buscarPorNombre').value;
    let buscarPorPrecioValue = document.getElementById('buscarPorPrecio').value;

    let camisetasStorage = JSON.parse(localStorage.getItem('CAMISETAS'))

    //--------------------------------------------BUSCA POR EQUIPO

    const coincidenEquipos = camisetasStorage.filter(dato => (dato.id.toUpperCase()) === (buscarPorNombreValue.toUpperCase()));

    //--------------------------------------------BUSCA POR PRECIO

    const precioMenorQue = camisetasStorage.filter(dato => dato.precio <= buscarPorPrecioValue);

    if ((buscarPorPrecioValue === '') && (buscarPorNombreValue !== '')) {

        coincidenEquipos.length >= 1 ? mostrarCoincidenEquipos() : sweetAlert('error', 'El equipo que busca no lo tenemos', 'error', 'Continuar')

        function mostrarCoincidenEquipos() {

            let tituloResultado = document.createElement('h2')
            tituloResultado.className = 'tituloResultado'
            tituloResultado.innerHTML = 'BUSQUEDA POR EQUIPO:'
            resultadoBuscador.appendChild(tituloResultado)
            mostrarCamisetas(coincidenEquipos, resultadoBuscador)
        }


    } else if ((buscarPorPrecioValue !== '') && (buscarPorNombreValue === '')) {

        precioMenorQue.length >= 1 ? mostrarPrecioMenorQue() : sweetAlert('error', 'No hay camisetas menores al precio ingresado', 'error', 'Continuar')

        function mostrarPrecioMenorQue() {
            let tituloResultado = document.createElement('h2')
            tituloResultado.className = 'tituloResultado'
            tituloResultado.innerHTML = 'BUSQUEDA POR PRECIO:'
            resultadoBuscador.appendChild(tituloResultado)
            mostrarCamisetas(precioMenorQue, resultadoBuscador)
        }

    } else if ((buscarPorPrecioValue !== '') && (buscarPorNombreValue !== '')) {

        coincidenEquipos.length >= 1 ? mostrarCoincidenEquipos() : sweetAlert('error', 'El equipo que busca no lo tenemos', 'error', 'Continuar')

        function mostrarCoincidenEquipos() {

            let tituloResultado = document.createElement('h2')
            tituloResultado.className = 'tituloResultado'
            tituloResultado.innerHTML = 'BUSQUEDA POR EQUIPO:'
            resultadoBuscador.appendChild(tituloResultado)
            mostrarCamisetas(coincidenEquipos, resultadoBuscador)
        }

        precioMenorQue.length >= 1 ? mostrarPrecioMenorQue() : sweetAlert('error', 'No hay camisetas menores al precio ingresado', 'error', 'Continuar')

        function mostrarPrecioMenorQue() {
            let tituloResultado = document.createElement('h2')
            tituloResultado.className = 'tituloResultado'
            tituloResultado.innerHTML = 'BUSQUEDA POR PRECIO:'
            resultadoBuscador.appendChild(tituloResultado)
            mostrarCamisetas(precioMenorQue, resultadoBuscador)
        }

    } else {

        sweetAlert('error', 'No ha ingresado datos para buscar', 'error', 'Continuar')

    }

    document.getElementById("buscador").reset()

}

mostrarCamisetas(valorPrimero, ulContenedor)
sumaTotal(carrito)


