function main() {
    //创建UVC输入模块
    var uvc=Link.create("InputV4l2");
    var data={};
    data.path="/dev/video0";
    data.format="mjpeg";
    data.width=1280;
    data.height=720;
    uvc.start(data);

    //创建mjpeg解码模块
    var decv=Link.create("DecodeV");
    decv.start();

    //创建视频输出模块
    var vo=Link.create("OutputVo");
    vo.start();

    //连接数据流
    uvc.linkV(decv).linkV(vo);
}

export {main}