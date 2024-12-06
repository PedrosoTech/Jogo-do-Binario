class BinaryWordGame {
    constructor() {
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.currentWord = '';
        this.timeLeft = 0;
        this.timer = null;
        this.difficulty = 'facil';
        this.isGameOver = false;

        this.initializeElements();
        this.setupEventListeners();
        this.resetGame();
    }

    initializeElements() {
        this.elements = {
            binaryWord: document.getElementById('binaryWord'),
            userGuess: document.getElementById('userGuess'),
            message: document.getElementById('message'),
            score: document.getElementById('score'),
            highScore: document.getElementById('highScore'),
            timer: document.getElementById('timer'),
            difficulty: document.getElementById('difficulty')
        };
    }

    setupEventListeners() {
        this.elements.userGuess.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkGuess();
        });

        this.elements.difficulty.addEventListener('change', () => {
            this.difficulty = this.elements.difficulty.value;
            this.resetGame();
        });
    }

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = DIFFICULTY_SETTINGS[this.difficulty].time;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.handleTimeOut();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        this.elements.timer.textContent = GameUtils.formatTime(this.timeLeft);
        
        if (this.timeLeft <= 5) {
            this.elements.timer.classList.add('warning');
        } else {
            this.elements.timer.classList.remove('warning');
        }
    }

    generateNewWord() {
        this.currentWord = GameUtils.getRandomWord(this.difficulty);
        this.elements.binaryWord.textContent = GameUtils.stringToBinary(this.currentWord);
        this.elements.userGuess.value = '';
        this.elements.message.textContent = '';
        this.elements.message.className = 'message';
    }

    checkGuess() {
        if (this.isGameOver) return;

        const guess = this.elements.userGuess.value.toLowerCase().trim();
        
        if (guess === this.currentWord) {
            this.handleCorrectGuess();
        } else {
            this.handleIncorrectGuess();
        }
    }

    handleCorrectGuess() {
        const points = DIFFICULTY_SETTINGS[this.difficulty].points * this.timeLeft;
        this.score += points;
        this.elements.score.textContent = this.score;
        
        this.showMessage('Parabéns! Você acertou!', 'correct');
        GameUtils.playSound('correct');

        setTimeout(() => {
            this.generateNewWord();
            this.startTimer();
        }, 1500);
    }

    handleIncorrectGuess() {
        this.showMessage(`Você errou! A palavra correta era: ${this.currentWord}`, 'incorrect');
        GameUtils.playSound('wrong');

        setTimeout(() => {
            this.generateNewWord();
            this.startTimer();
        }, 1500);
    }

    showMessage(text, className) {
        this.elements.message.textContent = text;
        this.elements.message.className = `message ${className}`;
    }

    handleTimeOut() {
        clearInterval(this.timer);
        this.showMessage(`Tempo esgotado! A palavra era: ${this.currentWord}`, 'incorrect');
        GameUtils.playSound('wrong');

        setTimeout(() => {
            this.generateNewWord();
            this.startTimer();
        }, 1500);
    }

    gameOver() {
        this.isGameOver = true;
        clearInterval(this.timer);
        
        const isNewHighScore = GameUtils.saveHighScore(this.score);
        const gameOverMessage = isNewHighScore 
            ? `Fim de jogo! Novo recorde: ${this.score}!` 
            : `Fim de jogo! Pontuação: ${this.score}`;
        
        this.showMessage(gameOverMessage, 'game-over');
        
        setTimeout(() => this.resetGame(), 3000);
    }

    resetGame() {
        this.isGameOver = false;
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        
        this.elements.score.textContent = '0';
        this.elements.highScore.textContent = this.highScore;
        
        this.generateNewWord();
        this.startTimer();
    }
} 