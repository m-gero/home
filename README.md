# DEVGERO - Sistema de Estudos Colaborativo

Um portal moderno e completo para compartilhamento de materiais acadêmicos, criado especialmente para turmas universitárias.

## 🚀 Funcionalidades

### Para Estudantes (Acesso Público)
- **Biblioteca de Vídeos**: Acesso a vídeos explicativos organizados por disciplina
- **Acervo Digital**: Download de livros e PDFs acadêmicos
- **Materiais Complementares**: Resumos, listas de exercícios e slides
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Busca Inteligente**: Encontre rapidamente o conteúdo desejado
- **Categorização**: Conteúdo organizado por matérias (Matemática, Programação, Física, etc.)

### Para Administradores
- **Painel Administrativo**: Interface completa para gerenciamento
- **Upload de Arquivos**: Suporte para vídeos (MP4, AVI, MOV) e documentos (PDF)
- **Gestão de Conteúdo**: Adicionar, editar e remover materiais
- **Estatísticas**: Acompanhe visualizações e downloads
- **Acesso Seguro**: Área administrativa protegida e oculta

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** com estrutura semântica
- **CSS3** com design moderno e responsivo
- **JavaScript ES6+** para interatividade
- **Lucide Icons** para ícones modernos
- **Google Fonts** (Inter & Poppins)

### Backend
- **Vercel Functions** (Serverless)
- **Node.js** para APIs
- **Formidable** para upload de arquivos

### Hospedagem
- **Frontend**: GitHub Pages (gratuito)
- **Backend**: Vercel Functions (gratuito)
- **Arquivos**: Simulação de cloud storage

## 📁 Estrutura do Projeto

```
DEVGERO/
├── index.html              # Página principal
├── admin.html              # Painel administrativo
├── styles.css              # Estilos principais
├── admin-styles.css        # Estilos do admin
├── script.js               # JavaScript principal
├── admin-script.js         # JavaScript do admin
├── package.json            # Dependências
├── vercel.json             # Configuração Vercel
├── api/                    # Funções serverless
│   ├── auth.js            # Autenticação
│   ├── upload.js          # Upload de arquivos
│   ├── download.js        # Download de arquivos
│   └── content.js         # Gestão de conteúdo
└── README.md              # Documentação
```

## 🚀 Como Usar

### Acesso Público
1. Acesse o site principal
2. Navegue pelas categorias de conteúdo
3. Assista vídeos ou baixe materiais
4. Use a busca para encontrar conteúdo específico

### Acesso Administrativo
1. **Método 1**: Acesse `site.com/?admin=devgero2024`
2. **Método 2**: Pressione `Ctrl + Shift + A` e digite a senha
3. **Método 3**: Acesse diretamente `/admin.html`
4. **Senha**: `devgero2024`

### Upload de Conteúdo
1. Faça login no painel administrativo
2. Escolha a seção (Vídeos, Livros ou Materiais)
3. Clique em "Adicionar" e preencha o formulário
4. Faça upload do arquivo ou adicione URL do YouTube
5. Publique o conteúdo

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: #6366f1 (Azul moderno)
- **Secundária**: #10b981 (Verde)
- **Destaque**: #f59e0b (Amarelo)

### Tipografia
- **Títulos**: Poppins (600-700)
- **Corpo**: Inter (400-500)

### Componentes
- Cards com hover effects
- Modais responsivos
- Navegação adaptativa
- Animações suaves

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔒 Segurança

### Autenticação
- Senha simples para demonstração
- Token de sessão armazenado localmente
- Área administrativa oculta

### Upload de Arquivos
- Validação de tipos de arquivo
- Limite de tamanho (100MB)
- Sanitização de nomes

## 🚀 Deploy

### GitHub Pages (Frontend)
1. Faça push do código para GitHub
2. Ative GitHub Pages nas configurações
3. Site estará disponível em `usuario.github.io/repo`

### Vercel (Backend)
1. Conecte o repositório ao Vercel
2. Deploy automático das funções API
3. URLs das APIs: `projeto.vercel.app/api/`

## 📊 Estatísticas de Exemplo

- **45+ Vídeos** explicativos
- **28 Livros** digitais
- **67 Materiais** complementares
- **120+ Estudantes** ativos

## 🎯 Categorias Disponíveis

### Matemática
- Cálculo I, II, III
- Álgebra Linear
- Estatística
- Geometria Analítica

### Programação
- Python
- JavaScript
- Algoritmos
- Estruturas de Dados

### Física
- Mecânica
- Eletromagnetismo
- Termodinâmica
- Física Moderna

### Engenharia
- Circuitos Elétricos
- Sistemas Digitais
- Controle
- Projetos

## 🔧 Personalização

### Alterar Nome/Logo
1. Edite as variáveis CSS em `styles.css`
2. Modifique o texto do logo em `index.html`
3. Atualize o título da página

### Adicionar Categorias
1. Adicione nova categoria em `script.js`
2. Crie o CSS correspondente
3. Atualize os filtros

### Modificar Cores
1. Edite as variáveis CSS em `:root`
2. Mantenha consistência visual
3. Teste em diferentes dispositivos

## 📞 Suporte

Para dúvidas ou sugestões:
- **Email**: gero@estudos.com
- **WhatsApp**: Grupo da turma
- **GitHub**: Issues no repositório

## 📄 Licença

Este projeto é de uso educacional e foi criado especificamente para a turma. 

---

**Criado com ❤️ por GERO para a turma**

*Sistema de Estudos Colaborativo DEVGERO - 2024*
