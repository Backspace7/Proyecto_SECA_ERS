// Initializes the `crop-types` service on path `/crop-types`
const { CropsTypes } = require('./crops_types.class');
const createModel = require('../../models/crops_types.model');
const hooks = require('./crops_types.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/crops-types', new CropsTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('crops-types');

  service.hooks(hooks);
};
