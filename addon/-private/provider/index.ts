import { setComponentManager } from '@ember/component';
import ApplicationInstance from '@ember/application/instance';

import BaseComponent from './component';
import ComponentManager from './manager';

setComponentManager((owner: ApplicationInstance) => {
  return new ComponentManager(owner);
}, BaseComponent);

export default BaseComponent;
