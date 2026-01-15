var vi,vo,ai,ao,encv,enca,push,preview;
function main(){
    //获取第一个视频接口的名字
    var iface=Link.getInterface()[0];
    
    //视频输入   
    vi=Link.create("InputVi");    
    vi.start({interface:iface});
    //音频输入
    ai=Link.create("InputAi");
    ai.start({interface:iface});
    //编码模块
    encv=Link.create("EncodeV");
    enca=Link.create("EncodeA");
    //封装模块
    push=Link.create("Mux");
    preview=Link.create("Mux");

    //音视频环出
    vo=Link.create("OutputVo");
    vo.start();
    ao=Link.create("OutputAo");
    ao.start({interface:"HDMI-OUT"});
    ai.linkA(ao);
    vi.linkV(vo);

    //数据流连接
    ai.linkA(enca).linkA(push);
    vi.linkV(encv).linkV(push);
    enca.linkA(preview);
    encv.linkV(preview);

    //启动预览流
    preview.start({path:"rtmp://127.0.0.1/live/preview"});

    //读取配置文件
    var conf=sys.loadJson("/config/config.json");
    update(conf);
}

function update(conf){
    //传入编码参数
    enca.start(conf.enca);
    encv.start(conf.encv);

    //推流开关
    if(conf.push.enable)
        push.start({path:conf.push.path});
    else
        push.stop();

    //保存配置文件
    sys.saveJson(conf,"/config/config.json");
}

function getPushSpeed(){
    var ret = push.invoke("getSpeed");
    var speed = 0;
    if (ret != undefined && ret.speed != undefined)
        speed = Math.floor(ret.speed * 8 / 1024);
    return speed;
}

exports.main = main;
exports.update = update;
exports.getPushSpeed = getPushSpeed;