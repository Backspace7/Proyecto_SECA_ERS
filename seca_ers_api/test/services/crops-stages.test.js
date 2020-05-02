const assert = require('assert');
const app = require('../../src/app');

describe('\'crops-stages\' service', () => {
  it('registered the service', () => {
    const service = app.service('crops-stages');

    assert.ok(service, 'Registered the service');
  });
});
