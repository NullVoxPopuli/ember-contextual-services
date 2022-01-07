import { getOwner } from '@ember/application';

import { registryFor, getContextInNearestRegistry } from './utils';
import { REGISTRY_NAME } from './constants';

const REGISTRY = Symbol('ContextualRegistry');

export function withContextualServices(...services: Class[]) {
  return function contextInjector(ProvideeClass: Class) {
    return class WithContexts extends ProvideeClass {
      // @ts-ignore
      static name = `${ProvideeClass.name}WithContextualServices`;

      model(...args: any[]) {
        let owner = getOwner(this);
        let registry = owner.lookup(REGISTRY_NAME);
        let localRegistry = registryFor(registry, this.routeName);

        // @ts-ignore
        this[REGISTRY] = localRegistry;

        for (let providedService of services) {
          let instance = new providedService(owner.ownerInjection());

          // @ts-ignore
          this[REGISTRY].set(providedService, instance);
        }

        super.model(...args);
      }

      deactivate() {
        // @ts-ignore
        if (this[REGISTRY]) {
          for (let providedService of services) {
            // @ts-ignore
            this[REGISTRY].delete(providedService);
          }
        }

        super.deactivate();
      }
    };
  };
}

export function context(ContextKey: Class) {
  return (
    _target: unknown,
    _propertyName: string,
    _descriptor: PropertyDescriptor
  ) => {
    return {
      configurable: false,
      enumerable: true,
      get: function () {
        try {
          return getContextInNearestRegistry.call(this, ContextKey);
        } catch (e) {
          console.error(e);
        }
      },
    };
  };
}
