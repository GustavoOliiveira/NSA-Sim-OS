const screen = document.getElementById('screen');
const cursorHTML = `<span class="cursor"></span>`;

const fakeCodeLines = [
	"import os",
	"import sys",
	"from hashlib import sha256, md5",
	"from Crypto.Cipher import AES",
	"",
	"class ExploitFramework:",
	"    def __init__(self):",
	"        self.target_ip = '192.168.0.100'",
	"        self.port = 4444",
	"        self.encryption_key = os.urandom(16)",
	"        self.payload = b''",
	"        self.commands = []",
	"",
	"    def generate_payload(self):",
	"        print('[*] Generating encrypted payload...')",
	"        raw_payload = b'\\x90' * 128 + b'EXPLOIT_PAYLOAD'",
	"        cipher = AES.new(self.encryption_key, AES.MODE_ECB)",
	"        self.payload = cipher.encrypt(raw_payload.ljust(256, b' '))",
	"        print('[+] Payload generated successfully.')",
];

let fakeCodeIndex = 0; // Índice do código fake
let charIndex = 0; // Índice do caractere dentro da linha

function revealNextChar() {
	// Remove a linha inicial se for a primeira interação
	const initialLine = document.getElementById('initial-line');
	if (initialLine) {
		initialLine.remove();
	}

	// Remove qualquer cursor existente
	document.querySelectorAll('.cursor').forEach(cursor => cursor.remove());

	if (fakeCodeIndex < fakeCodeLines.length) {
		let currentLine = fakeCodeLines[fakeCodeIndex];
		let lineElement = document.querySelector(`.line[data-index="${fakeCodeIndex}"]`);

		if (!lineElement) {
			lineElement = document.createElement('div');
			lineElement.classList.add('line');
			lineElement.dataset.index = fakeCodeIndex;
			screen.appendChild(lineElement);
		}

		// Adiciona caracteres à linha atual
		lineElement.textContent = currentLine.slice(0, charIndex);
		charIndex++;

		// Adiciona o cursor na posição correta
		if (charIndex <= currentLine.length) {
			lineElement.innerHTML += cursorHTML;
		}

		// Linha completa, passa para a próxima
		if (charIndex > currentLine.length) {
			charIndex = 0;
			fakeCodeIndex++;
		}

		// Rola para a linha mais recente
		screen.scrollTop = screen.scrollHeight;
	} else {
		const endMessage = document.createElement('div');
		endMessage.textContent = "Hacking simulation complete.";
		screen.appendChild(endMessage);
	}
}

document.addEventListener('keydown', revealNextChar);