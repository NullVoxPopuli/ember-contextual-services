import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('contextual-service-in-route', function () {
    this.route('foo');
    this.route('baz');
  });
  this.route('without-contextual-service');
  this.route('data-loading');
});
