class HintGenerator {
    static async generateHints(word) {
        // Primeiro tenta pegar dicas específicas
        let hints = this.getSpecificHints(word.toLowerCase());
        
        // Se não encontrar dicas específicas, gera dicas inteligentes
        if (!hints) {
            hints = this.generateSmartHints(word.toLowerCase());
        }

        return this.shuffleAndLimit(hints, 3); // Mostra 3 dicas aleatórias
    }

    static generateSmartHints(word) {
        const hints = [];
        
        // Análise da palavra
        const firstLetter = word[0];
        const lastLetter = word[word.length - 1];
        const vowels = this.countVowels(word);
        const syllables = this.countSyllables(word);

        // Gera dicas baseadas na estrutura da palavra
        hints.push(
            `Esta palavra tem ${syllables} sílaba${syllables > 1 ? 's' : ''}`,
            `A primeira letra vem antes do "${String.fromCharCode(firstLetter.charCodeAt(0) + 2)}" no alfabeto`,
            `A última letra vem depois do "${String.fromCharCode(lastLetter.charCodeAt(0) - 2)}" no alfabeto`,
            `Tem ${vowels} vogal${vowels > 1 ? 'is' : ''}`,
            `É uma palavra do tipo ${this.getWordType(word)}`,
            this.getRhymeHint(word),
            this.getSimilarWordsHint(word),
            this.getContextHint(word)
        );

        return hints.filter(hint => hint !== null);
    }

    static getWordType(word) {
        // Identificação inteligente do tipo de palavra
        if (word.endsWith('ar') || word.endsWith('er') || word.endsWith('ir')) return 'verbo';
        if (word.endsWith('mente')) return 'advérbio';
        if (word.endsWith('ção')) return 'substantivo abstrato';
        if (word.endsWith('dade')) return 'qualidade';
        return 'substantivo comum';
    }

    static getRhymeHint(word) {
        // Banco de rimas comuns
        const rhymes = {
            'ão': ['são', 'pão', 'chão', 'mão'],
            'ar': ['lugar', 'mar', 'estar', 'falar'],
            'ada': ['nada', 'fada', 'estrada', 'parada'],
            'ente': ['gente', 'dente', 'presente', 'mente'],
            // ... mais padrões de rima
        };

        for (const [ending, words] of Object.entries(rhymes)) {
            if (word.endsWith(ending)) {
                const rhymeWords = words.filter(w => w !== word);
                if (rhymeWords.length > 0) {
                    return `Rima com: ${rhymeWords[0]}`;
                }
            }
        }
        return null;
    }

    static getSimilarWordsHint(word) {
        // Banco de palavras relacionadas
        const relations = {
            'comida': ['alimento', 'refeição', 'prato'],
            'animal': ['bicho', 'ser vivo', 'criatura'],
            'objeto': ['coisa', 'item', 'peça'],
            'lugar': ['local', 'espaço', 'ambiente'],
            // ... mais relações
        };

        for (const [category, words] of Object.entries(relations)) {
            if (words.includes(word)) {
                return `É um tipo de ${category}`;
            }
        }
        return null;
    }

    static getContextHint(word) {
        // Banco de contextos
        const contexts = {
            'casa': 'Encontrado em todas as cidades',
            'água': 'Essencial para a vida',
            'papel': 'Usado para escrever',
            'roupa': 'Usado para se vestir',
            // ... mais contextos
        };

        return contexts[word] || null;
    }

    static countVowels(word) {
        return (word.match(/[aeiouáàâãéèêíïóôõöúü]/gi) || []).length;
    }

    static countSyllables(word) {
        // Algoritmo simplificado para contar sílabas em português
        const vowels = 'aeiouáàâãéèêíïóôõöúüy';
        let count = 0;
        let isLastVowel = false;

        for (let i = 0; i < word.length; i++) {
            const isVowel = vowels.includes(word[i].toLowerCase());
            if (isVowel && !isLastVowel) count++;
            isLastVowel = isVowel;
        }

        return count;
    }

    static shuffleAndLimit(array, limit) {
        return [...array]
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
    }
} 