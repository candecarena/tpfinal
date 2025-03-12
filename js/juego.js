// Temporizador
document.getElementById("inicioJuego").addEventListener("click", function () {
    document.getElementById("timer").style.display = "block";

    let timeLeft = 30; // Tiempo en segundos
    const countdown = setInterval(function () {
        document.getElementById("timeLeft").innerText = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdown);
            alert("¡Se acabó el tiempo!");
            document.getElementById("timer").style.display = "none";
        }
    }, 1000);
});
//confeti
function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });
}

// Llama a esta función cuando el jugador complete todas las preguntas
document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault(); // Evita el envío del formulario
    lanzarConfeti();
    //alert("¡Felicidades! Has terminado el juego.");
});


let jugadores = [
    { nombre: 'Jugador', puntaje: 0 },
    { nombre: 'PC', puntaje: 0 }
];

// objeto respuestas correctas
const respuestasCorrectas = {
    "pregunta1": "Raquel Forner",
    "pregunta2": "Mendoza",
    "pregunta3": "Retratos",
    "pregunta4": "Graciela Hasper",
    "pregunta5": "1890"
};

// Cargar puntajes al iniciar la página
function cargarPuntajes() {
    const puntajesGuardados = localStorage.getItem('puntajes');
    if (puntajesGuardados) {
        jugadores = JSON.parse(puntajesGuardados);
    }
}
cargarPuntajes();  // cargar puntajes al inicio

// Ocultar tablero al iniciar
document.getElementById("JuegoPreguntas").style.display = "none";

// Mostrar tablero al hacer clic en el boton"
document.getElementById("inicioJuego").addEventListener("click", function () {
    document.getElementById("JuegoPreguntas").style.display = "block";
});

// Función para actualizar y guardar puntajes
function actualizarPuntaje(ganador) {
    if (ganador === 'Jugador') {
        jugadores[0].puntaje += 10;  // suma 10 puntos al jugador
    } else if (ganador === 'PC') {
        jugadores[1].puntaje += 10;  // suma 10 puntos a la PC
    }
    guardarPuntajes();
}

// Función para guardar los puntajes en localStorage
function guardarPuntajes() {
    localStorage.setItem('puntajes', JSON.stringify(jugadores));
}

// Función para mostrar la tabla de posiciones
function mostrarTablaPosiciones() {
    let tablaBody = document.querySelector("#tablaPosiciones tbody");
    tablaBody.innerHTML = '';  // Limpio la tabla antes de actualizarla

    let puntajesGuardados = JSON.parse(localStorage.getItem('puntajes')) || [];
    puntajesGuardados.forEach(jugador => {
        let fila = `
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntaje}</td>
            </tr>
        `;
        tablaBody.innerHTML += fila;
    });
}

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
    }
    resultado += `<br>Respuestas correctas: ${correctas} de ${totalPreguntas}`;
    document.getElementById('resultado').innerHTML = resultado;

    // Actualizar el puntaje del jugador si responde bien a todas las preguntas
    if (correctas === totalPreguntas) {
        actualizarPuntaje('Jugador');
    } else {
        actualizarPuntaje('PC');
    }

    // Actualizar la tabla de posiciones después de calcular los puntajes
    mostrarTablaPosiciones();
});

// Mostrar la tabla de posiciones cuando se carga la página
mostrarTablaPosiciones();
