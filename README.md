# Event-card 

Projeto pessoal, que permite usuários se cadastrem para obter acesso a um crachá fictício de eventos. Com ele, é possível resgatar códigos para exibir o acompanhamento do usuário no evento.

## Tecnologias Principais

O projeto foi desenvolvido com as seguintes tecnologias:  

- Next.js 
- Prisma ORM
- PostgreSQL
- React
- Tailwind

## Banco de Dados  

O projeto utiliza **Prisma ORM** para gerenciar a persistência de dados. A ferramenta interage com o serviço do banco PostgreSQL hospedado na plataforma [Neon](https://neon.tech/).

![Image](https://github.com/user-attachments/assets/f2d9ebf0-acb1-40cb-876a-4733ade3abdc)

## Funcionalidades

- Login e cadastros de usuário com autenticação JWT
- Resgate de códigos através de campo de texto presente no cartão virtual
- Preenchimento automático por leitura de QR Codes a partir da câmera do dispositivo

## Imagens

![Image](https://github.com/user-attachments/assets/5cb262f1-7958-4479-9b08-031fda1a690c)

![Image](https://github.com/user-attachments/assets/bdce763d-b85d-48cf-b4a3-145852825be3)

## Códigos Resgatáveis

- Código 1: [XJH498](https://github.com/user-attachments/assets/09ddd61a-4343-476f-a095-7a957426fc0b)
- Código 2: [BRK753](https://github.com/user-attachments/assets/bbfdcb54-7613-4519-9592-5b3741b0dd4b)
- Código 3: [TFL962](https://github.com/user-attachments/assets/81f08942-43a9-41dd-b947-643120e43f51)
- Código 4: [PQR184](https://github.com/user-attachments/assets/556dc5ad-4316-4e39-9ab1-bd27cdec2762)
- Código 5: [LMB376](https://github.com/user-attachments/assets/a890b309-b34b-4de2-aa84-06faf675982f)

## Como Rodar o Projeto 

###  Clone o repositório
```sh
git clone https://github.com/lucaslpdacosta/event-card.git
```

###  Crie um arquivo .env na raiz do projeto. Substitua "******" por valores reais:
```sh
DATABASE_URL=******
JWT_SECRET=******
```

###  Instale as dependências:
```sh
npm install
```

###  Inicie o servidor com o script:
```sh
npm run dev
```

###  Acesse a URL:
```sh
http://localhost:3000/
```

## Caso queira conferir a versão com deploy feito na Vercel:

- Escaneie o QR Code:

![Image](https://github.com/user-attachments/assets/84a32f4c-e6c4-4ac6-9e6f-08fa54d55718)

- Ou acesse este [Link](https://event-card-ten.vercel.app).
