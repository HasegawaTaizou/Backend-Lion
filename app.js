const express = require("express");
const cors = require("cors");

const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");

  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  app.use(cors());

  next();
});

app.get(
  "/v1/lion-school/cursos",
  cors(),
  async function (request, response, next) {
    const cursos = require("./modulo/get-lista-cursos.js");

    let listaCursosJSON = {}

    let listaCursos = cursos.getListaCursos();
    if (listaCursos) {
      listaCursosJSON.cursos = listaCursos
      response.json(listaCursosJSON);
      response.status(200);
    } else {
      response.status(500);
    }
  }
);

app.get(
  "/v1/lion-school/alunos/:matricula",
  cors(),
  async function (request, response, next) {
    const alunos = require("./modulo/get-aluno.js");

    let numeroMatricula = request.params.matricula;
    let statusCode;
    let dadosAluno = {};
    let aluno;

    if (numeroMatricula == undefined) {
      statusCode = 400;
      dadosAluno.message =
        "Não é possível processar a requisição, pois a sigla do estado não foi informada, ou não antende a quantidade de caracteres (2 dígitos)";
    } else {
      aluno = alunos.getAluno(numeroMatricula);
      if (aluno) {
        dadosAluno.disciplinas = aluno;
        statusCode = 200;
      } else {
        statusCode = 404;
      }
    }
    response.status(statusCode);
    response.json(dadosAluno);
  }
);

app.listen(8080, function () {
  console.log("Servidor aguardando requisições na porta 8080");
});
