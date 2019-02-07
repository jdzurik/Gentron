import { Gentron, IGentron } from './Gentron';
import { Result, TGentronFsResult } from './results';

console.log('Start Gentron');
if (process.argv != undefined && process.argv != null) {
    
    let gObj: Gentron = new Gentron();
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);

        if (index = 2) {
            gObj.ActiveProjectPath = val;
        }
        // if (index = 1) {
        //     gObj = Gentron.parse(val);
        // }
    });
    
    if (gObj.ActiveProjectPath != '') {
        var rg: Result<TGentronFsResult>;
        rg = Gentron.open(gObj.ActiveProjectPath);
        if(rg.Result.Gentron != undefined){
          let g : Gentron = <Gentron> rg.Result.Gentron;
          g.Run();
        }
        
    }

    
}

