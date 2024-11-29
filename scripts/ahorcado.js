document.addEventListener('DOMContentLoaded', () => {

    const contendorLetras = document.getElementById('contenedorLetras');
    const contenedorPalabra = document.getElementById('contenedorPalabra');
    const btnLetras = document.getElementsByClassName('letrasTeclado');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const letrasAhorcado = document.getElementsByClassName('letraCuadroAhorcado');
    const pildoraFallos = document.getElementById('fallos');
    const imagenAhorcado = document.getElementById('ImgAhorcado');
    let fotosAhorcado = [
        { nombre: 1, foto: '../media/ahorcado/1.png' },
        { nombre: 2, foto: '../media/ahorcado/2.png' },
        { nombre: 3, foto: '../media/ahorcado/3.png' },
        { nombre: 4, foto: '../media/ahorcado/4.png' },
        { nombre: 5, foto: '../media/ahorcado/5.png' },
        { nombre: 6, foto: '../media/ahorcado/6.png' },
        { nombre: 7, foto: '../media/ahorcado/7.png' }
    ];

    let palabraActual;
    let letraCorrecta;
    let letrasSeleccionadas = [];
    let contadorFallos;
    let aciertos;

    const alfabetoEspaniol = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const arregloPalabras = [
        "elefante",
        "manzana",
        "montaña",
        "bicicleta",
        "juguete",
        "ciudad",
        "cancion",
        "lagartija",
        "cuchara",
        "relampago",
        "camiseta",
        "carrera",
        "pelicula",
        "biblioteca",
        "tiburon",
        "maleta",
        "universo",
        "helado",
        "arbol",
        "espejo"
    ];

    function GenerarLetras(arregloAlfabeto) {
        arregloAlfabeto.forEach(element => {
            let letras = document.createElement('p');
            letras.innerHTML = element;
            letras.classList = "uppercase px-6 py-3 rounded-lg bg-[#FF8800] w-max font-semibold text-slate-900 hover:bg-[#fbad53] hover:transition-colors transition-colors cursor-pointer letrasTeclado";
            contendorLetras.appendChild(letras);
        });

        [...btnLetras].forEach(element => {
            element.addEventListener('click', e => {
                //* Verifica que la letra no se haya seleccionado
                if (!letrasSeleccionadas.includes(e.target.innerHTML)) {
                    letrasSeleccionadas.push(e.target.innerHTML);
                    e.target.classList.toggle('hover:bg-[#fbad53]');
    
                    //* Evalúa si la letra es correcta o incorrecta
                    if (EvaluarLetra(e.target.innerHTML, palabraActual)) {
                        e.target.classList.toggle('bg-[#39FF14]');
    
                        //?Muestra la letra del cuadro de ahorcado
                        let elementoCorrectoCuadroAhorcado = [...letrasAhorcado].filter(element => element.innerHTML.toLowerCase() == letraCorrecta[0]);
                        elementoCorrectoCuadroAhorcado.forEach(element => {
                            element.classList.toggle('text-transparent');
                            element.classList.toggle('text-[#379cc8]');
                            element.classList.toggle('bg-slate-900');
                            element.classList.toggle('rounded-lg');
                        });
    
                        aciertos += elementoCorrectoCuadroAhorcado.length;
                        console.log(aciertos)
                    }
                    else {
                        contadorFallos++;
                        pildoraFallos.textContent = `Fallos: ${contadorFallos} / ${fotosAhorcado.length}`
                        e.target.classList.toggle('bg-[#ff006e]');
                        imagenAhorcado.setAttribute('src', fotosAhorcado[contadorFallos-1].foto)
                    }
    
                    if (EsGanador(palabraActual.length, aciertos)) {
                        TerminarJuego('Ganador');
                    };
    
                    if (EsPerdedor(contadorFallos, fotosAhorcado.length)) {
                        TerminarJuego('Perdedor');
                    }
    
                }
                else {
                    alert('Ya se seleccionó esta letra')
                }
    
            })
        });
    }

    function GenerarEspacioPalabra(arregloPalabras) {
        let random = Math.floor(Math.random() * arregloPalabras.length);
        let palabraUnica = arregloPalabras[random].split('');
        palabraActual = palabraUnica;
        palabraUnica.forEach(element => {
            let letras = document.createElement('p');
            letras.innerHTML = element;
            letras.classList = "uppercase px-6 py-1 text-transparent w-max font-semibold hover:transition-colors transition-colors cursor-pointer border-b-2 border-b-[#FF8800] text-2xl h-max letraCuadroAhorcado";
            contenedorPalabra.appendChild(letras);
        });
    }

    function EvaluarLetra(letra, arregloPalabra) {
        letraCorrecta = arregloPalabra.filter(e => e.toLowerCase() == letra.toLowerCase());
        return letraCorrecta.length > 0 ? true : false;

    }

    function EsGanador(longitudPalabra, aciertos) {
        return aciertos == longitudPalabra ? true : false;
    }

    function EsPerdedor(intentos, cantidadMaximaFallos) {
        return intentos == cantidadMaximaFallos ? true : false;
    }

    function TerminarJuego(mensaje) {
        contenedorPalabra.classList.toggle('hidden');
        contendorLetras.classList.toggle('hidden');
        pildoraFallos.classList.toggle('hidden');
        imagenAhorcado.setAttribute('src', '')
        alert(mensaje);
    }

    function IniciarJuego() {
        [...btnLetras].forEach(element => {
            element.classList.remove('text-[#379cc8]');
            element.classList.remove('bg-slate-900');
            element.classList.remove('rounded-lg');
            element.classList.remove('bg-[#39FF14]');
            element.classList.toggle('hover:bg-[#fbad53]');
            element.classList.remove('bg-[#ff006e]');

        });
        contenedorPalabra.classList.remove('hidden');
        contendorLetras.classList.remove('hidden');
        pildoraFallos.classList.remove('hidden');

        if (letrasAhorcado.length > 0) {
            contenedorPalabra.innerHTML = '';
        }

        if (btnLetras.length > 0) {
            [...btnLetras].forEach(element => element.remove());
        }

        aciertos = 0;
        contadorFallos = 0;
        letrasSeleccionadas.length = [];
        palabraActual = undefined;
        letraCorrecta = undefined;

        imagenAhorcado.setAttribute('src', '');

        pildoraFallos.textContent = `Fallos: ${contadorFallos} / ${fotosAhorcado.length}`
        GenerarEspacioPalabra(arregloPalabras);
        GenerarLetras(alfabetoEspaniol);

    }



    btnReiniciar.addEventListener('click', IniciarJuego, false);

    IniciarJuego();

})