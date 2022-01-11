// Types for compiled templates
declare module '@nullvoxpopuli/ember-contextual-services/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

type Class = { new (...args: any[]): any };
