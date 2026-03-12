import LCD from "../script/core/lcd/lcd.js"
import * as main from "../script/main.js"

function onLoad(){
    var conf=sys.loadJson("/config/config.json");
    var enca=conf.enca;
    var data={};
    data.codec={type:"select",options:[
        {txt:"AAC",val:"aac"},
        {txt:"AAC-HE",val:"aache"},
        {txt:"OPUS",val:"opus"},
        {txt:"PCMA",val:"pcma"},
        {txt:"MPEG2",val:"mp2"},
        {txt:"MP3",val:"mp3"},
        {txt:"close",val:"close"}],val:enca.codec};
    data.samplerate={type:"select",options:[
        {txt:"48K",val:48000},
        {txt:"44.1K",val:44100},
        {txt:"32K",val:32000},
        {txt:"16K",val:16000}],
        val:enca.samplerate};
    data.bitrate={type:"int",step:64,min:0,max:512,val:enca.bitrate};
    LCD.setData(data);
}

function onChange(data){
    var conf=sys.loadJson("/config/config.json");
    var enca=conf.enca;
    enca.codec=data.codec.val;
    enca.samplerate=data.samplerate.val;
    enca.bitrate=data.bitrate.val;

    main.update(conf);
}

export {onLoad,onChange}