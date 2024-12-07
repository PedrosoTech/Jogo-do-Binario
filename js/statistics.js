class StatisticsSystem {
    constructor() {
        this.stats = this.loadStats();
        this.setupStatsPanel();
        this.startSessionTimer();
    }

    loadStats() {
        return JSON.parse(localStorage.getItem('gameStats')) || {
            totalGames: 0,
            correctGuesses: 0,
            wrongGuesses: 0,
            hintsUsed: 0,
            bestStreak: 0,
            currentStreak: 0,
            averageTime: 0,
            bestTime: Infinity,
            totalPlayTime: 0,
            sessionTime: 0,
            wordHistory: [],
            dailyStats: {},
            difficultyStats: {
                facil: { played: 0, won: 0 },
                medio: { played: 0, won: 0 },
                dificil: { played: 0, won: 0 }
            }
        };
    }

    setupStatsPanel() {
        const panel = document.createElement('div');
        panel.className = 'stats-panel';
        panel.innerHTML = `
            <div class="stats-header">
                <h3>Estatísticas</h3>
                <button class="toggle-stats">📊</button>
            </div>
            <div class="stats-content">
                <div class="stats-summary">
                    <div class="stat-item">
                        <span class="stat-value">${this.stats.totalGames}</span>
                        <span class="stat-label">Jogos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.getWinRate()}%</span>
                        <span class="stat-label">Taxa de Acerto</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.stats.bestStreak}</span>
                        <span class="stat-label">Melhor Sequência</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${this.formatTime(this.stats.bestTime)}</span>
                        <span class="stat-label">Melhor Tempo</span>
                    </div>
                </div>
                <div class="stats-details">
                    <div class="stats-chart">
                        ${this.generateDifficultyChart()}
                    </div>
                    <div class="stats-history">
                        <h4>Últimas Palavras</h4>
                        ${this.generateWordHistory()}
                    </div>
                    <div class="daily-progress">
                        <h4>Progresso Diário</h4>
                        ${this.generateDailyProgress()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Toggle panel visibility
        panel.querySelector('.toggle-stats').addEventListener('click', () => {
            panel.classList.toggle('expanded');
        });
    }

    updateStats(gameResult) {
        this.stats.totalGames++;
        
        if (gameResult.correct) {
            this.stats.correctGuesses++;
            this.stats.currentStreak++;
            this.stats.bestStreak = Math.max(this.stats.bestStreak, this.stats.currentStreak);
        } else {
            this.stats.wrongGuesses++;
            this.stats.currentStreak = 0;
        }

        if (gameResult.time < this.stats.bestTime) {
            this.stats.bestTime = gameResult.time;
        }

        this.stats.averageTime = (this.stats.averageTime * (this.stats.totalGames - 1) + gameResult.time) / this.stats.totalGames;
        this.stats.hintsUsed += gameResult.hintsUsed;

        // Atualiza estatísticas por dificuldade
        const difficulty = gameResult.difficulty;
        this.stats.difficultyStats[difficulty].played++;
        if (gameResult.correct) {
            this.stats.difficultyStats[difficulty].won++;
        }

        // Adiciona palavra ao histórico
        this.stats.wordHistory.unshift({
            word: gameResult.word,
            correct: gameResult.correct,
            time: gameResult.time,
            difficulty: gameResult.difficulty,
            date: new Date().toISOString()
        });

        // Mantém apenas as últimas 50 palavras
        if (this.stats.wordHistory.length > 50) {
            this.stats.wordHistory.pop();
        }

        // Atualiza estatísticas diárias
        const today = new Date().toISOString().split('T')[0];
        if (!this.stats.dailyStats[today]) {
            this.stats.dailyStats[today] = {
                played: 0,
                won: 0,
                hintsUsed: 0
            };
        }
        this.stats.dailyStats[today].played++;
        if (gameResult.correct) {
            this.stats.dailyStats[today].won++;
        }
        this.stats.dailyStats[today].hintsUsed += gameResult.hintsUsed;

        this.saveStats();
        this.updateStatsDisplay();
    }

    generateDifficultyChart() {
        const difficulties = Object.keys(this.stats.difficultyStats);
        const chartData = difficulties.map(diff => {
            const stats = this.stats.difficultyStats[diff];
            const winRate = stats.played > 0 ? (stats.won / stats.played * 100).toFixed(1) : 0;
            return `
                <div class="chart-bar">
                    <div class="bar-fill" style="height: ${winRate}%"></div>
                    <span class="bar-label">${diff}</span>
                    <span class="bar-value">${winRate}%</span>
                </div>
            `;
        }).join('');

        return `<div class="difficulty-chart">${chartData}</div>`;
    }

    generateWordHistory() {
        return this.stats.wordHistory
            .slice(0, 10)
            .map(entry => `
                <div class="history-item ${entry.correct ? 'correct' : 'wrong'}">
                    <span class="word">${entry.word}</span>
                    <span class="time">${this.formatTime(entry.time)}</span>
                    <span class="difficulty">${entry.difficulty}</span>
                </div>
            `).join('') || '<p>Nenhuma palavra ainda...</p>';
    }

    generateDailyProgress() {
        const last7Days = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();

        return `
            <div class="daily-chart">
                ${last7Days.map(date => {
                    const dayStats = this.stats.dailyStats[date] || {played: 0, won: 0};
                    const winRate = dayStats.played > 0 ? (dayStats.won / dayStats.played * 100).toFixed(1) : 0;
                    return `
                        <div class="day-bar">
                            <div class="bar-fill" style="height: ${winRate}%"></div>
                            <span class="bar-label">${this.formatDate(date)}</span>
                            <span class="bar-value">${winRate}%</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    formatTime(seconds) {
        if (!isFinite(seconds)) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', {weekday: 'short'});
    }

    getWinRate() {
        if (this.stats.totalGames === 0) return 0;
        return ((this.stats.correctGuesses / this.stats.totalGames) * 100).toFixed(1);
    }

    startSessionTimer() {
        setInterval(() => {
            this.stats.sessionTime++;
            this.stats.totalPlayTime++;
            this.saveStats();
            this.updateSessionTime();
        }, 1000);
    }

    updateSessionTime() {
        const sessionTimeElement = document.querySelector('.session-time');
        if (sessionTimeElement) {
            sessionTimeElement.textContent = this.formatTime(this.stats.sessionTime);
        }
    }

    saveStats() {
        localStorage.setItem('gameStats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        // Atualiza todos os elementos de estatísticas na interface
        const panel = document.querySelector('.stats-panel');
        if (panel) {
            panel.querySelector('.stats-content').innerHTML = `
                <div class="stats-summary">
                    <!-- ... atualiza o sumário ... -->
                </div>
                <div class="stats-details">
                    ${this.generateDifficultyChart()}
                    <div class="stats-history">
                        <h4>Últimas Palavras</h4>
                        ${this.generateWordHistory()}
                    </div>
                    <div class="daily-progress">
                        <h4>Progresso Diário</h4>
                        ${this.generateDailyProgress()}
                    </div>
                </div>
            `;
        }
    }
} 