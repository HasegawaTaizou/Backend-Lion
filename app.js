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

    let listaCursosJSON = {};

    let listaCursos = cursos.getListaCursos();
    if (listaCursos) {
      listaCursosJSON.cursos = listaCursos;
      response.json(listaCursosJSON);
      response.status(200);
    } else {
      response.status(500);
    }
  }
);

app.get(
  "/v1/lion-school/alunos",
  cors(),
  async function (request, response, next) {
    const alunos = require("./modulo/get-lista-alunos.js");

    let listaAlunosJSON = {};

    let listaAlunos = alunos.getListaAlunos();
    if (listaAlunos) {
      listaAlunosJSON.alunos = listaAlunos;
      response.json(listaAlunosJSON);
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
        dadosAluno.aluno = aluno;
        statusCode = 200;
      } else {
        statusCode = 404;
      }
    }
    response.status(statusCode);
    response.json(dadosAluno);
  }
);

app.get("/v1/senai/alunos", cors(), async function (request, response, next) {
  let alunosMatriculados = require("./modulo/get-lista-alunos-matriculados-curso.js");
  let alunosAno = require("./modulo/get-lista-alunos-ano.js");
  let alunosStatus = require("./modulo/get-lista-alunos-status.js");
  let alunosStatusAno = require("./modulo/get-lista-alunos-status-ano.js");

  let siglaCurso = request.query.curso;
  let statusAluno = request.query.status;
  let anoConclusao = request.query.ano;

  let dadosAluno = {};
  let statusCode;

  if (siglaCurso != undefined) {
    if (siglaCurso == "" || siglaCurso == undefined || !isNaN(siglaCurso)) {
      statusCode = 400;
      dadosAluno.message =
        "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida.";
    } else {
      if (anoConclusao != undefined && statusAluno == undefined) {
        console.log("apenas ano");
        if (
          anoConclusao == "" ||
          anoConclusao == undefined ||
          isNaN(anoConclusao)
        ) {
          statusCode = 400;
          dadosAluno.message =
            "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida.";
        } else {
          let alunos = alunosAno.getListaAlunosAno(siglaCurso, anoConclusao);
          if (alunos) {
            statusCode = 200;
            dadosAluno.alunos = alunos;
          } else {
            statusCode = 404;
          }
        }
        response.status(statusCode);
        response.json(dadosAluno);
      }
      if (anoConclusao == undefined && statusAluno != undefined) {
        console.log("apenas status");
        if (statusAluno == "") {
          statusCode = 400;
          dadosAluno.message = "Mensagem de erro do apenas status";
        } else {
          let alunos = alunosStatus.getListaAlunosStatus(
            siglaCurso,
            statusAluno
          );
          if (alunos) {
            statusCode = 200;
            dadosAluno.alunos = alunos;
          } else {
            statusCode = 404;
          }
        }

        response.status(statusCode);
        response.json(dadosAluno);
      }
      if (anoConclusao != undefined && statusAluno != undefined) {
        console.log("todos");
        if (anoConclusao == "" || statusAluno == "") {
          statusCode = 400;
          dadosAluno.message =
            "Não é possível processar a requisição, pois a sigla do curso não foi informada ou não é válida.";
        } else {
          let alunos = alunosStatusAno.getListaAlunosStatusAno(
            siglaCurso,
            statusAluno,
            anoConclusao
          );
          if (alunos) {
            statusCode = 200;
            dadosAluno.alunos = alunos;
          } else {
            statusCode = 404;
          }
        }

        response.status(statusCode);
        response.json(dadosAluno);
      } else {
        let alunos =
          alunosMatriculados.getListaAlunosMatriculadosCurso(siglaCurso);
        if (alunos) {
          statusCode = 200;
          dadosAluno.alunos = alunos;
        } else {
          statusCode = 404;
        }

        response.status(statusCode);
        response.json(dadosAluno);
      }
    }
  }
});

app.get(
  "/v1/lion-school/alunos-disciplinas/:matricula",
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
      aluno = alunos.getDisciplinasAluno(numeroMatricula);
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
