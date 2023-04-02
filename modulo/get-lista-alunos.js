"use strict";

const alunos = require("./alunos.js");

const getListaAlunos = function () {
  return alunos.alunos;
};

// console.log(getListaAlunos());

module.exports = {
  getListaAlunos,
};
