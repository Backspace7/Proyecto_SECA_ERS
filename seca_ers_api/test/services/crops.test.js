const assert = require('assert');
const app = require('../../src/app');

describe('\'crops\' service', () => {
  it('registered the service', () => {
    const service = app.service('crops');

    assert.ok(service, 'Registered the service');
  });
});
