const assert = require('assert');
const app = require('../../src/app');

describe('\'informs\' service', () => {
  it('registered the service', () => {
    const service = app.service('informs');

    assert.ok(service, 'Registered the service');
  });
});
