// Initializes the `sensors` service on path `/sensors`
const { Sensors } = require('./sensors.class');
const createModel = require('../../models/sensors.model');
const hooks = require('./sensors.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sensors', new Sensors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sensors');

  service.hooks(hooks);
};
