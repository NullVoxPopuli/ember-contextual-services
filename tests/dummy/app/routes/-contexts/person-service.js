import { ContextualService } from 'ember-contextual-services';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export class PersonService extends ContextualService {
  @tracked data;
  // starwars api doesn't include id as a field in their responses
  @tracked lastId = 1;

  @action
  async nextPerson() {
    this.lastId++;
    let response = await fetch(`https://swapi.co/api/people/${this.lastId}`);
    let json = await response.json();

    this.data = json;
  }
}

