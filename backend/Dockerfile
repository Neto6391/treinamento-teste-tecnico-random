# ---- Estágio 1: Build ----
# Usamos uma imagem completa do Node para ter todas as ferramentas de build
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência para aproveitar o cache do Docker
COPY package*.json ./

# Instala TODAS as dependências (incluindo as de desenvolvimento)
RUN npm ci

# Copia o resto do código-fonte
COPY . .

# Roda o script de build para gerar a pasta 'dist'
RUN npm run build


# ---- Estágio 2: Produção ----
# Começamos de uma imagem limpa e leve do Node
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

# Copia os arquivos de dependência novamente
COPY package*.json ./

# Instala APENAS as dependências de produção, economizando espaço
RUN npm ci --omit=dev

# Copia APENAS o código compilado do estágio de 'build'
COPY --from=builder /app/dist ./dist

# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação diretamente com o Node (mais eficiente)
CMD ["node", "dist/main.js"]