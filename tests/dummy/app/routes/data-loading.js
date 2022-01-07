import Route from '@ember/routing/route';
import {
  withContextualServices,
  context,
} from '@nullvoxpopuli/ember-contextual-services';

import { PersonService } from './-contexts/person-service';

@withContextualServices(PersonService)
export default class DataLoadingRoute extends Route {
  @context(PersonService) personService;

  async model() {
    // await this.personService.nextPerson();
    let response = await fetch('https://swapi.co/api/people/1/');
    let json = await response.json();

    this.personService.data = json;
  }
}
