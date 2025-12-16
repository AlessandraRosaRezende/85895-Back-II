const Router = require("./router");

class UsersRouter extends Router {
  init() {
    // inicialização das rotas - equivalente a router.get
    this.get("/", (req, res) => {
      res.sendSuccess("Olá Coders!");
    });

    this.post("/", (req, res) => {
      res.sendoUserError("Error! Algo deu errado.");
    });

    this.delete("/", (req, res) => {
      res.sendServerError("Erro interno do servidor.");
    });
  }
};

module.exports = UsersRouter
