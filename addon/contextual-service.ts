// To integrate with Ember's D.I. system, this is all that's needed.
// This is provided as a convience class for creating injectable
// contextual services
export class ContextualService {
  static create(injections: any) {
    return new this(injections);
  }

  constructor(injections: any) {
    Object.assign(this, injections);
  }
}
