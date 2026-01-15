import {LCD} from "core/lcd/lcd.js"
var vi,overlay,vo;
var config;
function main() {

    //视频输入
    vi=Link.create("InputVi");
    var name=Link.getInterface()[0];
    vi.start({interface:name});

    //文字叠加
    overlay=Link.create("Overlay2");
    overlay.start();

    //视频输出
    vo=Link.create("OutputVo");
    vo.start();

    //数据流
    vi.linkV(overlay).linkV(vo);

    //输出日志
    console.log("Hello World");
    
    //读取配置文件
    var conf=sys.loadJson("/config/config.json");
    update(conf);

    //LCD屏显示
    setInterval(onTimer,1000);
}

function update(conf){
    config=conf;
    var lay={};
    lay.type="text";
    lay.enable=true;
    lay.font="/link/res/font.ttf";
    lay.size=200;
    lay.content=conf.txt;
    lay.x=0.2;
    lay.y=0.4;
    lay.color="#ff0000";
    lay.alpha=1;
    overlay.setData({lays:[lay]});

    //保存配置文件
    sys.saveJson(conf,"/config/config.json");

    //刷新LCD屏
    onTimer();
}

function onTimer(){
    var net=sys.getIP();
    LCD.setHtml(config.txt+' <img src="img/smile.png" /><br/>'+net.ip);
}

exports.main = main;
exports.update = update;