"use strict";

const alunos = require("./alunos.js");

const getAluno = function (matricula) {
  let alunoFiltrado = alunos.alunos.filter((aluno) => {
    return aluno.matricula == matricula;
  });

  return alunoFiltrado;
};

console.log(getAluno(20151001001));