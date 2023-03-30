"use strict";

const cursos = require("./cursos.js");

const getListaCursos = function() {
    return cursos.cursos;
}

module.exports = {
    getListaCursos,
}
