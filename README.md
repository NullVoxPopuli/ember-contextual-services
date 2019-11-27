# ember-contextual-services

Eliminate Prop-Drilling by Providing Ephemeral Services based on the route!


Supports
* Ember.js v3.10 or above


# Installation

```
ember install ember-contextual-services--alpha
```

# Usage

in routes/wherever/-contexts/local-service.js;
```ts
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
```

in routes/wherever/some-route.js

```ts
import Route from '@ember/routing/route';
import { withContextualServices } from 'ember-contextual-services';

import { LocalService } from './-contexts/local-service';

@withContextualServices(LocalService)
export default class SomeRoute extends Route {

}
```

and finally, in a component that is rendered by your route's template or a tree of components fromy our route's template,

```ts
import Component from '@glimmer/component';

import { context } from 'ember-contextual-services';

import { LocalService } from 'my-app/routes/whatever/-contexts/local-service';

export default class ServiceConsumer extends Component {
  @context(LocalService) localService;
}

```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
