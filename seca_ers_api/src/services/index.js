const users = require('./users/users.service.js');
const sensors = require('./sensors/sensors.service.js');
const senTypes = require('./sen_types/sen_types.service.js');
const records = require('./records/records.service.js');
const informs = require('./informs/informs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sensors);
  app.configure(senTypes);
  app.configure(records);
  app.configure(informs);
};
