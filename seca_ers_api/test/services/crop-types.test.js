const assert = require('assert');
const app = require('../../src/app');

describe('\'crop-types\' service', () => {
  it('registered the service', () => {
    const service = app.service('crop-types');

    assert.ok(service, 'Registered the service');
  });
});
