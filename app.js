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
  "/v1/lion-school/alunos/:matricula",
  cors(),
  async function (request, response, next) {
    const alunos = require("./modulo/get-aluno.js");

    let numeroMatricula = request.params.matricula;
    let statusCode;
    let dadosAluno = {};
    let aluno;

    if (
      numeroMatricula == undefined ||
      numeroMatricula == "" ||
      isNaN(numeroMatricula)
    ) {
      statusCode = 400;
      dadosAluno.message =
        "Numero da matrícula vazio ou não é um número. Preencha o número da matrícula da forma correta";
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

app.get(
  "/v1/lion-school/alunos",
  cors(),
  async function (request, response, next) {
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
      if (siglaCurso == undefined || siglaCurso == "" || !isNaN(siglaCurso)) {
        statusCode = 400;
        dadosAluno.message =
          "Sigla do curso inválida ou vazia. Preencha corretamente";
        console.log("entrou validacao");
      } else {
        if (anoConclusao != undefined && statusAluno == undefined) {
          if (
            anoConclusao == undefined ||
            anoConclusao == "" ||
            isNaN(anoConclusao)
          ) {
            statusCode = 400;
            dadosAluno.message =
              "Ano de conclusão inválido ou vazio. Preencha corretamente";
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
          if (
            statusAluno == undefined ||
            statusAluno == "" ||
            !isNaN(statusAluno)
          ) {
            statusCode = 400;
            dadosAluno.message =
              "Status inválido ou vazio. Preencha corretamente";
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
          if (
            anoConclusao == undefined ||
            anoConclusao == "" ||
            isNaN(anoConclusao) ||
            statusAluno == undefined ||
            statusAluno == "" ||
            !isNaN(statusAluno)
          ) {
            statusCode = 400;
            dadosAluno.message =
              "Status e/ou ano de conclusão inválido ou vazio. Preencha corretamente";
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
        }
        if (anoConclusao == undefined && statusAluno == undefined) {
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

      // response.status(statusCode);
      // response.json(dadosAluno);
    } else {
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
  }
);

app.get(
  "/v1/lion-school/alunos-disciplinas/:matricula",
  cors(),
  async function (request, response, next) {
    const alunos = require("./modulo/get-aluno.js");

    let numeroMatricula = request.params.matricula;
    let statusCode;
    let dadosAluno = {};
    let aluno;

    console.log(numeroMatricula);
    if (
      numeroMatricula == undefined ||
      numeroMatricula == "" ||
      isNaN(numeroMatricula)
    ) {
      statusCode = 400;
      dadosAluno.message =
        "Numero da matrícula vazio ou não é um número. Preencha o número da matrícula da forma correta";
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
