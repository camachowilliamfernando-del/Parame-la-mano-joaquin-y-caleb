let letraSeleccionada = "";
let tiempoRestante = 120; // 2 minutos
let intervalo;

function iniciarJuego() {
    const letras = "ABCDEFGHILMNOPQRSTUV";
    letraSeleccionada = letras[Math.floor(Math.random() * letras.length)];
    
    document.getElementById('letra-display').innerText = letraSeleccionada;
    document.getElementById('setup-section').querySelector('button').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    
    // Reset de estado
    tiempoRestante = 120;
    actualizarReloj();
    document.querySelectorAll('input').forEach(input => input.value = "");
    
    iniciarCronometro();
}

function iniciarCronometro() {
    intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarReloj();

        if (tiempoRestante <= 10) {
            document.getElementById('timer-display').classList.add('timer-low');
        }

        if (tiempoRestante <= 0) {
            terminarJuego();
        }
    }, 1000);
}

function actualizarReloj() {
    const mins = Math.floor(tiempoRestante / 60);
    const segs = tiempoRestante % 60;
    const display = document.getElementById('timer-display');
    display.innerText = `Tiempo: ${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
}

function terminarJuego() {
    clearInterval(intervalo);
    
    const ids = ['nombre', 'apellido', 'lugar', 'objeto', 'cosa'];
    const lista = document.getElementById('lista-resultados');
    lista.innerHTML = "";

    ids.forEach(id => {
        const val = document.getElementById(id).value.trim();
        const li = document.createElement('li');
        
        // Verificamos si empieza con la letra correcta (sin importar mayúsculas)
        const esCorrecto = val.toUpperCase().startsWith(letraSeleccionada);
        
        li.innerHTML = `<span style="color: #ff9f43">${id.toUpperCase()}:</span> 
                        ${val || "---"} ${esCorrecto && val ? '✅' : '❌'}`;
        lista.appendChild(li);
    });

    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
}

function reiniciar() {
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('setup-section').querySelector('button').classList.remove('hidden');
    document.getElementById('letra-display').innerText = "?";
    document.getElementById('timer-display').classList.remove('timer-low');
    document.getElementById('timer-display').innerText = "Tiempo: 02:00";
}