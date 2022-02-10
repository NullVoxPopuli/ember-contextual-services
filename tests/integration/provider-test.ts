import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, clearRender } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import Service, { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import EmberComponent from '@ember/component';

import { ContextProvider, context } from 'ember-contextual-services';

module('Integration | Component | provider', function(hooks) {
  setupRenderingTest(hooks);

  test('lifecycles', async function(assert) {
    assert.expect(7);

    this.owner.register(
      'component:foo',
      class Foo extends ContextProvider {
        constructor() {
          super(...arguments);

          assert.equal(this.args.foo, 2, 'constructor receives args');
        }

        didReceiveArgs(previousArgs, nextArgs) {
          assert.equal(previousArgs.foo, 2, 'previous args');
          assert.equal(nextArgs.foo, 3, 'next args');
          assert.equal(this.args.foo, 3, 'next args');
          assert.equal(this.args, nextArgs, 'this args are nextArgs');
        }

        didUpdate() {
          assert.equal(this.args.foo, 3, 'didUpdate');
        }

        willDestroy() {
          assert.ok(true, 'willDestroy');
        }
      }
    );

    this.setProperties({ foo: 2 });

    await render(hbs`<Foo @foo={{this.foo}} />`);

    this.setProperties({ foo: 3 });

    await settled();
    await clearRender();
  });

  test('injection', async function(assert) {
    assert.expect(1);

    class Bar extends Service {
      bar = 2;
    }

    this.owner.register('service:bar', Bar);

    this.owner.register(
      'component:foo',
      class Foo extends ContextProvider {
        @service bar!: Bar;

        constructor(owner: unknown, args: object) {
          super(owner, args);

          assert.equal(this.bar.bar, 2, 'Service value accessible');
        }
      }
    );

    await render(hbs`<Foo />`);
  });

  module('context', function() {
    test('provides context one level down', async function(assert) {
      class FooProvider extends ContextProvider {
        provided = 'provided some stuff';
      }
      class Consumer extends Component {
        @context(FooProvider) foo!: FooProvider;
      }
      this.owner.register('component:foo-provider', FooProvider);
      this.owner.register('component:consumer', Consumer);
      this.owner.register('template:components/consumer', hbs`{{this.foo.provided}}`);

      await render(hbs`
        <FooProvider>
          <Consumer />
        </FooProvider>
      `);

      assert.dom(this.element).hasText('provided some stuff');
    });

    test('provides context two levels down', async function(assert) {
      class FooProvider extends ContextProvider {
        provided = 'provided some stuff';
      }
      class Consumer extends Component {
        @context(FooProvider) foo!: FooProvider;
      }
      class Intermediate extends Component {};
      this.owner.register('component:foo-provider', FooProvider);
      this.owner.register('component:consumer', Consumer);
      this.owner.register('component:intermediate', Intermediate);
      this.owner.register('template:components/consumer', hbs`{{this.foo.provided}}`);

      await render(hbs`
        <FooProvider>
          <Intermediate>
            <Consumer />
          </Intermediate>
        </FooProvider>
      `);

      assert.dom(this.element).hasText('provided some stuff');

    });
  });
});
