// declaro temporizador. la variable fuera de la función para un alcance global
let countdown;

// config del temporizador
document.getElementById("inicioJuego").addEventListener("click", function () {
    document.getElementById("timer").style.display = "block";

    let timeLeft = 60; // tiempo en segundos
    countdown = setInterval(function () {
        document.getElementById("timeLeft").innerText = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdown);
            alert("¡Se acabó el tiempo!");
            document.getElementById("timer").style.display = "none";
        }
    }, 1000);
});

// Detener el temporizador y verificar respuestas al enviar
document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault();    // evitar que el formulario recargue la página
    clearInterval(countdown);  // detiene el temporizador
    verificarRespuestas();     // llama a la función que evalúa respuestas
});

// funcion que lanza confeti
function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });
}

// array de jugadores
let jugadores = [
    { nombre: 'Jugador', puntaje: 0 }
];

// Objeto de respuestas correctas
const respuestasCorrectas = {
    "pregunta1": "Raquel Forner",
    "pregunta2": "Mendoza",
    "pregunta3": "Retratos",
    "pregunta4": "Graciela Hasper",
    "pregunta5": "1890"
};

// Ocultar tablero al iniciar
document.getElementById("JuegoPreguntas").style.display = "none";

// Mostrar tablero al hacer clic en el botón
document.getElementById("inicioJuego").addEventListener("click", function () {
    document.getElementById("JuegoPreguntas").style.display = "block";
});

// Función para actualizar y guardar puntajes
function actualizarPuntaje(ganador) {
    if (ganador === 'Jugador') {
        jugadores[0].puntaje += 10;  // suma 10 puntos al jugador
    }
    guardarPuntajes();
}

// Función para guardar los puntajes en localStorage
function guardarPuntajes() {
    localStorage.setItem('puntajes', JSON.stringify(jugadores));
}

// Función global para verificar respuestas
function verificarRespuestas() {
    let resultado = '';
    let correctas = 0;
    let totalPreguntas = Object.keys(respuestasCorrectas).length;

    for (let i = 1; i <= totalPreguntas; i++) {
        const seleccionada = document.querySelector(`input[name="pregunta${i}"]:checked`);
        if (seleccionada) {
            const respuestaSeleccionada = seleccionada.value;
            if (respuestaSeleccionada === respuestasCorrectas[`pregunta${i}`]) {
                resultado += `Pregunta ${i}: Correcta<br>`;
                correctas++;
            } else {
                resultado += `Pregunta ${i}: Incorrecta. La correcta es ${respuestasCorrectas[`pregunta${i}`]}<br>`;
            }
        } else {
            resultado += `Pregunta ${i}: No seleccionaste una respuesta.<br>`;
        }
    }

    if (correctas === totalPreguntas) {
        resultado += `<br>¡Felicidades! Se nota que te gusta el arte de nuestro país.`;
        lanzarConfeti();
        actualizarPuntaje('Jugador');
    }
    document.getElementById('resultado').innerHTML = resultado;
}
