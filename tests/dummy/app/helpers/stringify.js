import { helper } from '@ember/component/helper';

export default helper(function stringify(params /*, hash*/) {
  return JSON.stringify(params, null, 2);
});
