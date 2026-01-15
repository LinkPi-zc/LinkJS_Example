var vi,ai,encv,enca,mux;
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
    encv.start(cfgV);
    enca=Link.create("EncodeA");
    var cfgA={};
    cfgA.codec="aac";
    cfgA.samplerate=48000;
    cfgA.channels=2;
    cfgA.bitrate=128;
    enca.start(cfgA);

    mux=Link.create("Mux");

    //连接数据流
    vi.linkV(encv).linkV(mux);
    ai.linkA(enca).linkA(mux);
}

exports.main = main;
exports.start = function(){
    mux.start({path:"/root/usb/test.mp4"});
};
exports.stop = function(){
    mux.stop(true);
}