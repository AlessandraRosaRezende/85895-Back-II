# 📘 API REST – Guia Didático com Boas Práticas

---

## 1. O que é uma API REST?

**API** = Interface de Programação de Aplicações. É como um garçom que leva seu pedido (requisição) ao servidor e traz a resposta de volta.

**REST** = Representational State Transfer. Estilo arquitetural para APIs web criado por Roy Fielding em 2000.

Uma **API REST** utiliza HTTP para permitir que aplicações conversem de forma simples, padronizada, stateless e escalável.

---

## 2. Métodos HTTP vs CRUD

| Método HTTP | Operação CRUD  | Uso                                         |
|-------------|----------------|---------------------------------------------|
| `GET`       | Read           | Retorna dados de um recurso                 |
| `POST`      | Create         | Cria um novo recurso, servidor gera o URI   |
| `PUT`       | Update         | Substitui ou cria recurso com URI conhecido |
| `PATCH`     | Partial Update | Altera apenas parte do recurso              |
| `DELETE`    | Delete         | Remove recurso                              |

Uso apropriado contribui para clareza e uniformidade.

---

## 3. Convenções de URIs

- Use **substantivos no plural**: `/users`, `/orders`.
- Evite **verbs na rota**:  deixem o verbo ao método HTTP.
- Use **Kebab-case**, sem extensões no URI:  
  `GET /device-management/managed-devices`.
- Use URIs aninhadas para subrecursos apenas quando realmente fizer sentido.

---

## 4. Boas práticas de design

- **Aceitar e retornar JSON** com `Content-Type: application/json`.
- **Filtros, paginação e ordenação** via query strings (`?limit=10&sort=createdAt:desc`).
- **Tratamento de erros**: 
  - Use códigos HTTP adequados (400, 404, 500…).
  - Retorne mensagens claras no corpo JSON.
  - Evite status 200 para erro.
- **Consistência**: mantenha padrões claros para todos os endpoints (ex: POST sempre retorna 201).
- **Documentação**: utilize Swagger/OpenAPI para documentação interativa.

---

## 5. Checklist de boas práticas

✅ **Design de recursos**  
- [ ] Substantivos no plural (`/users`).  
- [ ] Nomes consistentes e leitura fácil (`/device-management`).  
- [ ] URIs estáveis e sem extensões.

✅ **HTTP e payload**  
- [ ] Verbo HTTP correto.  
- [ ] `Content-Type: application/json`.  
- [ ] Suporta filtros, ordenação e paginação.

✅ **Respostas e HTTP status**  
- [ ] 200/201 para sucesso, 204 para delete sem corpo.  
- [ ] 4xx para erros do cliente, 5xx para erros do servidor.  
- [ ] Mensagens de erro claras no JSON.

✅ **Segurança e performance**  
- [ ] HTTPS obrigatório.  
- [ ] Autenticação via OAuth/JWT/API Keys.  
- [ ] Limite de taxa (rate limiting).  
- [ ] Caching e compressão quando possível.  
- [ ] Validação de entrada para evitar injeções.

✅ **Manutenção e escalabilidade**  
- [ ] Versionamento na rota (`/v1/users`).  
- [ ] Monitoramento e logs.  
- [ ] Estrutura de código organizada (controllers, serviços, modelos).  
- [ ] Testes (unitários, integração).  
- [ ] Documentação atualizada com exemplos.

---

## 6. Exemplo rápido em Node.js + Express

```js
const express = require('express');
const app = express();
app.use(express.json());

// GET /users
app.get('/users', (req, res) => {
  const users = []; // busque do banco
  res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const updated = updateUser(req.params.id, req.body);
  res.json(updated);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  deleteUser(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
```

# ✅ Conclusão | APIs REST – Arquitetura e Boas Práticas

APIs REST se destacam por sua simplicidade, escalabilidade e ampla adoção. Veja o que você deve lembrar:

---

## 1. Consistência e Conformidade com Padrões
- Use **métodos HTTP nativos** (GET, POST, PUT, DELETE) conforme o propósito de cada ação.  
- Siga **convenções de URL**: substantivos no plural, sem verbos, com estrutura intuitiva.  
- Aderir ao protocolo HTTP e formatos como JSON/SSL/TLS reforça a qualidade e interoperabilidade da API.

---

## 2. Performance e Escalabilidade
- A natureza **stateless** e o suporte a **cache HTTP** permitem alta escalabilidade horizontal e menor latência.  
- Endpoint limpo, sem excesso de dados, e uso adequado de cache reduzem carga no servidor.

---

## 3. Escalabilidade & Manutenção
- APIs bem desenhadas suportam crescimento gradual com **versionamento**, logs e monitoramento em camadas. 
- **Separação cliente-servidor** melhora modularidade e facilita manutenção independente.

---

## 4. Flexibilidade e Portabilidade
- Uso de HTTP + JSON garante **compatibilidade entre linguagens e plataformas** (web, mobile, microservices).  
- Suporte a diferentes formatos aumenta a flexibilidade na integração com outros sistemas.

---

## 5. Facilidade de Uso e Adoção
- Interface uniforme e intuitiva reduz a curva de aprendizado para novos desenvolvedores.
- Um design claro, documentação (OpenAPI/Swagger) e padrões bem definidos aumentam a confiabilidade e adotabilidade.

---

## 🔚 Resumo Final

APIs REST bem projetadas são:

- **Simples e padronizadas** — usam HTTP corretamente e convenções claras  
- **Escaláveis e eficientes** — sem estado, com cache e horizontalizáveis  
- **Portáteis** — interoperáveis entre plataformas e linguagens  
- **Fáceis de entender** — URLs intuitivas e documentação robusta

Adotando essas práticas, você garante APIs sólidas, de fácil manutenção e amplamente compatíveis — uma base essencial para sistemas modernos e colaborativos 🌐.
