import { Gentron, IGentron } from './Gentron';
import { Result, TGentronFsResult } from './results';

console.log('Start Gentron');
if (process.argv != undefined && process.argv != null) {
    
    let gObj: Gentron = new Gentron();
    let ActiveEnvironment : string = '';

    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);

        if ((val.toLowerCase() == '-projpath' ||
        val.toLowerCase() == '-proj' ||
        val.toLowerCase() == '-projectpath' ||
        val.toLowerCase() == '-p' ) 
        && process.argv[index+1] != undefined 
        && process.argv[index+1] != null) {
            gObj.ActiveProjectPath = process.argv[index+1];
        }

        if ((val.toLowerCase() == '-e' ||
        val.toLowerCase() == '-env' ||
        val.toLowerCase() == '-environment') 
        && process.argv[index+1] != undefined 
        && process.argv[index+1] != null) {
            ActiveEnvironment = process.argv[index+1];
        }

        if ((val.toLowerCase() == '-g' ||
        val.toLowerCase() == '-gobj' ||
        val.toLowerCase() == '-gentronobject' ||
        val.toLowerCase() == '-obj') 
        && process.argv[index+1] != undefined 
        && process.argv[index+1] != null) {
            gObj = Gentron.parse(process.argv[index+1].toString());
        }

    });
    
    if (gObj.ActiveProjectPath != '') {
        var rg: Result<TGentronFsResult>;
        rg = Gentron.open(gObj.ActiveProjectPath);

        if(rg.Result.Gentron != undefined){
          let g : Gentron = <Gentron> rg.Result.Gentron;
          if(ActiveEnvironment!= '')
          {
              g.ActiveEnvironment = ActiveEnvironment;
          }
          g.Run();
        }
        
    }
}

