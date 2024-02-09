# monetometro

Esse projeto usa o Vue3 e o Quasar Framework.

## Pré-requisitos

Certifique-se de ter o Node.js e o Quasar CLI instalados em sua máquina.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- Quasar CLI: [https://quasar.dev/start/quasar-cli](https://quasar.dev/start/quasar-cli)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/monetometro/frontend.git

2. Navegue até o diretório do projeto:
   ```bash
   cd VueProject
   
### Instale as dependências
```bash
yarn install
```
###### ou
```bash
npm install
```

#### Inicie a aplicação em mode de desenvolvimento
```bash
quasar dev
```

### Gere os arquivos para a produção
##### Crie uma cópia do arquivo ".env.dev", renomeie para ".env.prod", altere o conteúdo com os valores para o ambiente de produção e execute o código abaixo:
```bash
quasar build
```
