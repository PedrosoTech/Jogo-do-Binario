class GameUtils {
    static getRandomWord(difficulty) {
        const words = {
            facil: [
                { word: 'SOL', hint: 'Brilha durante o dia' },
                { word: 'LUA', hint: 'Brilha durante a noite' },
                { word: 'CÉU', hint: 'Está acima de nós' },
                { word: 'MAR', hint: 'Grande massa de água salgada' },
                { word: 'PÃO', hint: 'Alimento básico de padaria' }
            ],
            medio: [
                { word: 'TERRA', hint: 'Planeta em que vivemos' },
                { word: 'PAPEL', hint: 'Usado para escrever' },
                { word: 'LIVRO', hint: 'Contém histórias escritas' },
                { word: 'CARRO', hint: 'Meio de transporte comum' },
                { word: 'PORTA', hint: 'Serve para entrar e sair' }
            ],
            dificil: [
                { word: 'COMPUTADOR', hint: 'Máquina que processa dados' },
                { word: 'BRASILEIRO', hint: 'Nascido no maior país da América do Sul' },
                { word: 'CHOCOLATE', hint: 'Doce feito de cacau' },
                { word: 'BIBLIOTECA', hint: 'Local com muitos livros' },
                { word: 'PROFESSOR', hint: 'Profissional do ensino' }
            ]
        };

        const wordList = words[difficulty];
        return wordList[Math.floor(Math.random() * wordList.length)];
    }

    static stringToBinary(str) {
        return str.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }

    static formatTime(seconds) {
        return `${seconds}s`;
    }

    static showMessage(message, isSuccess = true) {
        alert(message); // Podemos melhorar isso depois com uma UI mais bonita
    }
} 