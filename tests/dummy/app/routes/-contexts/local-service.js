import { ContextualService } from 'ember-contextual-services';
import { inject as service } from '@ember/service';

export class LocalService extends ContextualService {
  @service router;
}

