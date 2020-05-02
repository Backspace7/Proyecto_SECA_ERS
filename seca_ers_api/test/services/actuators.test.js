const assert = require('assert');
const app = require('../../src/app');

describe('\'actuators\' service', () => {
  it('registered the service', () => {
    const service = app.service('actuators');

    assert.ok(service, 'Registered the service');
  });
});
