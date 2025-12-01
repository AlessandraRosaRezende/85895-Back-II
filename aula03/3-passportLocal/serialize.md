# 🛂 Passport.js – Serialização e Desserialização

## O que é isso?

No **Passport.js**, serializar e desserializar o usuário é essencial para manter a autenticação ativa durante as requisições do usuário no site (sessões).

---

## 📦 Serializar

### O que significa?

**Serializar** é transformar o **objeto do usuário** em um formato mais simples (geralmente o `ID`) e **armazená-lo na sessão**.

### Por quê?

- Para deixar a sessão **leve** e **segura**.
- Evita salvar dados sensíveis diretamente na sessão.

### Exemplo:

```js
passport.serializeUser((user, done) => {
  done(null, user.id); // salva apenas o ID na sessão
});
```

---

## 📥 Desserializar

### O que significa?

**Desserializar** é pegar o **ID salvo na sessão** e usá-lo para **buscar o usuário completo** no banco de dados.

### Por quê?

- Para que o Passport tenha acesso às informações completas do usuário durante as requisições futuras.

### Exemplo:

```js
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user); // retorna o objeto do usuário
  });
});
```

---

## 🧠 Por que é necessário?

- ✅ **Segurança**: evita armazenar dados sensíveis diretamente na sessão.
- ✅ **Eficiência**: armazena somente o necessário (ID).
- ✅ **Persistência**: mantém o login ativo durante toda a navegação.

---

## 🧩 Analogia

Imagine que você entra num guarda-volumes de um shopping:

- **Serializar**: você guarda seus pertences e recebe apenas uma **ficha com um número**.
- **Desserializar**: ao voltar, você entrega a **ficha** e o atendente busca seus **pertences completos**.

---

## ✅ Resumo

| Processo        | O que faz                                  | Por quê?                         |
|----------------|---------------------------------------------|----------------------------------|
| Serializar      | Salva o ID do usuário na sessão             | Leveza e segurança               |
| Desserializar   | Recupera o usuário completo usando o ID     | Acesso às infos completas        |

---

Se quiser, posso salvar isso em um arquivo `.md` para você baixar.
