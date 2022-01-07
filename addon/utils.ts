import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

import PrivateRegistry from 'dummy/services/ember-contextual-services/-private/registry';
import { REGISTRY_NAME } from '@nullvoxpopuli/ember-contextual-services/constants';

export function registryFor(registry: PrivateRegistry, routeName: string) {
  registry.byRoute = registry.byRoute || {};
  registry.byRoute[routeName] = registry.byRoute[routeName] || new WeakMap();

  return registry.byRoute[routeName];
}

export function getContextInNearestRegistry(this: unknown, ContextKey: Class) {
  let owner = getOwner(this);
  assert(
    `Attempting to lookup an injected property on an object without a container, ensure that the object was instantiated via a container.`,
    Boolean(owner)
  );

  let registry = owner.lookup(REGISTRY_NAME);
  let router = owner.lookup('service:router');

  let routeParts = router.currentRouteName.split('.');
  let context: Class | undefined;

  while (routeParts.length > 0) {
    let localRegistry = registryFor(registry, routeParts.join('.'));

    context = localRegistry.get(ContextKey);

    if (context) {
      break;
    }

    routeParts.pop();
  }

  assert(
    `Attempt to retrieve a contextual service named ${ContextKey.name}. It was not found in the local registry on the ${router.currentRouteName} route or any ancestor routes.`,
    Boolean(context)
  );

  return context;
}
