import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import {
  withContextualServices,
  context,
} from '@nullvoxpopuli/ember-contextual-services';

import { PersonService } from './-contexts/person-service';

@withContextualServices(PersonService)
export default class DataLoadingRoute extends Route {
  @context(PersonService) personService;
  @service router;

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', (transition) => {
      if (transition.to.name === this.routeName) {
        this.personService.data = this.currentModel;
      }
    });
  }

  async model() {
    // await this.personService.nextPerson();
    let response = await fetch('https://swapi.dev/api/people/1/');
    return response.json();
  }
}
