let player;
let videoId = null;
let pointA = null;
let pointB = null;
let isLooping = false;
let loopInterval = null;

// Inicializar YouTube IFrame API
function onYouTubeIframeAPIReady() {
    console.log('YouTube IFrame API está pronta');
}

// Extrair ID do vídeo da URL
function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Formatar tempo em MM:SS
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Carregar vídeo
function loadVideo() {
    const urlInput = document.getElementById('youtube-url');
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Por favor, insira uma URL do YouTube');
        return;
    }

    const id = extractVideoId(url);
    if (!id) {
        showError('URL inválida do YouTube. Por favor, verifique a URL.');
        return;
    }

    videoId = id;
    hideError();

    // Criar player se não existir
    if (!player) {
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: id,
            playerVars: {
                'playsinline': 1,
                'enablejsapi': 1,
                'modestbranding': 1,
                'rel': 0,
                'fs': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    } else {
        player.loadVideoById(id);
    }

    document.getElementById('video-container').style.display = 'block';
    document.getElementById('controls-section').style.display = 'block';
}

// Quando o player estiver pronto
function onPlayerReady(event) {
    console.log('Player pronto');
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 100);
}

// Quando o estado do player mudar
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && isLooping) {
        checkLoop();
    }
}

// Tratar erros do player
function onPlayerError(event) {
    let errorMessage = 'Erro ao carregar o vídeo. ';
    
    switch(event.data) {
        case 2:
            errorMessage += 'ID do vídeo inválido.';
            break;
        case 5:
            errorMessage += 'Erro de HTML5. Tente outro navegador.';
            break;
        case 100:
            errorMessage += 'Vídeo não encontrado ou removido.';
            break;
        case 101:
        case 150:
            errorMessage += 'O vídeo não permite reprodução em players incorporados.';
            break;
        case 153:
            errorMessage += 'Erro de configuração. Alguns vídeos têm restrições de incorporação.';
            break;
        default:
            errorMessage += 'Erro desconhecido.';
    }
    
    showError(errorMessage);
    console.error('Erro do YouTube Player:', event.data);
}

// Atualizar display de tempo
function updateTimeDisplay() {
    if (!player) return;
    
    try {
        const current = player.getCurrentTime();
        const duration = player.getDuration();
        
        document.getElementById('current-time').textContent = formatTime(current);
        document.getElementById('total-time').textContent = formatTime(duration);
    } catch (e) {
        // Player ainda não está pronto
    }
}

// Definir ponto A
function setPointA() {
    if (!player) return;
    
    try {
        pointA = player.getCurrentTime();
        updatePointDisplay('point-a-display', pointA);
        checkPoints();
    } catch (e) {
        showError('Erro ao definir ponto A');
    }
}

// Definir ponto B
function setPointB() {
    if (!player) return;
    
    try {
        pointB = player.getCurrentTime();
        updatePointDisplay('point-b-display', pointB);
        checkPoints();
    } catch (e) {
        showError('Erro ao definir ponto B');
    }
}

// Atualizar display do ponto
function updatePointDisplay(elementId, time) {
    const element = document.getElementById(elementId);
    if (time !== null) {
        element.textContent = `(${formatTime(time)})`;
        element.classList.add('active');
    } else {
        element.textContent = '';
        element.classList.remove('active');
    }
}

// Verificar se ambos os pontos estão definidos
function checkPoints() {
    const toggleBtn = document.getElementById('toggle-loop');
    if (pointA !== null && pointB !== null) {
        if (pointA >= pointB) {
            showError('Ponto A deve ser menor que Ponto B');
            toggleBtn.disabled = true;
            return;
        }
        toggleBtn.disabled = false;
    } else {
        toggleBtn.disabled = true;
    }
}

// Alternar loop
function toggleLoop() {
    if (!pointA || !pointB || pointA >= pointB) {
        showError('Defina os pontos A e B corretamente antes de iniciar o loop');
        return;
    }

    isLooping = !isLooping;
    const toggleBtn = document.getElementById('toggle-loop');
    const statusDiv = document.getElementById('loop-status');

    if (isLooping) {
        toggleBtn.textContent = 'Parar Loop';
        toggleBtn.classList.remove('btn-success');
        toggleBtn.classList.add('btn-danger');
        statusDiv.textContent = `🔄 Loop ativo: ${formatTime(pointA)} → ${formatTime(pointB)}`;
        statusDiv.classList.add('looping');
        startLoopCheck();
    } else {
        toggleBtn.textContent = 'Iniciar Loop';
        toggleBtn.classList.remove('btn-danger');
        toggleBtn.classList.add('btn-success');
        statusDiv.textContent = 'Loop desativado';
        statusDiv.classList.remove('looping');
        stopLoopCheck();
    }
}

// Verificar loop durante reprodução
function checkLoop() {
    if (!player || !isLooping) return;

    try {
        const current = player.getCurrentTime();
        
        if (current >= pointB) {
            player.seekTo(pointA, true);
        }
    } catch (e) {
        console.error('Erro ao verificar loop:', e);
    }
}

// Iniciar verificação de loop
function startLoopCheck() {
    if (loopInterval) clearInterval(loopInterval);
    loopInterval = setInterval(() => {
        if (player && isLooping) {
            const state = player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                checkLoop();
            }
        }
    }, 100);
}

// Parar verificação de loop
function stopLoopCheck() {
    if (loopInterval) {
        clearInterval(loopInterval);
        loopInterval = null;
    }
}

// Limpar pontos
function clearPoints() {
    pointA = null;
    pointB = null;
    isLooping = false;
    
    updatePointDisplay('point-a-display', null);
    updatePointDisplay('point-b-display', null);
    
    const toggleBtn = document.getElementById('toggle-loop');
    toggleBtn.textContent = 'Iniciar Loop';
    toggleBtn.classList.remove('btn-danger');
    toggleBtn.classList.add('btn-success');
    toggleBtn.disabled = true;
    
    const statusDiv = document.getElementById('loop-status');
    statusDiv.textContent = '';
    statusDiv.classList.remove('looping');
    
    stopLoopCheck();
}

// Recomeçar vídeo
function restart() {
    if (!player) return;
    try {
        player.seekTo(0, true);
        player.playVideo();
    } catch (e) {
        showError('Erro ao recomeçar o vídeo');
    }
}

// Retroceder 5 segundos
function rewind5() {
    if (!player) return;
    try {
        const current = player.getCurrentTime();
        const newTime = Math.max(0, current - 5);
        player.seekTo(newTime, true);
    } catch (e) {
        showError('Erro ao retroceder');
    }
}

// Retroceder 10 segundos
function rewind10() {
    if (!player) return;
    try {
        const current = player.getCurrentTime();
        const newTime = Math.max(0, current - 10);
        player.seekTo(newTime, true);
    } catch (e) {
        showError('Erro ao retroceder');
    }
}

// Avançar 5 segundos
function forward5() {
    if (!player) return;
    try {
        const current = player.getCurrentTime();
        const duration = player.getDuration();
        const newTime = Math.min(duration, current + 5);
        player.seekTo(newTime, true);
    } catch (e) {
        showError('Erro ao avançar');
    }
}

// Avançar 10 segundos
function forward10() {
    if (!player) return;
    try {
        const current = player.getCurrentTime();
        const duration = player.getDuration();
        const newTime = Math.min(duration, current + 10);
        player.seekTo(newTime, true);
    } catch (e) {
        showError('Erro ao avançar');
    }
}

// Mostrar erro
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(hideError, 5000);
}

// Esconder erro
function hideError() {
    document.getElementById('error-message').style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Garantir que a API está carregada
    if (typeof YT !== 'undefined' && YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    // Botão carregar vídeo
    document.getElementById('load-video').addEventListener('click', loadVideo);
    
    // Enter no campo de URL
    document.getElementById('youtube-url').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadVideo();
        }
    });

    // Controles de loop
    document.getElementById('set-point-a').addEventListener('click', setPointA);
    document.getElementById('set-point-b').addEventListener('click', setPointB);
    document.getElementById('toggle-loop').addEventListener('click', toggleLoop);
    document.getElementById('clear-points').addEventListener('click', clearPoints);

    // Controles de reprodução
    document.getElementById('restart').addEventListener('click', restart);
    document.getElementById('rewind-10').addEventListener('click', rewind10);
    document.getElementById('rewind-5').addEventListener('click', rewind5);
    document.getElementById('forward-5').addEventListener('click', forward5);
    document.getElementById('forward-10').addEventListener('click', forward10);
});

