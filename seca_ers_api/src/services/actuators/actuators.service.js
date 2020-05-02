// Initializes the `actuators` service on path `/actuators`
const { Actuators } = require('./actuators.class');
const createModel = require('../../models/actuators.model');
const hooks = require('./actuators.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/actuators', new Actuators(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('actuators');

  service.hooks(hooks);
};
