function main() {
      //网络输入模块，支持常见协议rtsp/rtmp/srt/http等，具体参见模块文档
      var input=Link.create("InputNet");
      //按照实际情况修改下方解码url
      input.start({path:"rtsp://192.168.3.103/stream0"});

      //音视频解码模块
      var decv=Link.create("DecodeV");
      decv.start();
      var deca=Link.create("DecodeA");
      deca.start();

      //需要通过resample模块将解码后的音频统一调整为48K再输出
      var resample=Link.create("Resample");
      resample.start();

      //默认配置下是HDMI输出1080P60，可按需加入参数
      var vo=Link.create("OutputVo");
      vo.start();
      var ao=Link.create("OutputAo");
      ao.start({interface:"HDMI-OUT"});

      //连接数据流
      input.linkV(decv).linkV(vo);
      input.linkA(deca).linkA(resample).linkA(ao);

      //如果视频出现卡顿，可以尝试在input和dec模块之间，加入Queue模块，设定合适的delay
}

exports.main = main;