# ember-contextual-services

[![npm version](https://badge.fury.io/js/@nullvoxpopuli/ember-contextual-services.svg)](https://badge.fury.io/js/@nullvoxpopuli/ember-contextual-services)
[![CI](https://github.com/NullVoxPopuli/ember-contextual-services/actions/workflows/tests.yml/badge.svg?branch=master&event=push)](https://github.com/NullVoxPopuli/ember-contextual-services/actions/workflows/tests.yml)

Eliminate Prop-Drilling by Providing Ephemeral Services based on the route!

---

**Q: How is this different from Ember's Services?**

A: Three differences:

- it's private to the route
- it's destroyed when you navigate away to a different route
- primarily intended for passing the route's model data down to components without using component invocation args, which has the benefit of improving maintainability of templates, should the model's contents are structure change, because only the components in the subtree of the route that access the model data are affected. The components in between would not need to be updated as well, as they do with the default / built in patterns.

**Q: Do the contextual services need to live in a specific location?**

A: No, but co-location is highly encouraged. One of the main benefits to using contextual services over app-wide services is that usage can be reflected _by_ the location of the file.

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v16 or above
- ember-auto-import v2.0 or above

## Installation

```
ember install @nullvoxpopuli/ember-contextual-services
```

## Usage

All ContextualServices are classes that can hold any state or perform any action. They could represent specific interfaces to APIs, or a way of accessing data loaded from ember-data from deep within the route's component tree.

NOTE: all of these examples are available for viewing in the `tests/dummy` folder.

in routes/wherever/-contexts/local-service.js;

```ts
import { ContextualService } from '@nullvoxpopuli/ember-contextual-services';
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
import { withContextualServices } from '@nullvoxpopuli/ember-contextual-services';

import { LocalService } from './-contexts/local-service';

@withContextualServices(LocalService)
export default class SomeRoute extends Route {

}
```

or if you want to utilize the route's model hook for data-loading, you could do:

```ts
@withContextualServices(PersonService)
export default class SomeRoute extends Route {
  @context(PersonService) personService;

  async model() {
    let response = await fetch('https://swapi.co/api/people/1/');
    let json = await response.json();

    this.personService.data = json;
  }
}
```

and finally, in a component that is rendered by your route's template or a tree of components fromy our route's template,

```ts
import Component from '@glimmer/component';

import { context } from '@nullvoxpopuli/ember-contextual-services';

import { LocalService } from 'my-app/routes/whatever/-contexts/local-service';

export default class ServiceConsumer extends Component {
  @context(LocalService) localService;
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
