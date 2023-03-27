"use strict";

const alunos = require("./alunos.js");



const getListaAlunosStatus = function (statusEspecifico) {
  let alunosFiltrados = alunos.alunos.filter(aluno => {
    return aluno.status == statusEspecifico
  })
  return alunosFiltrados
};

console.log(getListaAlunosStatus("Finalizado"));

