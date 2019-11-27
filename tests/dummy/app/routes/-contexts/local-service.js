import { ContextualService } from 'ember-contextual-services';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export class LocalService extends ContextualService {
  @service router;

  @tracked foo = 0;

  @action incrementFoo() {
    this.foo++;
  }
}

