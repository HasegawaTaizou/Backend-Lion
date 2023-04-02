"use strict";

const alunos = require("./alunos.js");

const getAluno = function (matricula) {
  let alunoFiltrado = alunos.alunos.filter((aluno) => {
    return aluno.matricula == matricula;
  });

  return alunoFiltrado;
};

const getDisciplinasAluno = function (matricula) {
  let disciplinas = [];

  alunos.alunos.forEach((aluno) => {
    if (aluno.matricula == matricula) {
      aluno.curso.forEach((dadosCurso) => {
        disciplinas.push(dadosCurso.disciplinas);
      });
    }
  });

  return disciplinas[0];
};

module.exports = {
  getAluno,
  getDisciplinasAluno,
};
