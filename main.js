var degree = 1800;
var clicks = 0;
var spinning = false; // Move this to the global scope
var graus = 0;
var hideModal; // Declare hideModal in global scope
var wheelItems; // Declare wheelItems in global scope

// Declarar as funções de manipulação da roleta no escopo global
var removeItemAndRebuildWheel;
var rebuildWheel;

$(document).ready(function(){
    var recordingHistory = false;
    var historyItems = [];                                                              

    // Dados da roleta
    wheelItems = [
        { text: "AG", fullscreenText: "AGAIN", explanation: "Você tem direito a uma nova rodada! Gire novamente." },
        { text: "1", fullscreenText: "1", explanation: "Vesícula Seminal: Glândula que produz parte do líquido seminal, rico em nutrientes para os espermatozoides." },
        { text: "2", fullscreenText: "2", explanation: "Tubas Uterinas: Tubos que conectam os ovários ao útero e são local de fecundação." },
        { text: "3", fullscreenText: "3", explanation: "Ovários: Glândulas femininas que produzem ovócitos e hormônios sexuais." },
        { text: "4", fullscreenText: "4", explanation: "Vagina: Canal que conecta o útero ao exterior, por onde passam os espermatozoides e a menstruação e por onde ocorre o parto." },
        { text: "5", fullscreenText: "5", explanation: "Epidídimo: Local onde os espermatozoides amadurecem e são armazenados." },
        { text: "6", fullscreenText: "6", explanation: "Uretra: Canal pelo qual a urina e o sêmen são expelidos no sistema reprodutor masculino." },
        { text: "7", fullscreenText: "7", explanation: "Período Fértil: Fase do ciclo menstrual com maior chance de engravidar, ocorrendo em torno da ovulação." },
        { text: "AG", fullscreenText: "AGAIN", explanation: "Você tem direito a uma nova rodada! Gire novamente." },
        { text: "8", fullscreenText: "8", explanation: "Endométrio: Camada interna do útero onde o embrião se implanta; é descamado durante a menstruação se não houver fecundação." },
        { text: "9", fullscreenText: "9", explanation: "Testículos: Órgãos que produzem espermatozoides e testosterona, fundamentais para a reprodução e desenvolvimento de características sexuais masculinas." },
        { text: "10", fullscreenText: "10", explanation: "Bolsa Escrotal: Bolsa que contém e protege os testículos, regulando sua temperatura para a produção de espermatozoides." },
        { text: "11", fullscreenText: "11", explanation: "Menstruação: Descamação periódica do endométrio, parte do ciclo menstrual feminino." },
        { text: "12", fullscreenText: "12", explanation: "Ductos Deferentes: Canais que transportam espermatozoides dos testículos até a uretra." },
        { text: "13", fullscreenText: "13", explanation: "Ejaculação: Processo pelo qual o sêmen é expelido através da uretra durante o orgasmo." },
        { text: "AG", fullscreenText: "AGAIN", explanation: "Você tem direito a uma nova rodada! Gire novamente." },
        { text: "14", fullscreenText: "14", explanation: "Sêmen: Fluido que contém espermatozoides e é liberado durante a ejaculação." },
        { text: "15", fullscreenText: "15", explanation: "Fecundação: União do gameta masculino (espermatozoide) com o gameta feminino (ovócito) para formar um novo ser." },
        { text: "16", fullscreenText: "16", explanation: "Pênis: Órgão masculino responsável pela excreção de urina e deposição do sêmen no trato reprodutivo feminino." },
        { text: "17", fullscreenText: "17", explanation: "Útero: Órgão muscular feminino onde o feto se desenvolve durante a gravidez." },
        { text: "18", fullscreenText: "18", explanation: "Próstata: Glândula masculina que produz parte do líquido seminal e envolve a uretra." },
        { text: "19", fullscreenText: "19", explanation: "Espermatozoide: Célula reprodutora masculina que fecunda o óvulo." },
        { text: "AG", fullscreenText: "AGAIN", explanation: "Você tem direito a uma nova rodada! Gire novamente." },
        { text: "20", fullscreenText: "20", explanation: "Óvulo: Célula reprodutora feminina que, quando fecundada, desenvolve-se em um embrião." },
        { text: "21", fullscreenText: "21", explanation: "Clitóris: Órgão feminino altamente sensível, importante para o prazer sexual." },
        { text: "22", fullscreenText: "22", explanation: "Lábios Vaginais: Dobras de pele que protegem a entrada da vagina." },
        { text: "23", fullscreenText: "23", explanation: "Vulva: Conjunto de órgãos genitais externos femininos." },
        { text: "24", fullscreenText: "24", explanation: "Hormônios Sexuais: Substâncias que regulam as funções reprodutivas e características sexuais secundárias." },
        { text: "25", fullscreenText: "25", explanation: "Puberdade: Período de desenvolvimento em que o corpo se torna capaz de reprodução." },
        { text: "26", fullscreenText: "26", explanation: "Placenta: Órgão temporário que fornece oxigênio e nutrientes ao feto durante a gravidez." },
        { text: "27", fullscreenText: "27", explanation: "Cordão Umbilical: Estrutura que conecta o feto à placenta, transportando nutrientes e resíduos." }
    ];

    // Geração dinâmica das seções da roleta
    var $interno = $('#interno-roleta');
    $interno.empty();

    // Cria as seções com ângulo correto
    const totalSections = wheelItems.length;
    const anglePerSection = 360 / totalSections;

    for (let i = 0; i < totalSections; i++) {
        let section = $('<div>').addClass('sec');
        let text = $('<span>').addClass('texto').text(wheelItems[i].text);
        section.append(text);
        section.css('transform', `rotate(${i * anglePerSection}deg)`);
        $interno.append(section);
    }

    // Modal elements
    var modal = document.getElementById("resultModal");
    var span = document.getElementsByClassName("close")[0];
    var modalResult = document.getElementById("modalResult");

    // Função para mostrar o modal com animação
    function showModal() {
        modal.style.display = "block";
        modal.classList.add('show');
    }

    // Assign hideModal to the global variable
    hideModal = function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    };

    // Make showModal globally accessible too
    window.showModal = showModal;

    // Close modal when clicking X
    span.onclick = function() {
        hideModal();
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            hideModal();
        }
    }

    $('#spin').click(function(){
        if(!spinning){
            spinning = true;
            $('.texto.selected').removeClass('selected');
            
            // Use global hideModal or a safe check
            if (typeof hideModal === 'function') {
                hideModal(); // Esconde o modal se estiver aberto
            }
            
            var novoGrau = graus + Math.floor(Math.random() * 1800 + 1800);
            
            $('#interno-roleta').css({
                'transform' : 'rotate(' + novoGrau + 'deg)'
            });

            setTimeout(function(){
                spinning = false;
                graus = novoGrau % 360;
                
                // Calculate which section the wheel landed on
                var adjustedDegree = (360 - graus + 5.8) % 360;
                var resultado = Math.floor((adjustedDegree / (360/wheelItems.length)));
                if (resultado >= wheelItems.length) resultado = 0;
                
                // Get result from wheelItems
                var item = wheelItems[resultado];
                
                // Use the globally accessible addToHistory function
                if (window.addToHistory) {
                    window.addToHistory(item);
                }

                // Criar a bolinha primeiro, mas manter invisível
                const bullet = document.createElement('div');
                bullet.className = 'bullet';
                document.getElementById('container').appendChild(bullet);

                // Posição inicial (centro do botão spin)
                const container = document.getElementById('container');
                const containerRect = container.getBoundingClientRect();
                const spinButton = document.getElementById('spin');
                const spinRect = spinButton.getBoundingClientRect();
                const startX = spinRect.left - containerRect.left + spinRect.width / 2;
                const startY = spinRect.top - containerRect.top + spinRect.height / 2;

                // Função para mover a bolinha
                function moveBullet(targetElement, bullet) {
                    const targetRect = targetElement.getBoundingClientRect();
                    const bulletRect = bullet.getBoundingClientRect();
                    
                    const targetX = targetRect.left + (targetRect.width / 2) - (bulletRect.width / 2);
                    const targetY = targetRect.top + (targetRect.height / 2) - (bulletRect.height / 2);
                    
                    bullet.style.transform = `translate(${targetX}px, ${targetY}px)`;
                    
                    // Aguarda o tempo da animação antes de selecionar o número
                    setTimeout(() => {
                        document.querySelectorAll('.texto').forEach(el => el.classList.remove('selected'));
                        targetElement.classList.add('selected');
                    }, 200); // Ajustado para coincidir com o tempo da animação da bolinha
                }

                // Iniciar a animação da bolinha e seleção do número simultaneamente
                requestAnimationFrame(() => {
                    // Encontrar o elemento texto selecionado
                    const selectedText = $('.texto').eq(resultado);
                    const selectedElement = selectedText[0];
                    
                    // Calcular a posição final
                    const targetRect = selectedElement.getBoundingClientRect();
                    const targetX = targetRect.left - containerRect.left + (targetRect.width / 2);
                    const targetY = targetRect.top - containerRect.top + (targetRect.height / 2);
                    
                    bullet.style.opacity = '1';
                    bullet.style.transform = `translate(${targetX}px, ${targetY}px)`;
                    selectedText.addClass('selected');
                    
                    // Remover a bolinha após a animação e mostrar o modal
                    setTimeout(() => {
                        bullet.remove();
                        modalResult.innerHTML = `<h3>${item.fullscreenText}</h3><p>${item.explanation}</p>`;
                        showModal();
                        
                        // Se não for "AGAIN", remover o item da roleta
                        if (item.text !== "AG") {
                            // Adicionamos um pequeno atraso para que a remoção ocorra após o modal ser mostrado
                            setTimeout(() => {
                                // Agora a função está acessível globalmente
                                if (typeof removeItemAndRebuildWheel === 'function') {
                                    removeItemAndRebuildWheel(resultado);
                                } else {
                                    console.error("A função removeItemAndRebuildWheel não está definida");
                                }
                            }, 500);
                        }
                    }, 300);
                });

            }, 6000);
        }
    });

    // Definir as funções para serem acessíveis globalmente
    removeItemAndRebuildWheel = function(index) {
        // Remover o item do array de wheelItems
        wheelItems.splice(index, 1);
        
        // Reconstruir a roleta com os itens restantes
        rebuildWheel();
    };
    
    rebuildWheel = function() {
        var $interno = $('#interno-roleta');
        $interno.empty();
        
        // Atualiza o ângulo com base no número atual de itens
        const totalSections = wheelItems.length;
        const anglePerSection = 360 / totalSections;
        
        // Recria as seções com os itens restantes
        for (let i = 0; i < totalSections; i++) {
            let section = $('<div>').addClass('sec');
            let text = $('<span>').addClass('texto').text(wheelItems[i].text);
            section.append(text);
            section.css('transform', `rotate(${i * anglePerSection}deg)`);
            $interno.append(section);
        }
        
        // Adicionando animação para a transição suave da roleta
        $interno.css('transition', 'transform 1s ease-out, width 0.5s ease, height 0.5s ease');
        
        // Ajusta o tamanho da roleta com base no número de itens (opcional)
        const scaleFactor = Math.max(0.5, totalSections / 31); // Não deixa ficar menor que 50%
        const newSize = 100 * scaleFactor;
        
        // Reajusta o tamanho da roleta
        setTimeout(() => {
            $interno.css('transition', 'transform 5s cubic-bezier(0.1, 0, 0.1, 1) 0s');
        }, 1000); // Restaura a transição original após 1 segundo
    }

    // Adiciona o evento de clique ao botão spin
    document.querySelector('.spin-button').addEventListener('click', function() {
        // Definindo a função spinWheel para chamar o clique no botão spin
        if (!spinning) {
            $('#spin').click();
        }
    });
});

// Fullscreen functionality
const fullscreenButton = document.querySelector('.fullscreen-button');
const container = document.getElementById('container');

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        container.classList.add('fullscreen');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        container.classList.remove('fullscreen');
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        container.classList.remove('fullscreen');
    }
});

// Create history panel after fullscreen button is initialized
$(document).ready(function() {
    var recordingHistory = false;
    var historyItems = [];
    var historyVisible = false;
    
    // Create history panel
    var historyPanel = $('<div>').attr('id', 'history-panel').addClass('history-panel history-collapsed');
    var historyHeader = $('<div>').addClass('history-header');
    var historyTitle = $('<h3>').text('Histórico');
    
    // Melhorar o botão de alternância com ícone e tooltip
    var toggleButton = $('<button>')
        .addClass('toggle-history-button')
        .attr('title', 'Mostrar histórico')
        .html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
    
    historyHeader.append(historyTitle, toggleButton);
    
    var historyContent = $('<div>').addClass('history-content');
    var historyList = $('<div>').addClass('history-list');
    var historyControls = $('<div>').addClass('history-controls');
    
    // Create start and stop buttons with improved design
    var startButton = $('<button>').addClass('history-button start-button')
        .html('<div class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg><span>Iniciar</span></div>')
        .attr('title', 'Começar a registrar resultados');
        
    var stopButton = $('<button>').addClass('history-button stop-button')
        .html('<div class="button-content"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg><span>Parar</span></div>')
        .attr('title', 'Parar de registrar e limpar histórico')
        .prop('disabled', true);
    
    historyControls.append(startButton, stopButton);
    historyContent.append(historyList, historyControls);
    historyPanel.append(historyHeader, historyContent);
    
    // Ocultar o conteúdo inicialmente
    historyContent.hide();
    
    // Create a wrapper div for center alignment
    var centerWrapper = $('<div>').addClass('history-center-wrapper');
    centerWrapper.append(historyPanel);
    
    // Insert after fullscreen button
    $('.fullscreen-button').after(centerWrapper);
    
    // Toggle button functionality
    toggleButton.click(function() {
        historyVisible = !historyVisible;
        
        if (historyVisible) {
            historyContent.slideDown(300);
            toggleButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>');
            toggleButton.attr('title', 'Ocultar histórico');
            historyPanel.removeClass('history-collapsed');
        } else {
            historyContent.slideUp(300);
            toggleButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
            toggleButton.attr('title', 'Mostrar histórico');
            historyPanel.addClass('history-collapsed');
        }
    });
    
    // Add event listeners for start/stop buttons
    startButton.click(function() {
        recordingHistory = true;
        startButton.prop('disabled', true);
        stopButton.prop('disabled', false);
    });
    
    stopButton.click(function() {
        recordingHistory = false;
        historyItems = [];
        historyList.empty();
        startButton.prop('disabled', false);
        stopButton.prop('disabled', true);
    });
    
    // Function to add item to history
    window.addToHistory = function(item) {
        if (!recordingHistory) return;
        
        historyItems.push(item);
        
        var historyItem = $('<div>').addClass('history-item');
        var itemNumber = $('<span>').addClass('history-number').text(item.fullscreenText + ": ");
        var itemExplanation = $('<span>').addClass('history-explanation').text(item.explanation);
        
        historyItem.append(itemNumber, itemExplanation);
        historyList.prepend(historyItem); // Add new items at the top
    };
});

// Update the CSS for the history panel to position it properly
const style = document.createElement('style');
style.textContent = `
.history-center-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
}

.history-panel {
    position: relative;
    width: 300px;
    max-height: 80%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: 'Arial', sans-serif;
    transition: all 0.3s ease;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-bottom: 5px;
}

.history-panel h3 {
    margin: 0;
    text-align: center;
    color: #333;
    font-size: 1.3em;
    flex-grow: 1;
}

.toggle-history-button {
    background: #ff9800;
    color: white;
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 0;
    outline: none;
    position: relative;
    overflow: hidden;
}

.toggle-history-button svg {
    transition: transform 0.3s ease;
}

.toggle-history-button:hover {
    background: #fb8c00;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.1);
}

.toggle-history-button:hover svg {
    transform: scale(1.1);
}

.toggle-history-button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.toggle-history-button:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
}

.toggle-history-button:focus:not(:active)::after {
    animation: ripple 1s ease-out;
}

@keyframes ripple {
    0% {
        transform: scale(0, 0);
        opacity: 0.5;
    }
    20% {
        transform: scale(25, 25);
        opacity: 0.3;
    }
    100% {
        opacity: 0;
        transform: scale(40, 40);
    }
}

.history-content {
    border-top: 2px solid #ff9800;
    margin-top: 10px;
    padding-top: 10px;
    overflow: hidden;
}

.history-collapsed {
    padding-bottom: 5px;
}

.history-list {
    overflow-y: auto;
    flex-grow: 1;
    max-height: 300px;
    padding: 5px;
    margin: 0 0 10px 0;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
}

.history-item {
    margin-bottom: 8px;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s;
}

.history-item:hover {
    background-color: rgba(255, 152, 0, 0.1);
}

.history-number {
    font-weight: bold;
    color: #e65100;
}

.history-explanation {
    color: #333;
}

.history-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    gap: 12px;
}

.history-button {
    flex: 1;
    padding: 0;
    height: 40px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.25s ease;
    outline: none;
    position: relative;
    overflow: hidden;
    color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.12);
}

.button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    position: relative;
    z-index: 1;
}

.history-button svg {
    flex-shrink: 0;
}

.history-button span {
    text-transform: uppercase;
    letter-spacing: 0.7px;
}

.start-button {
    background-color: #4CAF50;
}

.start-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #66BB6A, #43A047);
    opacity: 0;
    transition: opacity 0.25s ease;
}

.start-button:hover:not(:disabled):before {
    opacity: 1;
}

.start-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0,0,0,0.2);
}

.stop-button {
    background-color: #f44336;
}

.stop-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #EF5350, #E53935);
    opacity: 0;
    transition: opacity 0.25s ease;
}

.stop-button:hover:not(:disabled):before {
    opacity: 1;
}

.stop-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0,0,0,0.2);
}

.history-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none !important;
}

.history-button:active:not(:disabled) {
    transform: translateY(1px) !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.history-button:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
    z-index: 0;
}

.history-button:focus:not(:active):after {
    animation: ripple 0.8s ease-out;
}

@media (max-width: 768px) {
    .history-button {
        height: 36px;
        border-radius: 10px;
    }
    
    .history-button span {
        font-size: 12px;
    }
    
    .history-button svg {
        width: 14px;
        height: 14px;
    }
}

.fullscreen .history-center-wrapper {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    z-index: 1000;
}

.fullscreen .history-panel {
    background: rgba(255, 255, 255, 0.95);
}
`;

// Fix: Need to update the main document ready function to call the addToHistory function
$(document).ready(function() {
    // Find the existing code for handling the spin result
    var originalSpinFunction = $('#spin').click;
    
    $('#spin').off('click').click(function() {
        if(!spinning) {
            spinning = true;
            $('.texto.selected').removeClass('selected');
            
            // Use global hideModal or a safe check
            if (typeof hideModal === 'function') {
                hideModal(); // Esconde o modal se estiver aberto
            }
            
            var novoGrau = graus + Math.floor(Math.random() * 1800 + 1800);
            
            $('#interno-roleta').css({
                'transform' : 'rotate(' + novoGrau + 'deg)'
            });

            setTimeout(function(){
                spinning = false;
                graus = novoGrau % 360;
                
                // Calculate which section the wheel landed on
                var adjustedDegree = (360 - graus + 5.8) % 360;
                var resultado = Math.floor((adjustedDegree / (360/wheelItems.length)));
                if (resultado >= wheelItems.length) resultado = 0;
                
                // Get result from wheelItems
                var item = wheelItems[resultado];
                
                // Use the globally accessible addToHistory function
                if (window.addToHistory) {
                    window.addToHistory(item);
                }

                // Criar a bolinha primeiro, mas manter invisível
                const bullet = document.createElement('div');
                bullet.className = 'bullet';
                document.getElementById('container').appendChild(bullet);

                // Posição inicial (centro do botão spin)
                const container = document.getElementById('container');
                const containerRect = container.getBoundingClientRect();
                const spinButton = document.getElementById('spin');
                const spinRect = spinButton.getBoundingClientRect();
                const startX = spinRect.left - containerRect.left + spinRect.width / 2;
                const startY = spinRect.top - containerRect.top + spinRect.height / 2;

                // Função para mover a bolinha
                function moveBullet(targetElement, bullet) {
                    const targetRect = targetElement.getBoundingClientRect();
                    const bulletRect = bullet.getBoundingClientRect();
                    
                    const targetX = targetRect.left + (targetRect.width / 2) - (bulletRect.width / 2);
                    const targetY = targetRect.top + (targetRect.height / 2) - (bulletRect.height / 2);
                    
                    bullet.style.transform = `translate(${targetX}px, ${targetY}px)`;
                    
                    // Aguarda o tempo da animação antes de selecionar o número
                    setTimeout(() => {
                        document.querySelectorAll('.texto').forEach(el => el.classList.remove('selected'));
                        targetElement.classList.add('selected');
                    }, 200); // Ajustado para coincidir com o tempo da animação da bolinha
                }

                // Iniciar a animação da bolinha e seleção do número simultaneamente
                requestAnimationFrame(() => {
                    // Encontrar o elemento texto selecionado
                    const selectedText = $('.texto').eq(resultado);
                    const selectedElement = selectedText[0];
                    
                    // Calcular a posição final
                    const targetRect = selectedElement.getBoundingClientRect();
                    const targetX = targetRect.left - containerRect.left + (targetRect.width / 2);
                    const targetY = targetRect.top - containerRect.top + (targetRect.height / 2);
                    
                    bullet.style.opacity = '1';
                    bullet.style.transform = `translate(${targetX}px, ${targetY}px)`;
                    selectedText.addClass('selected');
                    
                    // Remover a bolinha após a animação e mostrar o modal
                    setTimeout(() => {
                        bullet.remove();
                        modalResult.innerHTML = `<h3>${item.fullscreenText}</h3><p>${item.explanation}</p>`;
                        showModal();
                        
                        // Se não for "AGAIN", remover o item da roleta
                        if (item.text !== "AG") {
                            // Adicionamos um pequeno atraso para que a remoção ocorra após o modal ser mostrado
                            setTimeout(() => {
                                // Agora a função está acessível globalmente
                                if (typeof removeItemAndRebuildWheel === 'function') {
                                    removeItemAndRebuildWheel(resultado);
                                } else {
                                    console.error("A função removeItemAndRebuildWheel não está definida");
                                }
                            }, 500);
                        }
                    }, 300);
                });

            }, 6000);
        }
    });
});

// Adicionar spinWheel como função global
function spinWheel() {
    if (!spinning) {
        $('#spin').click();
    }
}