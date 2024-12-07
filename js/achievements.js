class AchievementSystem {
    constructor() {
        this.achievements = {
            iniciante: {
                id: 'iniciante',
                title: 'Primeiro Passo',
                description: 'Acerte sua primeira palavra',
                icon: '🎯',
                unlocked: false
            },
            velocista: {
                id: 'velocista',
                title: 'Velocista',
                description: 'Acerte uma palavra em menos de 10 segundos',
                icon: '⚡',
                unlocked: false
            },
            genio: {
                id: 'genio',
                title: 'Gênio Binário',
                description: 'Acerte 5 palavras seguidas sem erro',
                icon: '🧠',
                unlocked: false
            },
            semDicas: {
                id: 'semDicas',
                title: 'Intuição Pura',
                description: 'Acerte sem usar dicas',
                icon: '🔍',
                unlocked: false
            },
            pontuador: {
                id: 'pontuador',
                title: 'Super Pontuador',
                description: 'Alcance 1000 pontos',
                icon: '🏆',
                unlocked: false
            },
            persistente: {
                id: 'persistente',
                title: 'Persistência',
                description: 'Jogue por 30 minutos seguidos',
                icon: '⏰',
                unlocked: false
            }
        };

        this.stats = {
            wordsGuessed: 0,
            hintsUsed: 0,
            totalTime: 0,
            streak: 0,
            bestTime: Infinity
        };

        this.loadProgress();
        this.setupAchievementPanel();
    }

    setupAchievementPanel() {
        const panel = document.createElement('div');
        panel.className = 'achievement-panel';
        panel.innerHTML = `
            <div class="achievement-header">
                <h3>Conquistas</h3>
                <button class="toggle-achievements">🏆</button>
            </div>
            <div class="achievement-list">
                ${this.renderAchievements()}
            </div>
        `;

        document.body.appendChild(panel);

        // Toggle panel
        panel.querySelector('.toggle-achievements').addEventListener('click', () => {
            panel.classList.toggle('expanded');
        });
    }

    renderAchievements() {
        return Object.values(this.achievements)
            .map(achievement => `
                <div class="achievement ${achievement.unlocked ? 'unlocked' : 'locked'}">
                    <span class="achievement-icon">${achievement.icon}</span>
                    <div class="achievement-info">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                </div>
            `).join('');
    }

    checkAchievements(gameStats) {
        const newUnlocks = [];

        // Verifica cada conquista
        if (!this.achievements.iniciante.unlocked && gameStats.wordsGuessed > 0) {
            this.unlockAchievement('iniciante');
            newUnlocks.push(this.achievements.iniciante);
        }

        if (!this.achievements.velocista.unlocked && gameStats.lastGuessTime < 10) {
            this.unlockAchievement('velocista');
            newUnlocks.push(this.achievements.velocista);
        }

        if (!this.achievements.genio.unlocked && gameStats.streak >= 5) {
            this.unlockAchievement('genio');
            newUnlocks.push(this.achievements.genio);
        }

        if (!this.achievements.semDicas.unlocked && gameStats.hintsUsed === 0 && gameStats.wordsGuessed > 0) {
            this.unlockAchievement('semDicas');
            newUnlocks.push(this.achievements.semDicas);
        }

        if (!this.achievements.pontuador.unlocked && gameStats.totalScore >= 1000) {
            this.unlockAchievement('pontuador');
            newUnlocks.push(this.achievements.pontuador);
        }

        if (!this.achievements.persistente.unlocked && gameStats.totalTime >= 1800) {
            this.unlockAchievement('persistente');
            newUnlocks.push(this.achievements.persistente);
        }

        // Mostra notificações para novas conquistas
        if (newUnlocks.length > 0) {
            this.showAchievementNotifications(newUnlocks);
        }
    }

    unlockAchievement(id) {
        this.achievements[id].unlocked = true;
        this.saveProgress();
        this.updateAchievementPanel();
    }

    showAchievementNotifications(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                this.showNotification(achievement);
            }, index * 1500);
        });
    }

    showNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <span class="notification-icon">${achievement.icon}</span>
            <div class="notification-content">
                <h4>Conquista Desbloqueada!</h4>
                <p>${achievement.title}</p>
                <p>${achievement.description}</p>
            </div>
        `;

        document.body.appendChild(notification);

        // Animação de entrada
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    saveProgress() {
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
        localStorage.setItem('stats', JSON.stringify(this.stats));
    }

    loadProgress() {
        const savedAchievements = localStorage.getItem('achievements');
        const savedStats = localStorage.getItem('stats');

        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
        }

        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }

    updateAchievementPanel() {
        const list = document.querySelector('.achievement-list');
        if (list) {
            list.innerHTML = this.renderAchievements();
        }
    }
} 