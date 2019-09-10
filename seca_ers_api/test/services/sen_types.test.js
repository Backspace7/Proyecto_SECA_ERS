const assert = require('assert');
const app = require('../../src/app');

describe('\'sen_types\' service', () => {
  it('registered the service', () => {
    const service = app.service('sen-types');

    assert.ok(service, 'Registered the service');
  });
});
