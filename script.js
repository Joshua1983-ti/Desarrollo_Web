const startButton = document.getElementById('start-btn');
const instructions = document.getElementById('instructions');
const statusText = document.getElementById('status');
const responseText = document.getElementById('response-text');

let recognition;

if (!('webkitSpeechRecognition' in window)) {
    instructions.textContent = "Tu navegador no soporta comandos de voz. Usa Chrome o un navegador compatible.";
    startButton.disabled = true;
} else {
    // Inicializamos la API de reconocimiento de voz
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar para español
    recognition.continuous = false; // No continuar hasta que el usuario deje de hablar
    recognition.interimResults = false; // No mostrar resultados intermedios

    recognition.onstart = function() {
        statusText.textContent = 'Escuchando...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        statusText.textContent = 'Comando recibido: ' + transcript;
        processCommand(transcript);
    };

    recognition.onerror = function(event) {
        statusText.textContent = 'Error en el reconocimiento: ' + event.error;
    };

    recognition.onend = function() {
        statusText.textContent = 'Esperando comando...';
    };

    // Función para procesar el comando de voz
    function processCommand(command) {
        if (command.includes('saludar')) {
            speak('¡Hola! ¿Cómo estás?');
            responseText.textContent = '¡Hola! ¿Cómo estás?';
        } else if (command.includes('información')) {
            speak('Este sitio está diseñado para personas con discapacidad visual.');
            responseText.textContent = 'Este sitio está diseñado para personas con discapacidad visual.';
        } else if (command.includes('adiós')) {
            speak('¡Adiós! Que tengas un buen día.');
            responseText.textContent = '¡Adiós! Que tengas un buen día.';
        } else {
            speak('No entendí tu comando. Por favor intenta de nuevo.');
            responseText.textContent = 'No entendí tu comando. Por favor intenta de nuevo.';
        }
    }

    // Función para la síntesis de voz
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'es-ES';
        window.speechSynthesis.speak(speech);
    }

    // Iniciar el reconocimiento de voz cuando se haga clic en el botón
    startButton.addEventListener('click', function() {
        recognition.start();
    });
}