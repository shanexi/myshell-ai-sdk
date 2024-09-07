"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exec;
function exec(code, scope) {
    try {
        const str = `
      var ${'____data'}  = arguments[0];
      with(${'____data'}) {
        return ${code}
      } 
    `;
        return (new Function(str))(scope);
    }
    catch (e) {
        console.log(e);
    }
}
