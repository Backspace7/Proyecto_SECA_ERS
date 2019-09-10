// Initializes the `sen_types` service on path `/sen-types`
const { SenTypes } = require('./sen_types.class');
const createModel = require('../../models/sen_types.model');
const hooks = require('./sen_types.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sen-types', new SenTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sen-types');

  service.hooks(hooks);
};
