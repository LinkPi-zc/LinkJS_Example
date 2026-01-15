var vi,ai,encv,enca;
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

    //连接输入与编码
    vi.linkV(encv);
    ai.linkA(enca);

    //创建一个rtmp流，rtmp://设备IP/live/test
    //或 http://设备IP/flv?app=live&stream=test
    startRtmp();

    //创建一个rtsp流，rtsp://设备IP/test
    startRtsp();

    //创建一个srt流，srt://设备IP:9000?mode=caller&latency=50
    //以及一个sls流，srt://设备IP:8080?streamid=pull/live/test
    startSrt();

    //创建一个HLS流，http://设备IP/hls/test.m3u8
    startHLS();

    //创建一个Rist流，rist://设备IP:9001
    startRist();
    
    //创建UDP流，udp://@233.233.2.1:3000
    startUdp();

    //创建NDI流
    startNDI();
}

function startRtmp(){
    var mux=Link.create("Mux");
    //推给本地nginx服务
    mux.start({path:"rtmp://127.0.0.1/live/testtest"});

    encv.linkV(mux);
    enca.linkA(mux);
}

function startRtsp(){
    //创建一个rtsp服务，全局只需要一个
    var rtspServer=Link.create("Rtsp");
    rtspServer.start();
    var mux=Link.create("Mux");
    //内部传输使用mem自定义协议
    mux.start({path:"mem://test",format:"rtsp"});

    encv.linkV(mux).linkV(rtspServer);
    enca.linkA(mux).linkA(rtspServer);
}

function startSrt(){
    var mux=Link.create("Mux");
    //listener模式
    mux.start({path:"srt://0.0.0.0:9000?mode=listener&latency=50"});

    var mux2=Link.create("Mux");
    //streamid模式，推给本地SLS服务
    mux2.start({path:"srt://127.0.0.1:8080?streamid=push/live/test"});

    encv.linkV(mux);
    enca.linkA(mux);

    encv.linkV(mux2);
    enca.linkA(mux2);
}

function startHLS(){
    var mux=Link.create("Mux");
    mux.start({path:"/tmp/hls/test.m3u8"});

    encv.linkV(mux);
    enca.linkA(mux);
}

function startRist(){
    var mux=Link.create("Mux");
    mux.start({path:"rist://@0.0.0.0:9001"});

    encv.linkV(mux);
    enca.linkA(mux);
}

function startUdp(){
    var udp=Link.create("TSUdp");
    udp.start({ip:"233.233.2.1",port:3000});
    var mux=Link.create("Mux");
    //内部传输使用mem自定义协议
    mux.start({path:"mem://test",format:"mpegts"});

    //mpegts的音视频混在一起，这里音频可以省略数据连接
    encv.linkV(mux).linkV(udp);    
    enca.linkA(mux);
}

function startNDI(){
    var ndi=Link.create("NDISend");
    ndi.start({name:"test"});

    encv.linkV(ndi);  
    enca.linkA(ndi);
}

exports.main = main;