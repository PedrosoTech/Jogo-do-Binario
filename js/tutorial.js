class TutorialSystem {
    constructor() {
        this.steps = [
            {
                id: 'welcome',
                title: 'Bem-vindo ao Jogo!',
                message: 'Vamos aprender como jogar? É fácil e divertido!',
                position: 'center',
                action: 'next'
            },
            {
                id: 'binary',
                title: 'Código Binário',
                message: 'Cada palavra está codificada em binário. Cada grupo de 8 números representa uma letra.',
                position: '.binary-word',
                action: 'next'
            },
            {
                id: 'input',
                title: 'Digite sua Resposta',
                message: 'Digite a palavra que você acha que está codificada e clique em verificar.',
                position: '.input-area',
                action: 'next'
            },
            {
                id: 'hints',
                title: 'Precisa de Ajuda?',
                message: 'Use o botão de dicas para receber ajuda, mas lembre-se: cada dica reduz seus pontos!',
                position: '.hint-button',
                action: 'next'
            },
            {
                id: 'stats',
                title: 'Acompanhe seu Progresso',
                message: 'Veja suas estatísticas, conquistas e nível atual nos painéis laterais.',
                position: '.stats-panel',
                action: 'next'
            },
            {
                id: 'finish',
                title: 'Pronto para Começar!',
                message: 'Agora você já sabe o básico. Boa sorte!',
                position: 'center',
                action: 'finish'
            }
        ];

        this.currentStep = 0;
        this.setupTutorial();
    }

    setupTutorial() {
        if (!localStorage.getItem('tutorialCompleted')) {
            this.showTutorial();
        }

        // Adiciona botão de ajuda no canto superior direito
        const helpButton = document.createElement('button');
        helpButton.className = 'help-button';
        helpButton.innerHTML = '❓';
        helpButton.addEventListener('click', () => this.showTutorial());
        document.body.appendChild(helpButton);
    }

    showTutorial() {
        this.currentStep = 0;
        this.createOverlay();
        this.showStep();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'tutorial-overlay';
        document.body.appendChild(overlay);
    }

    showStep() {
        const step = this.steps[this.currentStep];
        const existing = document.querySelector('.tutorial-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.className = 'tutorial-popup';
        popup.innerHTML = `
            <div class="tutorial-header">
                <h3>${step.title}</h3>
                <span class="step-counter">${this.currentStep + 1}/${this.steps.length}</span>
            </div>
            <div class="tutorial-content">
                <p>${step.message}</p>
                <div class="tutorial-actions">
                    ${this.currentStep > 0 ? 
                        '<button class="tutorial-prev">← Anterior</button>' : ''}
                    <button class="tutorial-${step.action}">
                        ${step.action === 'finish' ? 'Concluir' : 'Próximo →'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);
        this.positionPopup(popup, step.position);
        this.addStepListeners(popup);
    }

    positionPopup(popup, position) {
        if (position === 'center') {
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            return;
        }

        const target = document.querySelector(position);
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        // Calcula a melhor posição baseada no espaço disponível
        const positions = this.calculateBestPosition(targetRect, popupRect);
        
        popup.style.top = positions.top + 'px';
        popup.style.left = positions.left + 'px';

        // Adiciona seta indicativa
        this.addArrow(popup, positions.arrow);
    }

    calculateBestPosition(targetRect, popupRect) {
        const margin = 20;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Tenta posicionar abaixo primeiro
        if (targetRect.bottom + popupRect.height + margin < windowHeight) {
            return {
                top: targetRect.bottom + margin,
                left: Math.max(margin, Math.min(
                    targetRect.left + (targetRect.width - popupRect.width) / 2,
                    windowWidth - popupRect.width - margin
                )),
                arrow: 'top'
            };
        }

        // Tenta posicionar acima
        if (targetRect.top - popupRect.height - margin > 0) {
            return {
                top: targetRect.top - popupRect.height - margin,
                left: Math.max(margin, Math.min(
                    targetRect.left + (targetRect.width - popupRect.width) / 2,
                    windowWidth - popupRect.width - margin
                )),
                arrow: 'bottom'
            };
        }

        // Posiciona ao lado se necessário
        return {
            top: Math.max(margin, Math.min(
                targetRect.top + (targetRect.height - popupRect.height) / 2,
                windowHeight - popupRect.height - margin
            )),
            left: targetRect.right + margin,
            arrow: 'left'
        };
    }

    addArrow(popup, position) {
        const arrow = document.createElement('div');
        arrow.className = `tutorial-arrow tutorial-arrow-${position}`;
        popup.appendChild(arrow);
    }

    addStepListeners(popup) {
        const nextBtn = popup.querySelector('.tutorial-next, .tutorial-finish');
        const prevBtn = popup.querySelector('.tutorial-prev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentStep === this.steps.length - 1) {
                    this.finishTutorial();
                } else {
                    this.currentStep++;
                    this.showStep();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentStep--;
                this.showStep();
            });
        }
    }

    finishTutorial() {
        localStorage.setItem('tutorialCompleted', 'true');
        document.querySelector('.tutorial-overlay')?.remove();
        document.querySelector('.tutorial-popup')?.remove();
    }
} 