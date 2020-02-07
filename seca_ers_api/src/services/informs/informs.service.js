// Initializes the `informs` service on path `/informs`
const { Informs } = require('./informs.class');
const createModel = require('../../models/informs.model');
const hooks = require('./informs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate: {
     default: 100,
     max: 200
    }
  };

  // Initialize our service with any options it requires
  app.use('/informs', new Informs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('informs');

  service.hooks(hooks);
};
