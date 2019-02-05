import { Gentron } from './Gentron';
import { Result, TGentronFsResult } from './results';


if (process.argv != undefined && process.argv != null) {
    
    let gObj : Gentron = new Gentron();
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);

        if (index = 0) {
            gObj.ActiveProjectPath = val;
        }
        if (index = 1) {
            gObj = Gentron.parse(val);
        }
    });
    
    if (gObj.ActiveProjectPath != '') {
        var rg: Result<TGentronFsResult>;
        rg = Gentron.open(gObj.ActiveProjectPath);
        console.log(rg.Result.Gentron);
    }

    gObj.Run();
    
}