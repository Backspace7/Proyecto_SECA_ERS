// Initializes the `crops-stages` service on path `/crops-stages`
const { CropsStages } = require('./crops_stages.class');
const createModel = require('../../models/crops_stages.model');
const hooks = require('./crops_stages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/crops-stages', new CropsStages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('crops-stages');

  service.hooks(hooks);
};
