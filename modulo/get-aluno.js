"use strict";

const alunos = require("./alunos.js");

// const getAluno = function (matricula) {
//   let alunoFiltrado = alunos.alunos.filter((aluno) => {
//     return aluno.matricula == matricula;
//   });

//   return alunoFiltrado;
// };

const getAluno = function (matricula) {
  let alunoFiltrado = alunos.alunos.filter((aluno) => {
    return aluno.matricula == matricula;
  });

  return alunoFiltrado;
};

const getDisciplinasAluno = function (matricula) {
  let alunoFiltrado = alunos.alunos.filter((aluno) => {
    return aluno.matricula == matricula;
  });

  let disciplinas = [];
  alunoFiltrado.forEach((aluno) => {
    aluno.curso.forEach((dadosCurso) => {
      disciplinas.push(dadosCurso.disciplinas);
    });
  });

  return disciplinas;
};

console.log(getAluno(20151001001));

module.exports = {
  getAluno,
  getDisciplinasAluno,
};
