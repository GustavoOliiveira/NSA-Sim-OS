const taskIcons = document.getElementById('taskIcons');
const windows = {};

window.onload = function() {
    // Exibe a tela de carregamento por 2 segundos
    setTimeout(function() {
      // Oculta a tela de carregamento
      document.getElementById('loadingScreen').style.display = 'none';
      
      // Torna o conteúdo da página visível após o carregamento
      document.body.classList.add('loaded');
    }, 2000); // 2000 milissegundos = 2 segundos
};

window.addEventListener("message", (event) => {
	if (event.data && event.data.event === "cascadeComplete") {
	  console.log(event.data.message); // Log da mensagem recebida
	  // Esconde o iframe
	  const iframe = document.querySelector(".setup");
	  iframe.style.display = "none";
	}
  });
  
  document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("startButton");
	const shutdownMenu = document.getElementById("shutdownMenu");
	const shutdownButton = document.getElementById("shutdownButton");
	const iframe = document.querySelector(".setup");
  
	// Mostrar o menu de desligamento ao clicar no botão Start
	startButton.addEventListener("click", (event) => {
	  event.stopPropagation();
	  shutdownMenu.style.display = "block";
	});
  
	// Fechar o menu se clicar fora dele
	document.addEventListener("click", () => {
	  shutdownMenu.style.display = "none";
	});
  
	// Prevenir o fechamento ao clicar dentro do menu
	shutdownMenu.addEventListener("click", (event) => {
	  event.stopPropagation();
	});
  
	// Ação de desligamento
	shutdownButton.addEventListener("click", () => {
	  // Exibir o iframe diretamente
	  iframe.style.display = "block";
	  iframe.style.position = "fixed";
	  iframe.style.top = "50%";
	  iframe.style.left = "50%";
	  iframe.style.transform = "translate(-50%, -50%)";
	  iframe.style.zIndex = "10000"; // Garante que fique na frente
	  iframe.style.border = "none";
	  iframe.style.width = "100%";
	  iframe.style.height = "100%";
  
	  // Recarregar o iframe para o estado inicial
	  iframe.src = iframe.src;
  
	  // Fechar o menu de desligamento
	  shutdownMenu.style.display = "none";
	});
  });
  
  


function createWindow(name, content) {
	if (windows[name]) {
		const win = windows[name];
		win.show();
		return;
}

const container = content();

const win = new WinBox(name, {
    width: '500px',
    height: '400px',
    mount: container,
	background: '#2c3e50',         // Largura da borda (em pixels)
    class: 'custom-window',
    onclose: () => {
        delete windows[name];
        document.getElementById(`task-${name}`).remove();
    },
    onresize: (width, height) => {
        // Ajustar o tamanho do globo quando a janela for redimensionada
        if (container.querySelector('canvas')) {
            const globe = container.querySelector('canvas').__globeInstance;
            if (globe) {
                globe.width(container.offsetWidth).height(container.offsetHeight);
            }
        }
    },
});

windows[name] = win;

let iconPath;
switch (name) {
    case 'Docs':
        iconPath = '/docs/assets/icons/pasta.png';
        break;
    case 'IDE':
        iconPath = '/docs/assets/icons/arquivo.png';
        break;
    case 'Zumbi':
        iconPath = '/docs/assets/icons/zumbi.png';
        break;
	case 'Camera':
		iconPath = '/docs/assets/icons/camera.png';
		break;
	case 'Music':
		iconPath = '/docs/assets/icons/music.png';
		break;
	case 'Globo':
		iconPath = '/docs/assets/icons/globo.png';
		break;
	case 'Bitcoin':
		iconPath = '/docs/assets/icons/wallet.png';
		break;
	case 'Body Camera':
		iconPath = '/docs/assets/icons/mala.png';
		break;
    default:
        iconPath = '/icons/default-icon.png'; // Ícone padrão
}

const taskIcon = document.createElement('div');
	taskIcon.classList.add('task-icon');
	taskIcon.id = `task-${name}`;
	taskIcon.innerHTML = `
		<img src="${iconPath}" alt="${name}">
        <span>${name}</span>
      `;
	taskIcons.appendChild(taskIcon);

	taskIcon.addEventListener('click', () => {
		if (win.minimized) {
			win.show();
		} else {
			win.minimize();
		}
	});
}

function setupIconDoubleClick(iconId, name, content) {
	const icon = document.getElementById(iconId);
	let clickCount = 0;

	icon.addEventListener('click', () => {
		clickCount++;
		setTimeout(() => (clickCount = 0), 400);
		if (clickCount === 2) createWindow(name, content);
	});
}

setupIconDoubleClick('iconExplorer', 'Docs', () => {
	const iframe = document.createElement('iframe');
	iframe.src = '/docs/pages/GALLERY.html'; 
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';
	iframe.style.backgroundColor = 'black'; 

	const container = document.createElement('div');
	container.appendChild(iframe);

	return container;
});

setupIconDoubleClick('iconNotepad', 'IDE', () => {
	const iframe = document.createElement('iframe');
	iframe.src = '/docs/pages/IDE.html'; 
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';

	const container = document.createElement('div');
	container.appendChild(iframe);

	return container;
});

setupIconDoubleClick('iconBrowser', 'Zumbi', () => {
	const iframe = document.createElement('iframe');
	iframe.src = 'https://www.crazygames.com/embed/hazmob-fps-online-shooter'; 
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';

	const container = document.createElement('div');
	container.appendChild(iframe);

	return container;
});

setupIconDoubleClick('iconYouTube', 'Camera', () => {
	const div = document.createElement('div');
	div.style.padding = '0';
	div.style.margin = '0';
	div.style.position = 'fixed';
	div.style.top = '0';
	div.style.left = '0';
	div.style.width = '100%';
	div.style.height = '100%';
	div.style.zIndex = '9999';

	// Criação da camada de carregamento
	const overlay = document.createElement('div');
	overlay.style.position = 'absolute';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'black'; 
	overlay.style.zIndex = '100'; 
	overlay.style.transition = 'background-color 1s ease-out'; 

	// Criação da barra de carregamento
	const progressBarContainer = document.createElement('div');
	progressBarContainer.style.position = 'absolute';
	progressBarContainer.style.top = '50%';
	progressBarContainer.style.left = '50%';
	progressBarContainer.style.transform = 'translate(-50%, -50%)';
	progressBarContainer.style.width = '80%';
	progressBarContainer.style.height = '10px';
	progressBarContainer.style.backgroundColor = 'grey';

	const progressBar = document.createElement('div');
	progressBar.style.height = '100%';
	progressBar.style.width = '0%'; // 
	progressBar.style.backgroundColor = '#309593'; 
	progressBar.style.transition = 'width 5s linear'; 

	// Adiciona a barra de progresso ao container
	progressBarContainer.appendChild(progressBar);

	// Criação do texto de carregamento
	const loadingText = document.createElement('div');
	loadingText.style.position = 'absolute';
	loadingText.style.top = '60%';
	loadingText.style.left = '50%';
	loadingText.style.transform = 'translateX(-50%)';
	loadingText.style.color = '#309593';
	loadingText.style.fontSize = '1.5rem';
	loadingText.style.fontFamily = 'Arial, sans-serif';
	loadingText.style.textAlign = 'center';
	loadingText.innerText = 'Carregando...';

	// Adiciona o texto de carregamento e a barra de progresso à sobreposição
	overlay.appendChild(progressBarContainer);
	overlay.appendChild(loadingText);

	// Criar o contêiner do player com os parâmetros adicionais
	const youtubeContainer = document.createElement('div');
	youtubeContainer.innerHTML = `
    <iframe width="100%" height="100%" 
      src="https://www.youtube.com/embed/D4c0UTnNXDM?autoplay=1&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&autohide=1"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

	// Adiciona o iframe e a camada de overlay ao div principal
	div.appendChild(youtubeContainer);
	div.appendChild(overlay);

	// Verifica quando o iframe termina de carregar
	const iframe = youtubeContainer.querySelector('iframe');
	iframe.onload = () => {
		// Após o carregamento do vídeo, aguarda 5 segundos para começar a preencher a barra
		setTimeout(() => {
			// Preenche a barra de progresso
			progressBar.style.width = '100%';
			setTimeout(() => {
				overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
				progressBarContainer.style.display = 'none';
				loadingText.style.display = 'none';
			}, 5000); 
		}, 5000); 
	};

	return div;
});


setupIconDoubleClick('iconMusic', 'Music', () => {
	const iframe = document.createElement('iframe');
	iframe.src = '/docs/pages/MUSIC.html'; 
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';

	const container = document.createElement('div');
	container.appendChild(iframe);

	return container;
});

setupIconDoubleClick('iconGlobe', 'Globo', () => {
	const globeContainer = document.createElement('div');
	globeContainer.style.width = '100%';
	globeContainer.style.height = '100%';

	// Configurações para rotas animadas
	const N_PATHS = 10; // Número de rotas
	const MAX_POINTS_PER_LINE = 10000; // Número máximo de pontos por linha
	const MAX_STEP_DEG = 1; // Máximo desvio em graus por ponto
	const MAX_STEP_ALT = 0.015; // Máximo desvio de altitude

	const gData = [...Array(N_PATHS).keys()].map(() => {
		let lat = (Math.random() - 0.5) * 90; // Latitude inicial
		let lng = (Math.random() - 0.5) * 360; // Longitude inicial
		let alt = 0; // Altitude inicial

		return [
			[lat, lng, alt],
			...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
				lat += (Math.random() * 2 - 1) * MAX_STEP_DEG; // Aleatoriedade na latitude
				lng += (Math.random() * 2 - 1) * MAX_STEP_DEG; // Aleatoriedade na longitude
				alt += (Math.random() * 2 - 1) * MAX_STEP_ALT; // Aleatoriedade na altitude
				alt = Math.max(0, alt); // Altitude mínima = 0

				return [lat, lng, alt];
			}),
		];
});

// Inicializar o globo
const globe = Globe()(globeContainer)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .pathsData(gData) // Dados das rotas
    .pathColor(() => ['rgba(0,0,255,0.6)', 'rgba(255,0,0,0.6)']) // Cores alternadas
    .pathDashLength(0.01) // Comprimento do traço
    .pathDashGap(0.004) // Espaço entre traços
    .pathDashAnimateTime(100000) // Tempo de animação dos traços

	// Transição de altitude
	setTimeout(() => {
		globe
			.pathPointAlt(pnt => pnt[2]) // Altitude definida para os pontos
			.pathTransitionDuration(4000); // Duração da transição
	}, 6000);

	// Atualizar dimensões iniciais
	setTimeout(() => {
		globe.width(globeContainer.offsetWidth);
		globe.height(globeContainer.offsetHeight);
	}, 100);

	// Associar a instância do globo ao canvas
	const canvas = globeContainer.querySelector('canvas');
	canvas.__globeInstance = globe;

	// Forçar atualização inicial
	setTimeout(() => {
		globe.width(globeContainer.offsetWidth);
		globe.height(globeContainer.offsetHeight);
	}, 100);

	// Observador para mudanças no tamanho do container
	const resizeObserver = new ResizeObserver(() => {
		globe.width(globeContainer.offsetWidth);
		globe.height(globeContainer.offsetHeight);
	});
	resizeObserver.observe(globeContainer);

	return globeContainer;
});


setupIconDoubleClick('iconMiner', 'Bitcoin', () => {
	const container = document.createElement('div');
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.height = '100%';
	container.style.background = 'black';
	container.style.color = '#309593';
	container.style.fontFamily = 'monospace';
	container.style.padding = '10px';

	// Título
	const title = document.createElement('h3');
	title.style.textAlign = 'center';
	title.style.margin = '10px 0';
	title.innerText = 'Mineração de Bitcoin';
	container.appendChild(title);

	// Gráfico
	const graphContainer = document.createElement('div');
	graphContainer.style.height = '40%';
	graphContainer.style.width = '100%';
	graphContainer.style.display = 'flex';
	graphContainer.style.alignItems = 'center';
	graphContainer.style.justifyContent = 'center';
	graphContainer.style.background = 'black';
	container.appendChild(graphContainer);

	const graph = document.createElement('canvas');
	graph.style.width = '100%';
	graph.style.height = '100%';
	graphContainer.appendChild(graph);

	const ctx = graph.getContext('2d');
	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [{
				label: 'Cotação Bitcoin',
				data: [90000, 130000, 132000, 100321, 245000, 347000, 430000, 565000, 682000, 590000, 710020, 814500],
				borderColor: '#309593',
				fill: false,
			}],
		},
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: 'Mês'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Valor (USD)'
					}
				},
			},
		},
	});

	// Seção inferior (Gerador e Cortina de Código)
	const bottomSection = document.createElement('div');
	bottomSection.style.display = 'flex';
	bottomSection.style.height = '40%';
	bottomSection.style.width = '100%';
	container.appendChild(bottomSection);

	// Gerador estilo hacker
	const hackerOutput = document.createElement('div');
	hackerOutput.style.height = '100%';
	hackerOutput.style.width = '50%';
	hackerOutput.style.overflowY = 'auto';
	hackerOutput.style.background = 'black';
	hackerOutput.style.color = '#309593';
	hackerOutput.style.fontSize = '12px';
	hackerOutput.style.padding = '10px';
	hackerOutput.style.border = '1px solid #309593';
	hackerOutput.style.boxSizing = 'border-box';
	bottomSection.appendChild(hackerOutput);

	const fakeLogs = [
		'Conectando ao servidor blockchain...',
		'Extraindo hash...',
		'Verificando transações...',
		'Minerando bloco #124563...',
		'Recebendo recompensa de 0.00032 BTC...',
		'Conectando ao servidor blockchain...',
		'Extraindo hash...',
		'Verificando transações...',
		'Minerando bloco #224342...',
		'Recebendo recompensa de 0.04332 BTC...',
	];

	let totalBitcoins = 0;
	const bitcoinDisplay = document.createElement('div');
	bitcoinDisplay.style.textAlign = 'center';
	bitcoinDisplay.style.marginTop = '10px';
	bitcoinDisplay.style.color = 'gold';
	bitcoinDisplay.style.fontSize = '16px';
	bitcoinDisplay.innerText = `Total de Bitcoins Minerados: ${totalBitcoins.toFixed(5)} BTC`;
	container.appendChild(bitcoinDisplay);

function generateHackerLogs() {
    const log = document.createElement('p');
    const message = fakeLogs[Math.floor(Math.random() * fakeLogs.length)];
    log.innerText = message;
    hackerOutput.appendChild(log);
    hackerOutput.scrollTop = hackerOutput.scrollHeight;

    if (message.includes('Recebendo recompensa de')) {
        const reward = parseFloat(message.match(/0\.00032/)[0]);
        totalBitcoins += reward;
        bitcoinDisplay.innerText = `Total de Bitcoins Minerados: ${totalBitcoins.toFixed(5)} BTC`;
    }
}

setInterval(generateHackerLogs, 1000);

	// Cortina de código
const hackerContainer = document.createElement('div');
	hackerContainer.style.height = '100%';
	hackerContainer.style.width = '50%';
	hackerContainer.style.background = 'black';
	hackerContainer.style.color = '#309593';
	hackerContainer.style.fontSize = '12px';
	hackerContainer.style.padding = '10px';
	hackerContainer.style.border = '1px solid #309593';
	hackerContainer.style.boxSizing = 'border-box';
	hackerContainer.style.overflow = 'hidden'; // Impede o transbordamento
	hackerContainer.style.display = 'flex'; // Alinha o conteúdo interno
	hackerContainer.style.alignItems = 'center';
	hackerContainer.style.justifyContent = 'center'; // Alinha o conteúdo interno'; // Alinha o conteúdo interno
	hackerContainer.style.flexDirection = 'column'; // Garante a disposição em coluna
	hackerContainer.style.justifyContent = 'flex-start'; // Mantém o conteúdo no topo
	bottomSection.appendChild(hackerContainer);

	function generateCodeRain() {
		hackerContainer.innerHTML = ''; // Limpa a área para novos logs
		const codeLength = 50; // Número de linhas simuladas
		for (let i = 0; i < codeLength; i++) {
			const codeLine = document.createElement('div');
			codeLine.style.width = '100%'; // Garante que respeite o espaço
			codeLine.innerText = generateRandomCode();
			hackerContainer.appendChild(codeLine);
		}
}

function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:,.<>?';
    let line = '';
    for (let i = 0; i < 100; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
    }
    return line;
}

    setInterval(generateCodeRain, 500); // Atualiza o código a cada 500ms
	return container;
});

setupIconDoubleClick('iconZombieHunter', 'Body Camera', () => {
	const iframe = document.createElement('iframe');
	iframe.src = 'https://www.crazygames.com/embed/bodycamera-shooter'; // Substitua pela URL do jogo
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.border = 'none';

	const container = document.createElement('div');
	container.appendChild(iframe);

	return container;
});

document.addEventListener('keydown', (event) => {
	if (event.key === '3') {
		parent.postMessage({
			type: 'keyEvent',
			key: '3'
		}, '*');
	}
});

// Relógio
function updateClock() {
	const clock = document.getElementById('clock');
	const now = new Date();
	clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();