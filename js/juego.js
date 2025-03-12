// Temporizador
let countdown; // Declarar la variable fuera de la función para un alcance global

// Configuración del temporizador
document.getElementById("inicioJuego").addEventListener("click", function () {
    document.getElementById("timer").style.display = "block";

    let timeLeft = 60; // Tiempo en segundos
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

// Detener el temporizador al enviar respuestas
document.getElementById("enviar").addEventListener("click", function(event) {
    clearInterval(countdown); // Detiene el temporizador
});

// Confeti
function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });
}

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
    };
    guardarPuntajes();
}

// Función para guardar los puntajes en localStorage
// tiene uqe quedar
function guardarPuntajes() {
    localStorage.setItem('puntajes', JSON.stringify(jugadores));
};

// Función que se ejecuta cuando se hace clic en "enviar"
document.getElementById("enviar").addEventListener("click", function(event) {
    event.preventDefault();

    let resultado = '';
    let correctas = 0;
    let totalPreguntas = Object.keys(respuestasCorrectas).length;

    // Obtener respuestas seleccionadas
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

    // Mostrar resultados
    if (correctas === totalPreguntas) {
        resultado += `<br>¡Felicidades! Se nota que te gusta la historia del arte en nuestro país.`;
        lanzarConfeti(); // Lanza el confeti solo si todas las respuestas son correctas
        actualizarPuntaje('Jugador'); // Suma puntos al jugador
    };
    document.getElementById('resultado').innerHTML = resultado; 
});

