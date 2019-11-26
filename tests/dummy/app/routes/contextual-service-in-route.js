import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

class LocalService {
  static create(injections) {
    return new this(injections);
  }

  constructor(injections) {
    Object.assign(this, injections);
  }
}

function provideContext(providedService) {
  return function contextInjector(ProvideeClass) {

    let className = `${ProvideeClass.constructor.name}WithProvidedContexts`
    return class className extends ProvideeClass {
      constructor(...args) {
        super(...args);

        let owner = getOwner(this);
        // TODO: create instances of passed contexts
        // TODO: store them on a private service,
        //       scoped to the route name;
        let router = owner.lookup('router:main');
        console.log({owner, router});
      }
    };
  }
}




@provideContext(LocalService)
export default class ContextualServiceInRouteRoute extends Route {
}
