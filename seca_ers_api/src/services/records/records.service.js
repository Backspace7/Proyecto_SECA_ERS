// Initializes the `records` service on path `/records`
const { Records } = require('./records.class');
const createModel = require('../../models/records.model');
const hooks = require('./records.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate: {
     default: 100,
     max: 300
    }
  };

  // Initialize our service with any options it requires
  app.use('/records', new Records(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('records');

  service.hooks(hooks);
};
