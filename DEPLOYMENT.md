# 🚀 Guia de Deploy - DEVGERO

Este guia te ajudará a hospedar o sistema DEVGERO gratuitamente usando GitHub Pages + Vercel.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta no Vercel (pode usar login do GitHub)
- Git instalado no computador

## 🔧 Passo 1: Preparar o Repositório GitHub

### 1.1 Criar Repositório
```bash
# No diretório do projeto
git init
git add .
git commit -m "Initial commit: DEVGERO Sistema de Estudos"
```

### 1.2 Conectar ao GitHub
1. Vá para [github.com](https://github.com) e crie um novo repositório
2. Nome sugerido: `devgero-estudos`
3. Deixe público para usar GitHub Pages gratuito
4. NÃO inicialize com README (já temos um)

```bash
# Conectar ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/devgero-estudos.git
git branch -M main
git push -u origin main
```

## 🌐 Passo 2: Ativar GitHub Pages

### 2.1 Configurar Pages
1. No seu repositório GitHub, vá em **Settings**
2. Role até **Pages** no menu lateral
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha **main** branch e **/ (root)**
5. Clique **Save**

### 2.2 Aguardar Deploy
- GitHub Pages levará alguns minutos para fazer o deploy
- Seu site estará disponível em: `https://SEU_USUARIO.github.io/devgero-estudos`

## ⚡ Passo 3: Deploy do Backend (Vercel)

### 3.1 Conectar Vercel ao GitHub
1. Vá para [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique **New Project**
4. Selecione o repositório `devgero-estudos`
5. Clique **Import**

### 3.2 Configurar Deploy
- **Framework Preset**: Other
- **Root Directory**: `./` (deixe padrão)
- **Build Command**: deixe vazio
- **Output Directory**: deixe vazio
- Clique **Deploy**

### 3.3 Obter URL da API
Após o deploy, você receberá uma URL como:
`https://devgero-estudos.vercel.app`

## 🔗 Passo 4: Conectar Frontend ao Backend

### 4.1 Atualizar Configuração
Edite o arquivo `deploy-config.js`:

```javascript
// Substitua com suas URLs reais
GITHUB_PAGES_URL: 'https://SEU_USUARIO.github.io/devgero-estudos',
VERCEL_API_URL: 'https://devgero-estudos.vercel.app',
```

### 4.2 Fazer Commit das Mudanças
```bash
git add deploy-config.js
git commit -m "Update deployment URLs"
git push origin main
```

## 🧪 Passo 5: Testar o Sistema

### 5.1 Testar Frontend
1. Acesse: `https://SEU_USUARIO.github.io/devgero-estudos`
2. Verifique se o site carrega corretamente
3. Teste navegação e responsividade

### 5.2 Testar Admin
1. Pressione `Ctrl + Shift + A`
2. Digite a senha: `devgero2024`
3. Ou acesse: `https://SEU_USUARIO.github.io/devgero-estudos/admin.html`

### 5.3 Testar APIs
1. No painel admin, tente fazer upload de um arquivo
2. Teste downloads de materiais
3. Verifique se as APIs Vercel respondem

## 🔧 Passo 6: Configurações Avançadas

### 6.1 Domínio Personalizado (Opcional)
Se você tem um domínio próprio:
1. No GitHub Pages settings, adicione seu domínio
2. Configure DNS CNAME para apontar para `SEU_USUARIO.github.io`

### 6.2 HTTPS
- GitHub Pages e Vercel já incluem HTTPS automático
- Certifique-se de usar URLs `https://` nas configurações

## 🚨 Solução de Problemas

### Problema: Site não carrega
**Solução:**
- Verifique se GitHub Pages está ativo
- Aguarde até 10 minutos para propagação
- Verifique se todos os arquivos foram commitados

### Problema: APIs não funcionam
**Solução:**
- Verifique se Vercel fez deploy com sucesso
- Confirme URLs no `deploy-config.js`
- Verifique console do navegador para erros

### Problema: Admin não funciona
**Solução:**
- Verifique se `admin.html` está no repositório
- Teste senha: `devgero2024`
- Limpe cache do navegador

## 📊 Monitoramento

### GitHub Pages
- Status: Settings → Pages
- Builds: Actions tab

### Vercel
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Logs: Clique no projeto → View Function Logs

## 🔄 Atualizações Futuras

Para atualizar o site:
```bash
# Fazer mudanças nos arquivos
git add .
git commit -m "Descrição da mudança"
git push origin main
```

- GitHub Pages atualizará automaticamente
- Vercel fará redeploy das APIs automaticamente

## 📞 Suporte

Se encontrar problemas:
1. Verifique este guia novamente
2. Consulte logs do GitHub Actions
3. Verifique logs do Vercel
4. Teste em modo incógnito (cache)

---

**🎉 Parabéns! Seu sistema DEVGERO está no ar!**

URLs finais:
- **Site**: `https://SEU_USUARIO.github.io/devgero-estudos`
- **Admin**: `https://SEU_USUARIO.github.io/devgero-estudos/admin.html`
- **API**: `https://devgero-estudos.vercel.app/api/`
