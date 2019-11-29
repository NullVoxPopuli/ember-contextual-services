import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  docsRoute(this, function() {
    this.route('usage');
    // this.route('contextual-service-in-route', function() {
    //   this.route('foo');
    //   this.route('baz');
    // });
    // this.route('without-contextual-service');
    // this.route('data-loading');
  });

  this.route('not-found', { path: '/*path' });
});
