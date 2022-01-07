import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Service | ember-contextual-services/-private/registry',
  function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function (assert) {
      let service = this.owner.lookup(
        'service:ember-contextual-services/-private/registry'
      );
      assert.ok(service);
    });
  }
);
