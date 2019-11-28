import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contextual-service-in-route/bar', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contextual-service-in-route/bar');
    assert.ok(route);
  });
});
