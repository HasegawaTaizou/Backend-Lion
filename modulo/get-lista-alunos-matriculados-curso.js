"use strict";

const alunos = require("./alunos.js");

const getListaAlunosMatriculadosCurso = function (cursoEspecifico) {
  let alunosLista = [];
  alunos.alunos.forEach((aluno) => {
    aluno.curso.forEach((item) => {
      if (item.sigla == cursoEspecifico && item != []) {
        alunosLista.push(aluno);
      }
    });
  });
  return alunosLista;
};

// console.log(getListaAlunosMatriculadosCurso("RDS"));

module.exports = {
  getListaAlunosMatriculadosCurso,
};
