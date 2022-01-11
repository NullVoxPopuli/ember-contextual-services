import Service from '@ember/service';

type LocalRegistry = {
  [routeName: string]: WeakMap<Class, Class>;
};

export default class PrivateRegistry extends Service {
  byRoute?: LocalRegistry;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'ember-contextual-services/-private/registry': PrivateRegistry;
  }
}
