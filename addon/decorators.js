import { getOwner } from '@ember/application';

import { registryFor } from './utils';

const REGISTRY = Symbol('ContextualRegistry');

const REGISTRY_NAME = 'service:ember-contextual-services/-private/registry';

export function provideContexts(...services) {
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
  return function contextDecorator(target, propertyName, descriptor) {
      descriptor.writable = false;
      descriptor.configurable = true;
      descriptor.enumerable = true;
      descriptor.get = function() {
        console.log('getting?');
        let owner = getOwner(this);
        let registry = owner.lookup(REGISTRY_NAME);
        let router = owner.lookup('router:main');
        let localRegistry = registryFor(registry, router.currentRouteName);

        console.log(owner, router, localRegistry);

        let context = localRegistry.get(ContextKey);

        return context;

    }

    return descriptor;
  }
}
