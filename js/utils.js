class GameUtils {
    static stringToBinary(str) {
        return str.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }

    static playSound(type) {
        const audio = new Audio(`assets/sounds/${type}.mp3`);
        audio.play().catch(error => console.log('Erro ao tocar som:', error));
    }

    static formatTime(seconds) {
        return seconds < 10 ? `0${seconds}` : seconds;
    }

    static getRandomWord(difficulty) {
        const words = WORDS[difficulty];
        return words[Math.floor(Math.random() * words.length)];
    }

    static saveHighScore(score) {
        const currentHigh = localStorage.getItem('highScore') || 0;
        if (score > currentHigh) {
            localStorage.setItem('highScore', score);
            return true;
        }
        return false;
    }
} 