const users = require('./users/users.service.js');
const sensors = require('./sensors/sensors.service.js');
const senTypes = require('./sen_types/sen_types.service.js');
const records = require('./records/records.service.js');
const informs = require('./informs/informs.service.js');
const crops = require('./crops/crops.service.js');
const cropsTypes = require('./crops_types/crops_types.service.js');
const cropsStages = require('./crops_stages/crops_stages.service.js');
const actuators = require('./actuators/actuators.service.js');
const zones = require('./zones/zones.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sensors);
  app.configure(senTypes);
  app.configure(records);
  app.configure(informs);
  app.configure(crops);
  app.configure(cropsTypes);
  app.configure(cropsStages);
  app.configure(actuators);
  app.configure(zones);
};
