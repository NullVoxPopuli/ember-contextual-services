import Service from '@ember/service';

type LocalRegistry = {
  [routeName: string]: WeakMap<Class, Class>;
};

export default class PrivateRegistry extends Service {
  byRoute?: LocalRegistry;
}
