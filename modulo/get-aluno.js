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

  // return alunoFiltrado

  let dadosDisciplinas = alunoFiltrado.forEach(item => {
    item.curso.map(item => {
      return {
        disciplinas: item.disciplinas
      }
    })
  })

  console.log(dadosDisciplinas);
  
};

console.log(getAluno(20151001001));

module.exports = {
  getAluno
}