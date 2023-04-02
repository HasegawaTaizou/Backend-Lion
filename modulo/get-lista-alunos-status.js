"use strict";

const alunos = require("./alunos.js");

const getListaAlunosStatus = function (siglaCurso, statusEspecifico) {
  let alunosFiltrados = [];
  alunos.alunos.forEach((aluno) => {
    if (aluno.status == statusEspecifico) {
      alunosFiltrados.push(aluno);

      aluno.curso.forEach((dadosCurso) => {
        if (dadosCurso.sigla == siglaCurso) {
        }
      });
    }
  });
  // console.log(alunosFiltrados);
  return alunosFiltrados;
};

getListaAlunosStatus("DS", "Cursando");

module.exports = {
  getListaAlunosStatus,
};
