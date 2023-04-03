"use strict";

const alunos = require("./alunos.js");

const getListaAlunosStatus = function (siglaCurso, statusEspecifico) {
  let alunosFiltrados = [];
  alunos.alunos.forEach((aluno) => {
    aluno.curso.forEach((dadosCurso) => {
      if (aluno.status == statusEspecifico && dadosCurso.sigla == siglaCurso) {
        alunosFiltrados.push(aluno);
      }
    });
  });
  console.log(alunosFiltrados);
  return alunosFiltrados;
};

getListaAlunosStatus("DS", "Finalizado");

module.exports = {
  getListaAlunosStatus,
};
