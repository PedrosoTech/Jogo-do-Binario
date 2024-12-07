class RewardSystem {
    constructor() {
        this.rewards = {
            // Medalhas de Velocidade
            speedster: {
                id: 'speedster',
                title: 'Velocista',
                description: 'Acerte uma palavra em menos de 5 segundos',
                icon: '⚡',
                tier: {
                    bronze: { count: 1, icon: '🥉' },
                    silver: { count: 10, icon: '🥈' },
                    gold: { count: 50, icon: '🥇' }
                },
                progress: 0,
                unlocked: false
            },
            // Medalhas de Sequência
            streakMaster: {
                id: 'streakMaster',
                title: 'Mestre das Sequências',
                description: 'Mantenha uma sequência de acertos',
                icon: '🔥',
                tier: {
                    bronze: { count: 5, icon: '🥉' },
                    silver: { count: 15, icon: '🥈' },
                    gold: { count: 30, icon: '🥇' }
                },
                progress: 0,
                unlocked: false
            },
            // Medalhas de Dificuldade
            challenger: {
                id: 'challenger',
                title: 'Desafiante',
                description: 'Vença palavras difíceis',
                icon: '🎯',
                tier: {
                    bronze: { count: 5, icon: '🥉' },
                    silver: { count: 25, icon: '🥈' },
                    gold: { count: 100, icon: '🥇' }
                },
                progress: 0,
                unlocked: false
            },
            // Medalhas de Dedicação
            dedicated: {
                id: 'dedicated',
                title: 'Dedicado',
                description: 'Tempo total de jogo',
                icon: '⏰',
                tier: {
                    bronze: { count: 3600, icon: '🥉' }, // 1 hora
                    silver: { count: 18000, icon: '🥈' }, // 5 horas
                    gold: { count: 72000, icon: '🥇' } // 20 horas
                },
                progress: 0,
                unlocked: false
            },
            // Medalhas de Perfeição
            perfectionist: {
                id: 'perfectionist',
                title: 'Perfeccionista',
                description: 'Acerte palavras sem usar dicas',
                icon: '💎',
                tier: {
                    bronze: { count: 10, icon: '🥉' },
                    silver: { count: 50, icon: '🥈' },
                    gold: { count: 200, icon: '🥇' }
                },
                progress: 0,
                unlocked: false
            }
        };

        this.loadProgress();
        this.setupRewardsPanel();
    }

    loadProgress() {
        const saved = localStorage.getItem('rewards');
        if (saved) {
            const savedRewards = JSON.parse(saved);
            for (const key in savedRewards) {
                if (this.rewards[key]) {
                    this.rewards[key].progress = savedRewards[key].progress;
                    this.rewards[key].unlocked = savedRewards[key].unlocked;
                }
            }
        }
    }

    setupRewardsPanel() {
        const panel = document.createElement('div');
        panel.className = 'rewards-panel';
        panel.innerHTML = `
            <div class="rewards-header">
                <h3>Medalhas</h3>
                <button class="toggle-rewards">🏆</button>
            </div>
            <div class="rewards-content">
                ${this.renderRewards()}
            </div>
        `;

        document.body.appendChild(panel);

        panel.querySelector('.toggle-rewards').addEventListener('click', () => {
            panel.classList.toggle('expanded');
        });
    }

    renderRewards() {
        return Object.values(this.rewards)
            .map(reward => {
                const currentTier = this.getCurrentTier(reward);
                const nextTier = this.getNextTier(reward);
                const progress = nextTier ? 
                    (reward.progress / nextTier.count * 100).toFixed(1) : 100;

                return `
                    <div class="reward-item ${reward.unlocked ? 'unlocked' : ''}">
                        <div class="reward-icon">
                            ${reward.icon}
                            ${currentTier ? currentTier.icon : ''}
                        </div>
                        <div class="reward-info">
                            <h4>${reward.title}</h4>
                            <p>${reward.description}</p>
                            <div class="reward-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                                <span class="progress-text">
                                    ${reward.progress}/${nextTier ? nextTier.count : 'MAX'}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
    }

    getCurrentTier(reward) {
        const tiers = ['gold', 'silver', 'bronze'];
        for (const tier of tiers) {
            if (reward.progress >= reward.tier[tier].count) {
                return {
                    name: tier,
                    ...reward.tier[tier]
                };
            }
        }
        return null;
    }

    getNextTier(reward) {
        const tiers = ['bronze', 'silver', 'gold'];
        for (const tier of tiers) {
            if (reward.progress < reward.tier[tier].count) {
                return {
                    name: tier,
                    ...reward.tier[tier]
                };
            }
        }
        return null;
    }

    updateProgress(gameStats) {
        // Atualiza progresso das medalhas baseado nas estatísticas do jogo
        if (gameStats.guessTime < 5) {
            this.incrementReward('speedster');
        }

        if (gameStats.streak > 0) {
            this.rewards.streakMaster.progress = Math.max(
                this.rewards.streakMaster.progress,
                gameStats.streak
            );
        }

        if (gameStats.difficulty === 'dificil' && gameStats.correct) {
            this.incrementReward('challenger');
        }

        this.rewards.dedicated.progress = gameStats.totalPlayTime;

        if (gameStats.correct && !gameStats.usedHint) {
            this.incrementReward('perfectionist');
        }

        this.checkUnlocks();
        this.saveProgress();
        this.updateDisplay();
    }

    incrementReward(rewardId) {
        if (this.rewards[rewardId]) {
            this.rewards[rewardId].progress++;
        }
    }

    checkUnlocks() {
        Object.values(this.rewards).forEach(reward => {
            const currentTier = this.getCurrentTier(reward);
            if (currentTier && !reward.unlocked) {
                reward.unlocked = true;
                this.showUnlockAnimation(reward, currentTier);
            }
        });
    }

    showUnlockAnimation(reward, tier) {
        const notification = document.createElement('div');
        notification.className = 'reward-notification';
        notification.innerHTML = `
            <div class="reward-unlock-content">
                <div class="reward-icons">
                    ${reward.icon}${tier.icon}
                </div>
                <h3>Nova Medalha Desbloqueada!</h3>
                <p>${reward.title} - ${tier.name.toUpperCase()}</p>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    saveProgress() {
        localStorage.setItem('rewards', JSON.stringify(this.rewards));
    }

    updateDisplay() {
        const content = document.querySelector('.rewards-content');
        if (content) {
            content.innerHTML = this.renderRewards();
        }
    }
} 