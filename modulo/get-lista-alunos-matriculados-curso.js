"use strict";

const alunos = require("./alunos.js");

const getListaAlunosMatriculadosCurso = function (cursoEspecifico) {
  alunos.alunos.filter((aluno) => {
    let cursosFiltrados = aluno.curso.filter((curso) => {
      if (curso.sigla == cursoEspecifico) {
          console.log(cursoEspecifico);
        
        return curso.sigla == cursoEspecifico;
      }
    });
    console.log(cursosFiltrados);
    
    return cursosFiltrados;
  });
};


getListaAlunosMatriculadosCurso("RDS")
