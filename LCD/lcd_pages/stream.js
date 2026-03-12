import LCD from "../script/core/lcd/lcd.js"
import * as main from "../script/main.js"

function onLoad(){
    var conf=sys.loadJson("/config/config.json");
    var data={};
    data.push={type:"select",options:[
        {txt:"ON",val:true},
        {txt:"OFF",val:false}],val:conf.push.enable};
    data.speed=main.getPushSpeed()+"kb/s";
    LCD.setData(data);
}

function onChange(data){
    var conf=sys.loadJson("/config/config.json");
    conf.push.enable=data.push.val;
    main.update(conf);
}

var interval = 2000;
export {interval,onLoad,onChange}