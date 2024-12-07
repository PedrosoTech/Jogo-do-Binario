const DIFFICULTY_SETTINGS = {
    facil: {
        time: 45,
        points: 10
    },
    medio: {
        time: 30,
        points: 20
    },
    dificil: {
        time: 20,
        points: 30
    }
};

const WORDS = {
    facil: [
        {
            word: 'sol',
            hints: [
                'Estrela central do nosso sistema solar',
                'Fonte natural de luz e calor',
                'Nasce no leste e se põe no oeste'
            ]
        },
        {
            word: 'lua',
            hints: [
                'Satélite natural da Terra',
                'Brilha no céu noturno',
                'Controla as marés dos oceanos'
            ]
        },
        {
            word: 'mar',
            hints: [
                'Grande massa de água salgada',
                'Local onde vivem os peixes',
                'Tem ondas e praias'
            ]
        },
        {
            word: 'pão',
            hints: [
                'Alimento básico feito de farinha',
                'Comum no café da manhã',
                'Produto de padaria'
            ]
        },
        {
            word: 'céu',
            hints: [
                'Geralmente é azul durante o dia',
                'Onde voam os pássaros',
                'Local onde vemos as nuvens'
            ]
        },
        {
            word: 'casa',
            hints: [
                'Lugar onde as pessoas moram',
                'Tem teto, paredes e portas',
                'Oferece abrigo e proteção'
            ]
        },
        {
            word: 'bola',
            hints: [
                'Objeto esférico usado em jogos',
                'Essencial no futebol',
                'Pode quicar e rolar'
            ]
        },
        {
            word: 'gato',
            hints: [
                'Animal que caça ratos',
                'Felino doméstico',
                'Faz "miau" e ronrona'
            ]
        },
        {
            word: 'rato',
            hints: [
                'Pequeno roedor',
                'Gosta de queijo',
                'Inimigo natural do gato'
            ]
        },
        {
            word: 'mesa',
            hints: [
                'Móvel com tampo horizontal',
                'Usada para refeições',
                'Geralmente tem quatro pernas'
            ]
        },
        {
            word: 'faca',
            hints: [
                'Utensílio cortante',
                'Usado com garfo',
                'Ferramenta de cozinha'
            ]
        },
        {
            word: 'bolo',
            hints: [
                'Sobremesa assada',
                'Comum em aniversários',
                'Pode ter cobertura e recheio'
            ]
        },
        {
            word: 'pera',
            hints: [
                'Fruta suculenta',
                'Tem formato característico',
                'Pode ser verde ou amarela'
            ]
        },
        {
            word: 'uvas',
            hints: [
                'Fruta em cacho',
                'Usada para fazer vinho',
                'Pode ser verde ou roxa'
            ]
        },
        {
            word: 'meia',
            hints: [
                'Vestimenta para os pés',
                'Usada dentro do sapato',
                'Mantém os pés aquecidos'
            ]
        }
    ],
    medio: [
        {
            word: 'computador',
            hints: [
                'Máquina que processa informações',
                'Possui teclado e monitor',
                'Usado para acessar a internet',
                'Ferramenta essencial no trabalho moderno'
            ]
        },
        {
            word: 'chocolate',
            hints: [
                'Doce feito de cacau',
                'Pode ser ao leite ou amargo',
                'Derrete com o calor',
                'Popular presente romântico'
            ]
        },
        {
            word: 'telefone',
            hints: [
                'Aparelho de comunicação',
                'Pode ser fixo ou móvel',
                'Usado para fazer chamadas',
                'Dispositivo com números'
            ]
        },
        {
            word: 'borboleta',
            hints: [
                'Inseto com asas coloridas',
                'Passa por metamorfose',
                'Começa como lagarta',
                'Poliniza flores'
            ]
        },
        {
            word: 'girassol',
            hints: [
                'Flor que acompanha o sol',
                'Produz sementes comestíveis',
                'Tem pétalas amarelas',
                'Pode crescer muito alta'
            ]
        },
        {
            word: 'elefante',
            hints: [
                'Maior mamífero terrestre',
                'Tem uma tromba longa',
                'Conhecido por boa memória',
                'Nativo da África e Ásia'
            ]
        },
        {
            word: 'bicicleta',
            hints: [
                'Veículo de duas rodas',
                'Movido a pedal',
                'Transporte ecológico',
                'Bom para exercício'
            ]
        },
        {
            word: 'internet',
            hints: [
                'Rede mundial de computadores',
                'Permite comunicação global',
                'Fonte de informação digital',
                'Conecta pessoas remotamente'
            ]
        },
        {
            word: 'hospital',
            hints: [
                'Local de tratamento médico',
                'Tem médicos e enfermeiros',
                'Atende emergências',
                'Edificação de saúde'
            ]
        },
        {
            word: 'foguete',
            hints: [
                'Veículo espacial',
                'Usa propulsão',
                'Viaja para o espaço',
                'Muito veloz'
            ]
        },
        {
            word: 'guitarra',
            hints: [
                'Instrumento musical',
                'Tem seis cordas',
                'Popular no rock',
                'Pode ser elétrica ou acústica'
            ]
        }
    ],
    dificil: [
        {
            word: 'algoritmo',
            hints: [
                'Sequência de passos lógicos',
                'Usado em programação',
                'Resolve problemas específicos',
                'Base da computação',
                'Conjunto de instruções ordenadas'
            ]
        },
        {
            word: 'filosofia',
            hints: [
                'Estudo do conhecimento',
                'Busca sabedoria',
                'Questiona a realidade',
                'Origem na Grécia antiga',
                'Explora questões existenciais'
            ]
        },
        {
            word: 'fotossintese',
            hints: [
                'Processo das plantas',
                'Usa luz solar',
                'Produz oxigênio',
                'Transforma energia',
                'Essencial para vida na Terra'
            ]
        },
        {
            word: 'democracia',
            hints: [
                'Sistema de governo',
                'Poder do povo',
                'Envolve votação',
                'Participação popular',
                'Base de muitos países'
            ]
        },
        {
            word: 'tecnologia',
            hints: [
                'Aplicação do conhecimento',
                'Evolui constantemente',
                'Muda a sociedade',
                'Inclui dispositivos e métodos',
                'Facilita a vida moderna'
            ]
        },
        {
            word: 'psicologia',
            hints: [
                'Estudo da mente',
                'Analisa comportamento',
                'Trata saúde mental',
                'Ciência humana',
                'Trabalha com terapia'
            ]
        },
        {
            word: 'astronomia',
            hints: [
                'Estudo do cosmos',
                'Observa corpos celestes',
                'Ciência do universo',
                'Usa telescópios',
                'Explora o espaço'
            ]
        },
        {
            word: 'biodiversidade',
            hints: [
                'Variedade de vida',
                'Riqueza de espécies',
                'Equilíbrio natural',
                'Importante para ecologia',
                'Inclui flora e fauna'
            ]
        }
    ]
};

const ACHIEVEMENTS = {
    iniciante: {
        id: 'iniciante',
        nome: 'Primeiro Passo',
        descricao: 'Acerte sua primeira palavra',
        icon: '🌟'
    },
    velocista: {
        id: 'velocista',
        nome: 'Velocista',
        descricao: 'Acerte uma palavra em menos de 5 segundos',
        icon: '⚡'
    },
    expert: {
        id: 'expert',
        nome: 'Expert em Binário',
        descricao: 'Acerte 5 palavras seguidas',
        icon: '🏆'
    },
    mestre: {
        id: 'mestre',
        nome: 'Mestre das Palavras',
        descricao: 'Alcance 1000 pontos',
        icon: '👑'
    }
}; 