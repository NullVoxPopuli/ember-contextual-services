// Inspiration:
// https://github.com/glimmerjs/glimmer.js/blob/master/packages/%40glimmer/component/addon/-private/component.ts
// https://github.com/rwjblue/sparkles-component/blob/master/addon/index.ts
import { setOwner } from '@ember/application';

const DESTROYING = new WeakMap<BaseComponent<unknown>, boolean>();
const DESTROYED = new WeakMap<BaseComponent<unknown>, boolean>();
export const PREVIOUS_ARGS = Symbol('PREVIOUS_ARGS');

export function setDestroying(component: BaseComponent<unknown>) {
  DESTROYING.set(component, true);
}
export function setDestroyed(component: BaseComponent<unknown>) {
  DESTROYED.set(component, true);
}

export default class BaseComponent<T = object> {
  args: Readonly<T>;
  // by the time this _can_ be read, it will have a value
  [PREVIOUS_ARGS]: Readonly<T>;

  constructor(owner: unknown, args: T) {
    this.args = args;
    setOwner(this, owner);

    DESTROYING.set(this, false);
    DESTROYED.set(this, false);
  }

  /**
   * Called before the component receives args
   *
   * @param next args that _will_ be set
   */
  didReceiveArgs(_previousArgs: T, _nextArgs: T) {}

  /**
   * Called after the component has received new args
   * and after all of the sub-components have been rendered.
   */
  didUpdate() {}

  /**
   * Called before the component has been removed from the DOM.
   */
  willDestroy() {}

  get isDestroying(): boolean {
    return Boolean(DESTROYING.get(this));
  }

  get isDestroyed(): boolean{
    return Boolean(DESTROYED.get(this));
  }
}
