class WordAPI {
    static async getRandomWord(difficulty) {
        try {
            const lengthRange = {
                facil: '3,5',
                medio: '6,8',
                dificil: '9,15'
            };

            const response = await fetch(`https://api.dicionario-aberto.net/random?length=${lengthRange[difficulty]}`);
            const data = await response.json();

            if (!data || !data.word) {
                return this.getBackupWord(difficulty);
            }

            const word = data.word.toLowerCase();
            const hints = await HintGenerator.generateHints(word);

            return {
                word: word,
                hints: hints
            };
        } catch (error) {
            console.error('Erro ao buscar palavra:', error);
            return this.getBackupWord(difficulty);
        }
    }

    static async getWordHints(word) {
        try {
            const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const hints = data[0].meanings.map(meaning => meaning.text).slice(0, 3);
                return hints.length > 0 ? hints : this.getDefaultHints(word);
            }

            return this.getDefaultHints(word);
        } catch (error) {
            console.error('Erro ao buscar dicas:', error);
            return this.getDefaultHints(word);
        }
    }

    static getDefaultHints(word) {
        return [
            'Uma palavra em português',
            `Palavra com ${word.length} letras`,
            'Tente adivinhar letra por letra'
        ];
    }

    static getBackupWord(difficulty) {
        return GameUtils.getRandomWord(difficulty);
    }
} 