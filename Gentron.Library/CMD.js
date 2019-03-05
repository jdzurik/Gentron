"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gentron_1 = require("./Gentron");
console.log('Start Gentron');
if (process.argv != undefined && process.argv != null) {
    let gObj = new Gentron_1.Gentron();
    let ActiveEnvironment = '';
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        if ((val.toLowerCase() == '-projpath' ||
            val.toLowerCase() == '-proj' ||
            val.toLowerCase() == '-projectpath' ||
            val.toLowerCase() == '-p')
            && process.argv[index + 1] != undefined
            && process.argv[index + 1] != null) {
            gObj.ActiveProjectPath = process.argv[index + 1];
        }
        if ((val.toLowerCase() == '-g' ||
            val.toLowerCase() == '-gobj' ||
            val.toLowerCase() == '-gentronobject' ||
            val.toLowerCase() == '-obj')
            && process.argv[index + 1] != undefined
            && process.argv[index + 1] != null) {
            gObj = Gentron_1.Gentron.parse(process.argv[index + 1].toString());
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