import Route from '@ember/routing/route';
import { provideContexts } from 'ember-contextual-services';

import { LocalService } from './-contexts/local-service';

@provideContexts(LocalService)
export default class ContextualServiceInRouteRoute extends Route {

}
