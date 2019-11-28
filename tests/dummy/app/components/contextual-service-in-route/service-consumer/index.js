import Component from '@glimmer/component';

import { context } from 'ember-contextual-services';

import { LocalService } from 'dummy/routes/-contexts/local-service';

export default class ServiceConsumer extends Component {
  @context(LocalService) localService;
}
