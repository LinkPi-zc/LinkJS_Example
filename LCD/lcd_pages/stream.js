import {LCD} from "/script/core/lcd.js"
import main from "/script/main.js"

exports.onLoad = function(){
    var conf=sys.loadJson("/config/config.json");
    var data={};
    data.push={type:"select",options:[
        {txt:"ON",val:true},
        {txt:"OFF",val:false}],val:conf.push.enable};
    data.speed=main.getPushSpeed()+"kb/s";
    LCD.setData(data);
}

exports.onChange =function(data){
    var conf=sys.loadJson("/config/config.json");
    conf.push.enable=data.push.val;
    main.update(conf);
}

exports.interval = 2000;