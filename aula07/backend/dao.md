
# 📁 Camada DAO em Node.js com Express

## O que é a camada DAO?

A **camada DAO (Data Access Object)** é responsável por **acessar e manipular os dados no banco de dados**. Ela encapsula toda a lógica de persistência, isolando o restante da aplicação de detalhes como SQL, ORM, drivers, conexões etc.

---

## Objetivos principais

- **Separação de responsabilidades**: a lógica de acesso a dados não fica misturada com lógica de negócio ou manipulação de requisições HTTP.
- **Facilidade de manutenção**: alterações no banco de dados ou na forma de acesso exigem mudanças apenas na camada DAO.
- **Melhor testabilidade**: facilita a criação de testes para serviços e controladores, simulando o DAO com mocks.
- **Organização**: contribui para uma arquitetura limpa e compreensível.

---

## Vantagens

- Troca fácil de banco de dados ou biblioteca de acesso (SQL, ORM, etc.)
- Redução de repetição de código ao centralizar queries comuns
- Evita vazamento de detalhes técnicos para outras camadas
- Melhora a legibilidade do projeto

---

## Estrutura típica em projetos Node + Express

Um projeto bem estruturado geralmente segue uma arquitetura em camadas como:

- **controllers/**: lida com `req` e `res`
- **services/**: contém as regras de negócio
- **daos/**: executa queries no banco de dados
- **db/**: configura conexão com o banco

---

## Boas práticas

- Cada DAO deve conter apenas funções de acesso direto ao banco.
- Nunca inclua lógica de negócio ou manipulação de `req`/`res` dentro do DAO.
- Utilize uma única instância de conexão com o banco (pool).
- Retorne objetos simples (sem métodos ou lógica embutida).
- Implemente transações quando necessário, preferencialmente fora do DAO (num serviço de transações, por exemplo).
- Nomeie funções de forma clara e descritiva, como `findById`, `create`, `updateEmail`, etc.

---

## Resumo

A camada DAO tem um papel fundamental na organização de aplicações Node.js com Express. Ela permite isolar a lógica de persistência, promovendo um código mais limpo, modular, fácil de testar e manter.
