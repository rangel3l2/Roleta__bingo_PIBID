var degree = 1800;
var clicks = 0;

$(document).ready(function(){
    var graus = 0;
    var spinning = false;

    // Dados da roleta
    const wheelItems = [
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

    // Função para esconder o modal
    function hideModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

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
            hideModal(); // Esconde o modal se estiver aberto
            
            var novoGrau = graus + Math.floor(Math.random() * 1800 + 1800);
            
            $('#interno-roleta').css({
                'transform' : 'rotate(' + novoGrau + 'deg)'
            });

            setTimeout(function(){
                spinning = false;
                graus = novoGrau % 360;
                
                // Calculate which section the wheel landed on
                var adjustedDegree = (360 - graus + 5.8) % 360;
                var resultado = Math.floor((adjustedDegree / (360/31)));
                if (resultado >= wheelItems.length) resultado = 0;
                
                // Get result from wheelItems
                var item = wheelItems[resultado];

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
                    }, 300);
                });

            }, 6000);
        }
    });

    // Adiciona o evento de clique ao botão spin
    document.querySelector('.spin-button').addEventListener('click', function() {
        spinWheel();
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