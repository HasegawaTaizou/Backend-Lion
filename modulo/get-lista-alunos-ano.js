"use strict";

const alunos = require("./alunos.js");

const getListaAlunosAno = function (siglaCurso, anoConclusao) {
  let alunosFiltrados = [];
  alunos.alunos.forEach((aluno) => {
    aluno.curso.forEach((dadosCurso) => {
      if (
        dadosCurso.sigla == siglaCurso &&
        dadosCurso.conclusao == anoConclusao
      ) {
        alunosFiltrados.push(aluno);
      }
    });
  });
  return alunosFiltrados;
};

// console.log(getListaAlunosAno("RDS", "2022"));

module.exports = {
  getListaAlunosAno,
};
