# 🚀 Início Rápido - YouTube Looper

## Como começar (3 passos)

1. **Abra o arquivo `index.html` no seu navegador**
   - Pode ser Chrome, Firefox, Edge, Safari, etc.
   - Ou use um servidor local (veja abaixo)

2. **Cole uma URL do YouTube**
   - Exemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Clique em "Carregar Vídeo"

3. **Use os controles!**
   - Defina ponto A e B para fazer loop
   - Use os botões para navegar no vídeo

## ⚡ Usando como servidor local (opcional)

Alguns navegadores podem ter restrições. Para garantir que tudo funcione:

### Python (mais fácil)
```bash
# Navegue até a pasta youtube-looper
cd youtube-looper

# Execute (Python 3)
python -m http.server 8000

# Ou (Python 2)
python -m SimpleHTTPServer 8000
```

Depois acesse: **http://localhost:8000**

### Node.js
```bash
# Na pasta youtube-looper
npx http-server -p 8000
```

## 📱 Usar como App (PWA)

1. Abra a aplicação no navegador (Chrome/Edge recomendado)
2. No menu do navegador, procure "Instalar aplicativo" ou "Add to Home Screen"
3. A aplicação será instalada e poderá ser aberta como um app

## 🎯 Exemplo de uso

1. Carregue um vídeo de música
2. Vá até o início do refrão (ex: 1:30)
3. Clique em "Definir Ponto A"
4. Vá até o fim do refrão (ex: 2:15)
5. Clique em "Definir Ponto B"
6. Clique em "Iniciar Loop"
7. O vídeo vai repetir apenas essa parte! 🎵

## ❓ Problemas?

- **Vídeo não carrega?** Verifique se a URL está correta
- **Loop não funciona?** Certifique-se de que o ponto A é menor que o ponto B
- **Erros no console?** Alguns vídeos têm restrições de incorporação do YouTube

## 💡 Dica

Você pode usar atalhos do teclado:
- **Enter** no campo de URL para carregar o vídeo rapidamente

