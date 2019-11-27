import Component from '@glimmer/component';
import { context } from 'ember-contextual-services';

import { PersonService } from 'dummy/routes/-contexts/person-service';

export default class PersonIncrementerComponent extends Component {
  @context(PersonService) personService;
}
