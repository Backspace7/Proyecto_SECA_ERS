const { authenticate } = require('@feathersjs/authentication').hooks;

const tmaxmin = require('../../hooks/tmaxmin');

const ptoRocio = require('../../hooks/pto_rocio');

const radsolmax = require('../../hooks/radsolmax');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ptoRocio()],
    get: [ptoRocio()],
    create: [tmaxmin(), radsolmax()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
