"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gentron_1 = require("./Gentron");
console.log('Start Gentron');
if (process.argv != undefined && process.argv != null) {
    let gObj = new Gentron_1.Gentron();
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        if (index = 2) {
            gObj.ActiveProjectPath = val;
        }
    });
    if (gObj.ActiveProjectPath != '') {
        var rg;
        rg = Gentron_1.Gentron.open(gObj.ActiveProjectPath);
        if (rg.Result.Gentron != undefined) {
            let g = rg.Result.Gentron;
            g.Run();
        }
    }
}
//# sourceMappingURL=CMD.js.map