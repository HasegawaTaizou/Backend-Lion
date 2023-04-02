"use strict";

const alunosMatriculados = require("./get-lista-alunos-matriculados-curso.js");

const getListaAlunosStatusAno = function (
  siglaCurso,
  statusAlunos,
  anoConclusao
) {
  let alunos = alunosMatriculados.getListaAlunosMatriculadosCurso(siglaCurso);
  let alunosFiltrados = [];
  alunos.forEach((aluno) => {
    aluno.curso.forEach((dadosCurso) => {
      if (
        aluno.status == statusAlunos &&
        dadosCurso.conclusao == anoConclusao
      ) {
        alunosFiltrados.push(aluno);
      }
    });
  });
  return alunosFiltrados;
};

// console.log(getListaAlunosStatusAno("RDS", "Finalizado", "2022"));

module.exports = {
  getListaAlunosStatusAno,
};
