const contendorLetras = document.getElementById('contenedorLetras');
const contenedorPalabra = document.getElementById('contenedorPalabra');
const btnLetras = document.getElementsByClassName('letrasTeclado');
const letrasAhorcado = document.getElementsByClassName('letraCuadroAhorcado');
const pildoraFallos = document.getElementById('fallos') ;

let palabraActual;
let letraCorrecta;
let letrasSeleccionadas = [];
let contadorFallos = 0;
let maxFallos;

const alfabetoEspaniol = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const arregloPalabras = ['gustago'];

function GenerarLetras(arregloAlfabeto) {
    arregloAlfabeto.forEach(element => {
        let letras = document.createElement('p');
        letras.innerHTML = element;
        letras.classList = "uppercase px-6 py-3 rounded-lg bg-[#FF8800] w-max font-semibold text-slate-900 hover:bg-[#fbad53] hover:transition-colors transition-colors cursor-pointer letrasTeclado";
        contendorLetras.appendChild(letras);
    });
}

function GenerarEspacioPalabra(arregloPalabras) {
    // let random = Math.abs(Math.random() * arregloPalabras.length);
    let random = 0;
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

document.addEventListener('DOMContentLoaded', () => {
    maxFallos = Math.round(palabraActual.length / 1.5);
    if(contadorFallos < maxFallos) {
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
                        console.log(elementoCorrectoCuadroAhorcado)
                        elementoCorrectoCuadroAhorcado.forEach(element => {
                            element.classList.toggle('text-transparent');
                            element.classList.toggle('text-[#379cc8]');
                            element.classList.toggle('bg-slate-900');
                            element.classList.toggle('rounded-lg');
                        });
                    }
                    else {
                        contadorFallos++;
                        pildoraFallos.textContent = `Fallos: ${contadorFallos} / ${maxFallos}` 
                        e.target.classList.toggle('bg-[#ff006e]');
                    }
                }
                else {
                    alert('Ya se seleccionó esta letra')
                }
            })
        });
    }

})




GenerarLetras(alfabetoEspaniol);
GenerarEspacioPalabra(arregloPalabras);