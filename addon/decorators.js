import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

import { registryFor } from './utils';

const REGISTRY = Symbol('ContextualRegistry');

const REGISTRY_NAME = 'service:ember-contextual-services/-private/registry';

export function withContextualServices(...services) {
  return function contextInjector(ProvideeClass) {
    return class WithContexts extends ProvideeClass {
      static name = `${ProvideeClass.name}WithProvidedContexts`;

      model(...args) {
        let transition = args[1];
        let routeName = transition.to.name;

        let owner = getOwner(this);
        let registry = owner.lookup(REGISTRY_NAME);
        let localRegistry = registryFor(registry, routeName);

        this[REGISTRY] = localRegistry;

        for (let providedService of services) {
          let instance = new providedService(owner.ownerInjection());

          this[REGISTRY].set(providedService, instance);
        }

        super.model(...args);
      }

      willDestroy(...args) {
        if (this[REGISTRY]) {
          for (let providedService of services) {
            this[REGISTRY].delete(providedService);
          }
        }

        super.willDestroy(...args);
      }
    };
  }
}

export function context(ContextKey) {
  // https://github.com/emberjs/ember.js/blob/755ea5dbe65d91e0d650707da740aa6900d0a755/packages/%40ember/-internals/metal/lib/injected_property.ts#L72
   let getInjection = function() {
    let owner = getOwner(this);

    assert(
      `Attempting to lookup an injected property on an object without a container, ensure that the object was instantiated via a container.`,
      Boolean(owner)
    );

    let registry = owner.lookup(REGISTRY_NAME);

    let router = owner.lookup('router:main');
    let localRegistry = registryFor(registry, router.currentRouteName);

   assert(
     `Attempt to look up contextual service failed. Ensure that your route is decorated with @withContextualServices(${ContextKey.name})`,
     Boolean(localRegistry)
   );

    let context = localRegistry.get(ContextKey);

     return context;
  };

  return (target, propertyName, descriptor) => {
    return {
      configurable: false,
      enumerable: true,
      get: getInjection,
    };
  }
}
