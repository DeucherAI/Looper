# 🚀 Guia de Deploy - YouTube Looper

## Deploy no Vercel via GitHub

### Passo 1: Preparar o Repositório

1. Certifique-se de que todos os arquivos estão na pasta `youtube-looper`:
   ```
   youtube-looper/
   ├── index.html
   ├── app.js
   ├── styles.css
   ├── manifest.json
   ├── package.json
   ├── vercel.json
   └── README.md
   ```

2. Inicialize o Git (se ainda não fez):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: YouTube Looper"
   ```

### Passo 2: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nome: `youtube-looper` (ou qualquer nome que preferir)
4. Deixe como **público** ou **privado** (funciona nos dois)
5. **NÃO** marque "Initialize with README" (já temos um)
6. Clique em "Create repository"

### Passo 3: Conectar ao GitHub

```bash
git remote add origin https://github.com/SEU_USUARIO/youtube-looper.git
git branch -M main
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### Passo 4: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **"Add New Project"** ou **"Import Project"**
4. Selecione o repositório `youtube-looper`
5. O Vercel detectará automaticamente:
   - Framework Preset: **Other**
   - Root Directory: `./` (ou deixe em branco)
6. Clique em **"Deploy"**

### Passo 5: Aguardar Deploy

- O Vercel fará o build automaticamente
- Em alguns segundos, sua aplicação estará online!
- Você receberá uma URL como: `https://youtube-looper.vercel.app`

## ✅ Verificação Pós-Deploy

1. Acesse a URL fornecida pelo Vercel
2. Teste carregando um vídeo do YouTube
3. Verifique se os controles funcionam corretamente

## 🔧 Configurações do Vercel

O arquivo `vercel.json` já está configurado com:
- Headers de segurança
- Rotas corretas para arquivos estáticos
- Configuração para SPA (Single Page Application)

## 📝 Atualizações Futuras

Para atualizar a aplicação:

```bash
git add .
git commit -m "Descrição da atualização"
git push
```

O Vercel fará o deploy automático!

## 🐛 Solução de Problemas

### Erro 153 do YouTube

Se ainda aparecer o erro 153:
- Alguns vídeos têm restrições de incorporação do YouTube
- Tente com outro vídeo
- O erro agora é tratado e mostra uma mensagem clara

### Build falha no Vercel

- Verifique se todos os arquivos estão no repositório
- Certifique-se de que o `package.json` está correto
- Verifique os logs de build no Vercel

### Vídeo não carrega

- Verifique se a URL do YouTube está correta
- Alguns vídeos não permitem incorporação
- Tente com outro vídeo

## 🌐 Domínio Personalizado (Opcional)

1. No dashboard do Vercel, vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado
3. Configure o DNS conforme as instruções do Vercel

## 📱 PWA (Progressive Web App)

A aplicação já está configurada como PWA:
- Pode ser instalada no celular
- Funciona offline (parcialmente)
- Tem ícone e tema personalizados

Para instalar:
- No Chrome/Edge: Menu > "Instalar aplicativo"
- No mobile: Compartilhar > "Adicionar à tela inicial"

