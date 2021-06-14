import {moduleList} from './moduleList';

let Modules = [];
Object.keys(moduleList).map((m) => {
  let mod = require('./' + moduleList[m] + '/index.js');
  Modules.push({[m]: mod});
});
// console.log('modXX', Modules);

export default Modules;
