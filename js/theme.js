class ThemeManager {
    constructor() {
        this.themes = {
            claro: {
                background: '#ffffff',
                text: '#000000',
                primary: '#4CAF50',
                secondary: '#FF9800',
                accent: '#2196F3',
                cardBg: '#f5f5f5',
                shadow: 'rgba(0,0,0,0.1)'
            },
            escuro: {
                background: '#1a1a1a',
                text: '#ffffff',
                primary: '#66bb6a',
                secondary: '#ffa726',
                accent: '#42a5f5',
                cardBg: '#2d2d2d',
                shadow: 'rgba(255,255,255,0.1)'
            },
            neon: {
                background: '#0a0a0a',
                text: '#fff',
                primary: '#0ff',
                secondary: '#f0f',
                accent: '#ff0',
                cardBg: '#1a1a1a',
                shadow: '0 0 10px #0ff'
            },
            natureza: {
                background: '#e8f5e9',
                text: '#1b5e20',
                primary: '#4caf50',
                secondary: '#ff9800',
                accent: '#2196f3',
                cardBg: '#ffffff',
                shadow: 'rgba(76,175,80,0.2)'
            },
            oceano: {
                background: '#e3f2fd',
                text: '#0d47a1',
                primary: '#1976d2',
                secondary: '#00acc1',
                accent: '#0097a7',
                cardBg: '#ffffff',
                shadow: 'rgba(25,118,210,0.2)'
            }
        };

        this.fonts = {
            padrao: "'Arial', sans-serif",
            moderno: "'Roboto', sans-serif",
            elegante: "'Georgia', serif",
            divertido: "'Comic Sans MS', cursive",
            codigo: "'Courier New', monospace"
        };

        this.initializeTheme();
        this.setupCustomization();
    }

    setupCustomization() {
        const customPanel = document.createElement('div');
        customPanel.className = 'custom-panel';
        customPanel.innerHTML = `
            <div class="custom-header">
                <span>Personalização</span>
                <button class="toggle-panel">☰</button>
            </div>
            <div class="custom-content">
                <div class="custom-section">
                    <label>Tema</label>
                    <select id="themeSelect">
                        <option value="claro">Claro</option>
                        <option value="escuro">Escuro</option>
                        <option value="neon">Neon</option>
                        <option value="natureza">Natureza</option>
                        <option value="oceano">Oceano</option>
                    </select>
                </div>
                <div class="custom-section">
                    <label>Fonte</label>
                    <select id="fontSelect">
                        <option value="padrao">Padrão</option>
                        <option value="moderno">Moderno</option>
                        <option value="elegante">Elegante</option>
                        <option value="divertido">Divertido</option>
                        <option value="codigo">Código</option>
                    </select>
                </div>
                <div class="custom-section">
                    <label>Tamanho da Fonte</label>
                    <input type="range" id="fontSize" min="12" max="24" value="16">
                </div>
                <div class="custom-section">
                    <label>Animações</label>
                    <input type="checkbox" id="animations" checked>
                </div>
            </div>
        `;

        document.body.appendChild(customPanel);

        // Event Listeners
        document.querySelector('.toggle-panel').addEventListener('click', () => {
            customPanel.classList.toggle('collapsed');
        });

        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.applyTheme(e.target.value);
        });

        document.getElementById('fontSelect').addEventListener('change', (e) => {
            this.applyFont(e.target.value);
        });

        document.getElementById('fontSize').addEventListener('input', (e) => {
            this.applyFontSize(e.target.value);
        });

        document.getElementById('animations').addEventListener('change', (e) => {
            this.toggleAnimations(e.target.checked);
        });
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'claro';
        const savedFont = localStorage.getItem('font') || 'padrao';
        const savedFontSize = localStorage.getItem('fontSize') || '16';
        const savedAnimations = localStorage.getItem('animations') !== 'false';

        this.applyTheme(savedTheme);
        this.applyFont(savedFont);
        this.applyFontSize(savedFontSize);
        this.toggleAnimations(savedAnimations);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;

        Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(`--${property}`, value);
        });

        localStorage.setItem('theme', themeName);
        document.getElementById('themeSelect').value = themeName;
    }

    applyFont(fontName) {
        const font = this.fonts[fontName];
        document.documentElement.style.setProperty('--font-family', font);
        localStorage.setItem('font', fontName);
    }

    applyFontSize(size) {
        document.documentElement.style.setProperty('--font-size-base', `${size}px`);
        localStorage.setItem('fontSize', size);
    }

    toggleAnimations(enabled) {
        document.documentElement.style.setProperty('--animation-duration', 
            enabled ? '0.3s' : '0s');
        localStorage.setItem('animations', enabled);
    }
} 