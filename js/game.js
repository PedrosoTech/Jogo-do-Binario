class BinaryWordGame {
    constructor() {
        this.initializeElements();
        this.setupGame();
    }

    initializeElements() {
        // Elementos do DOM
        this.binaryWordElement = document.getElementById('binaryWord');
        this.wordInput = document.getElementById('wordInput');
        this.checkButton = document.getElementById('checkButton');
        this.hintButton = document.getElementById('hintButton');
        this.hintElement = document.getElementById('hint');
        this.pointsElement = document.getElementById('points');
        this.recordElement = document.getElementById('record');
        this.timeElement = document.getElementById('time');
        this.difficultySelect = document.getElementById('difficulty');
    }

    setupGame() {
        // Estado inicial do jogo
        this.currentWord = '';
        this.points = 0;
        this.record = parseInt(localStorage.getItem('record')) || 0;
        this.timeLeft = this.getDifficultyTime();
        this.timer = null;
        this.gameActive = true;

        // Event Listeners
        this.checkButton.addEventListener('click', () => this.checkWord());
        this.hintButton.addEventListener('click', () => this.showHint());
        this.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkWord();
        });
        this.difficultySelect.addEventListener('change', () => this.resetGame());

        // Iniciar jogo
        this.updateDisplay();
        this.generateNewWord();
        this.startTimer();
    }

    getDifficultyTime() {
        const times = {
            'facil': 30,
            'medio': 20,
            'dificil': 10
        };
        return times[this.difficultySelect.value];
    }

    wordToBinary(word) {
        return word.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }

    generateNewWord() {
        const difficulty = this.difficultySelect.value;
        const wordData = GameUtils.getRandomWord(difficulty);
        this.currentWord = wordData.word.toUpperCase();
        this.currentHint = wordData.hint;
        this.binaryWordElement.textContent = this.wordToBinary(this.currentWord);
        this.hintElement.textContent = ''; // Limpa a dica anterior
    }

    checkWord() {
        if (!this.gameActive) return;

        const input = this.wordInput.value.toUpperCase();
        if (input === this.currentWord) {
            this.points += 100;
            if (this.points > this.record) {
                this.record = this.points;
                localStorage.setItem('record', this.record);
            }
            alert('Correto! +100 pontos');
        } else {
            alert('Incorreto! Tente novamente');
        }

        this.wordInput.value = '';
        this.updateDisplay();
        this.generateNewWord();
        this.resetTimer();
    }

    showHint() {
        if (!this.gameActive) return;
        
        this.hintElement.textContent = this.currentHint;
        this.points = Math.max(0, this.points - 20);
        this.updateDisplay();
    }

    updateDisplay() {
        this.pointsElement.textContent = this.points;
        this.recordElement.textContent = this.record;
        this.timeElement.textContent = this.timeLeft + 's';
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.gameActive = true;
        this.timer = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateDisplay();
            } else {
                this.handleTimeUp();
            }
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.timeLeft = this.getDifficultyTime();
        this.updateDisplay();
        this.startTimer();
    }

    handleTimeUp() {
        this.gameActive = false;
        clearInterval(this.timer);
        alert('Tempo esgotado!');
        this.generateNewWord();
        this.resetTimer();
    }

    resetGame() {
        this.gameActive = true;
        this.points = 0;
        this.timeLeft = this.getDifficultyTime();
        clearInterval(this.timer);
        this.updateDisplay();
        this.generateNewWord();
        this.startTimer();
    }
}

// Inicializa o jogo quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    new BinaryWordGame();
}); 