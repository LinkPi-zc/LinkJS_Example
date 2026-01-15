var vi,ai,encv,enca,rtspServer,mux;
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
    var cfgV={};
    cfgV.codec="h264";
    cfgV.profile="high";
    cfgV.width=1920;
    cfgV.height=1080;
    cfgV.framerate=30;
    cfgV.bitrate=4000;
    cfgV.gop=8;
    encv.start(cfgV);
    enca=Link.create("EncodeA");
    var cfgA={};
    cfgA.codec="aac";
    cfgA.samplerate=48000;
    cfgA.channels=2;
    cfgA.bitrate=128;
    enca.start(cfgA);

    //创建一个rtsp服务，全局只需要一个
    rtspServer=Link.create("Rtsp");
    rtspServer.start();

    mux=Link.create("Mux");
    //内部传输使用mem自定义协议
    mux.start({path:"mem://test",format:"rtsp"});

    vi.linkV(encv).linkV(mux).linkV(rtspServer);
    ai.linkA(enca).linkA(mux).linkA(rtspServer);

    //连接模块事件
    Link.connectEvent(rtspServer,onEvent);
}

function onEvent(type,info){
    console.log(type,info);
    if(type=="newClient")
    {
        encv.invoke("idr");
    }
}

exports.main = main;