// Types for compiled templates
declare module 'ember-contextual-services--alpha/templates/*' { 
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
