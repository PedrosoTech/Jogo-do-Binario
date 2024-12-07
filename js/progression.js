class ProgressionSystem {
    constructor() {
        this.levels = {
            1: { exp: 0, title: "Iniciante Binário" },
            2: { exp: 100, title: "Aprendiz de Código" },
            3: { exp: 250, title: "Decodificador Junior" },
            4: { exp: 500, title: "Hacker Amador" },
            5: { exp: 1000, title: "Mestre dos Bits" },
            6: { exp: 2000, title: "Senhor dos Bytes" },
            7: { exp: 4000, title: "Guru Binário" },
            8: { exp: 8000, title: "Lenda Digital" },
            9: { exp: 16000, title: "Oráculo do Código" },
            10: { exp: 32000, title: "Divindade Binária" }
        };

        this.expMultipliers = {
            facil: 1,
            medio: 2,
            dificil: 3
        };

        this.bonuses = {
            speedBonus: 1.5,    // Para respostas rápidas
            streakBonus: 1.2,   // Para sequências de acertos
            noHintBonus: 1.3    // Para acertos sem dicas
        };

        this.playerData = this.loadPlayerData();
        this.setupProgressBar();
    }

    loadPlayerData() {
        const saved = localStorage.getItem('playerProgress');
        return saved ? JSON.parse(saved) : {
            level: 1,
            exp: 0,
            totalExp: 0,
            streakCount: 0,
            gamesPlayed: 0,
            wordsGuessed: 0
        };
    }

    setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'level-progress';
        progressBar.innerHTML = `
            <div class="level-info">
                <span class="current-level">Nível ${this.playerData.level}</span>
                <span class="level-title">${this.levels[this.playerData.level].title}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
                <span class="progress-text">0%</span>
            </div>
            <div class="exp-info">
                <span class="current-exp">EXP: ${this.playerData.exp}</span>
                <span class="next-level">Próximo nível: ${this.getExpToNextLevel()}</span>
            </div>
        `;

        document.querySelector('.container').prepend(progressBar);
        this.updateProgressBar();
    }

    calculateExp(gameStats) {
        let baseExp = 50; // EXP base por palavra
        let totalExp = baseExp * this.expMultipliers[gameStats.difficulty];

        // Bônus por velocidade
        if (gameStats.guessTime < 15) {
            totalExp *= this.bonuses.speedBonus;
        }

        // Bônus por sequência
        if (gameStats.streak > 3) {
            totalExp *= this.bonuses.streakBonus;
        }

        // Bônus por não usar dicas
        if (!gameStats.usedHint) {
            totalExp *= this.bonuses.noHintBonus;
        }

        return Math.round(totalExp);
    }

    addExp(amount) {
        this.playerData.exp += amount;
        this.playerData.totalExp += amount;

        while (this.canLevelUp()) {
            this.levelUp();
        }

        this.updateProgressBar();
        this.saveProgress();
    }

    canLevelUp() {
        const nextLevel = this.playerData.level + 1;
        if (!this.levels[nextLevel]) return false;
        return this.playerData.exp >= this.levels[nextLevel].exp;
    }

    levelUp() {
        const oldLevel = this.playerData.level;
        this.playerData.level++;
        const newLevel = this.playerData.level;

        this.showLevelUpAnimation(oldLevel, newLevel);
        this.playerData.exp -= this.levels[newLevel].exp;
    }

    showLevelUpAnimation(oldLevel, newLevel) {
        const animation = document.createElement('div');
        animation.className = 'level-up-animation';
        animation.innerHTML = `
            <div class="level-up-content">
                <h2>Nível Alcançado!</h2>
                <div class="level-change">
                    <span class="old-level">${oldLevel}</span>
                    <span class="level-arrow">→</span>
                    <span class="new-level">${newLevel}</span>
                </div>
                <p class="new-title">${this.levels[newLevel].title}</p>
            </div>
        `;

        document.body.appendChild(animation);
        setTimeout(() => {
            animation.classList.add('show');
            setTimeout(() => {
                animation.classList.remove('show');
                setTimeout(() => animation.remove(), 300);
            }, 2000);
        }, 100);
    }

    getExpToNextLevel() {
        const nextLevel = this.playerData.level + 1;
        if (!this.levels[nextLevel]) return 'Nível Máximo';
        return this.levels[nextLevel].exp - this.playerData.exp;
    }

    updateProgressBar() {
        const currentLevelExp = this.levels[this.playerData.level].exp;
        const nextLevelExp = this.levels[this.playerData.level + 1]?.exp || currentLevelExp;
        const progress = ((this.playerData.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

        const progressBar = document.querySelector('.level-progress');
        if (progressBar) {
            progressBar.querySelector('.current-level').textContent = `Nível ${this.playerData.level}`;
            progressBar.querySelector('.level-title').textContent = this.levels[this.playerData.level].title;
            progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
            progressBar.querySelector('.progress-text').textContent = `${Math.round(progress)}%`;
            progressBar.querySelector('.current-exp').textContent = `EXP: ${this.playerData.exp}`;
            progressBar.querySelector('.next-level').textContent = `Próximo nível: ${this.getExpToNextLevel()}`;
        }
    }

    saveProgress() {
        localStorage.setItem('playerProgress', JSON.stringify(this.playerData));
    }
} 