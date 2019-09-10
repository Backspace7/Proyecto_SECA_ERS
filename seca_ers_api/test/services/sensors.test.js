const assert = require('assert');
const app = require('../../src/app');

describe('\'sensors\' service', () => {
  it('registered the service', () => {
    const service = app.service('sensors');

    assert.ok(service, 'Registered the service');
  });
});
