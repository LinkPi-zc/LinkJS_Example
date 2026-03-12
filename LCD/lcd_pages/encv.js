import LCD from "../script/core/lcd/lcd.js"
import * as main from "../script/main.js"

function onLoad(){
    var conf=sys.loadJson("/config/config.json");
    var encv=conf.encv;
    var data={};
    data.codec={type:"select",options:[{txt:"H.264",val:"h264"},{txt:"H.265",val:"h265"},{txt:"close",val:"close"}],val:encv.codec};
    data.framerate={type:"int",step:5,min:5,max:60,val:encv.framerate};
    data.size={type:"select",options:[
        {txt:"1080P",val:"1920x1080"},
        {txt:"720P",val:"1280x720"},
        {txt:"360P",val:"640x360"}],
        val:encv.width+"x"+encv.height};
    data.bitrate={type:"int",step:500,min:0,max:10000,val:encv.bitrate};
    LCD.setData(data);
}

function onChange(data){
    var conf=sys.loadJson("/config/config.json");
    var encv=conf.encv;
    encv.codec=data.codec.val;
    if(encv.codec=="h265")
        encv.profile="main";
    else
        encv.profile="high";
    encv.framerate=data.framerate.val;
    encv.bitrate=data.bitrate.val;
    var size=data.size.val.split('x');
    encv.width=size[0];
    encv.height=size[1];

    main.update(conf);
}

export {onLoad,onChange}