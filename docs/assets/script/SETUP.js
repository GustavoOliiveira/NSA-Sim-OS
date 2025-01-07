const loginButton = document.getElementById("loginButton");
const errorMessage = document.getElementById("errorMessage");
const loginForm = document.getElementById("loginForm");
const loadingScreen = document.querySelector(".loading-screen");
const codeCascade = document.getElementById("codeCascade");
const loginScreen = document.querySelector(".login-screen");
const desligar = document.getElementById("desligar");

let fingerprintValidated = false;
const fingerprint = document.querySelector('.fingerprint');
const center = document.querySelector('.center');
let timer;

// Lógica de validação do fingerprint
function onSuccess() {
	fingerprintValidated = true;
	fingerprint.removeEventListener('mousedown', onTouchstart);
	fingerprint.removeEventListener('touchstart', onTouchstart);
	fingerprint.classList.remove('active');
	center.classList.add('success');
	clearTimeout(timer);
}

function onTouchstart() {
	fingerprint.classList.add('active');
	timer = setTimeout(onSuccess, 2000); 
}

function onTouchEnd() {
	fingerprint.classList.remove('active');
	clearTimeout(timer);
}

fingerprint.addEventListener('mousedown', onTouchstart);
fingerprint.addEventListener('touchstart', onTouchstart);
fingerprint.addEventListener('mouseup', onTouchEnd);
fingerprint.addEventListener('touchend', onTouchEnd);

// Lógica do login
loginButton.addEventListener("click", () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (username.length < 6 || password.length < 6) {
		errorMessage.textContent = "Username and password must be at least 6 characters long!";
		return;
	}

	if (!fingerprintValidated) {
		errorMessage.textContent = "Please scan your fingerprint and hold for 2 seconds.";
		return;
	}

	errorMessage.textContent = ""; 
	showLoadingScreen();
});

function showLoadingScreen() {
	loginScreen.style.display = "none"; 
	loadingScreen.style.display = "flex";
	startLoadingSequence();
}

function startLoadingSequence() {
	const phrases = [
		"System booting...",
		"Loading modules...",
		"Decrypting files...",
		"Initializing protocols...",
		"Accessing secure networks...",
	];
	const loadingMessage = document.getElementById("loadingMessage");
	let currentPhrase = 0;

	function showNextPhrase() {
		loadingMessage.textContent = phrases[currentPhrase];
		currentPhrase++;
		if (currentPhrase < phrases.length) {
			setTimeout(showNextPhrase, 1000);
		}
	}
	showNextPhrase();

	setTimeout(() => {
		loadingScreen.style.display = "none"; 
		startCodeCascade(); 
	}, 4000);
}

function startCodeCascade() {
	codeCascade.style.display = "block";

	const codeChars = "0123456789ABCDEF"; 
	const numColumns = Math.floor(window.innerWidth / 15); 
	const charactersPerColumn = 500; 

	for (let i = 0; i < numColumns; i++) {
		const span = document.createElement("span");
		span.textContent = Array.from({
				length: charactersPerColumn
			}) 
			.map(() => codeChars.charAt(Math.floor(Math.random() * codeChars.length)))
			.join("");
		span.style.left = `${i * 15}px`;
		span.style.animationDuration = `${Math.random() * 3 + 2}s`;
		span.style.animationDelay = `${Math.random() * 2}s`;
		codeCascade.appendChild(span);
	}

	setTimeout(() => {
		codeCascade.style.display = "none"; // Esconde o efeito de cascata após 5 segundos

		// Enviar mensagem para o código 1
		window.parent.postMessage({
				event: "cascadeComplete",
				message: "Cascata finalizada no código 2!"
			},
			"*"
		);
	}, 5000);
}