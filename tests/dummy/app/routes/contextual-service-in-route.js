import Route from '@ember/routing/route';
import { withContextualServices } from '@nullvoxpopuli/ember-contextual-services';

import { LocalService } from './-contexts/local-service';

@withContextualServices(LocalService)
export default class ContextualServiceInRouteRoute extends Route {}
