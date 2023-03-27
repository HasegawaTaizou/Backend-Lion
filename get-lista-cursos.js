"use strict";

const cursos = require("./cursos.js");

const getListaCursos = function () {
  console.log(cursos.cursos);
  return {
    sigla: cursos.cursos.map((curso) => curso.sigla),
    nome: cursos.cursos.map((curso) => curso.nome),
    icone: cursos.cursos.map((curso) => curso.icone),
  };
};

console.log(getListaCursos());
