// Initializes the `crops` service on path `/crops`
const { Crops } = require('./crops.class');
const createModel = require('../../models/crops.model');
const hooks = require('./crops.hooks');

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
  app.use('/crops', new Crops(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('crops');

  service.hooks(hooks);
};
