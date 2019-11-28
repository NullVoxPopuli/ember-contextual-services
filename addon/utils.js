export function registryFor(registry, routeName) {
  registry.byRoute = registry.byRoute || {};
  registry.byRoute[routeName] = registry.byRoute[routeName] || new WeakMap();

  return registry.byRoute[routeName];
}
