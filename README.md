# 🎵 YouTube Looper

Aplicação web para reproduzir vídeos do YouTube com controles avançados de loop e navegação.

## ✨ Funcionalidades

- **Reprodução de vídeos do YouTube**: Cole qualquer URL do YouTube e reproduza
- **Controles de Loop**: Defina pontos A e B para fazer loop em qualquer parte do vídeo
- **Navegação precisa**: 
  - Recomeçar o vídeo
  - Avançar 5 ou 10 segundos
  - Retroceder 5 ou 10 segundos
- **Interface moderna e responsiva**: Funciona em desktop e mobile
- **Execução independente**: Não precisa de servidor, funciona localmente

## 🚀 Deploy no Vercel (Recomendado)

### Deploy via GitHub

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/youtube-looper.git
   git push -u origin main
   ```

2. **Conecte ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Importe o repositório `youtube-looper`
   - O Vercel detectará automaticamente as configurações
   - Clique em "Deploy"

3. **Pronto!** Sua aplicação estará online em alguns segundos

### Deploy via CLI do Vercel

```bash
# Instale o Vercel CLI
npm i -g vercel

# Na pasta do projeto
cd youtube-looper
vercel

# Siga as instruções no terminal
```

## 💻 Como Usar Localmente

### Opção 1: Abrir diretamente no navegador

1. Abra o arquivo `index.html` no seu navegador
2. Cole a URL do vídeo do YouTube no campo
3. Clique em "Carregar Vídeo"
4. Use os controles para definir pontos A e B
5. Clique em "Iniciar Loop" para ativar o loop

### Opção 2: Servidor local

**Com Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Com Node.js (http-server):**
```bash
npx http-server -p 8000
```

Depois acesse: `http://localhost:8000`

## 📖 Instruções de Uso

1. **Carregar um vídeo**: 
   - Cole a URL completa do YouTube (ex: `https://www.youtube.com/watch?v=VIDEO_ID`)
   - Clique em "Carregar Vídeo"

2. **Definir pontos de loop**:
   - Reproduza o vídeo até o ponto onde quer começar o loop
   - Clique em "Definir Ponto A"
   - Continue até o ponto onde quer terminar o loop
   - Clique em "Definir Ponto B"
   - Clique em "Iniciar Loop"

3. **Controles de navegação**:
   - **Recomeçar**: Volta para o início do vídeo
   - **-10s / -5s**: Retrocede 10 ou 5 segundos
   - **+5s / +10s**: Avança 5 ou 10 segundos

4. **Limpar pontos**: Clique em "Limpar Pontos" para resetar os pontos A e B

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com gradientes e animações)
- JavaScript (Vanilla)
- YouTube IFrame API

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Navegadores mobile

## ⚠️ Notas Importantes

- Esta aplicação usa a API oficial do YouTube IFrame
- Alguns vídeos podem ter restrições de incorporação
- O loop funciona apenas durante a reprodução
- Certifique-se de ter conexão com a internet para carregar os vídeos

## 🔒 Privacidade

- Toda a aplicação roda localmente no seu navegador
- Nenhum dado é enviado para servidores externos (exceto o YouTube para carregar os vídeos)
- Não há rastreamento ou coleta de dados

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente.

