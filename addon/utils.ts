import PrivateRegistry from 'dummy/services/ember-contextual-services/-private/registry';

export function registryFor(registry: PrivateRegistry, routeName: string) {
  registry.byRoute = registry.byRoute || {};
  registry.byRoute[routeName] = registry.byRoute[routeName] || new WeakMap();

  return registry.byRoute[routeName];
}
