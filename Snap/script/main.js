var vi,enc;
function main(){
    //获取第一个视频接口的名字
    var iface=Link.getInterface()[0];
    
    //视频输入   
    vi=Link.create("InputVi");    
    vi.start({interface:iface});
    //编码模块
    enc=Link.create("EncodeV");
    enc.start({codec:"jpeg",snap:true,width:640,height:360,qfactor:99});

    vi.linkV(enc);

    snap();
}

function snap(){
    enc.invoke("snapSync","/tmp/snap/test.jpg");
}

exports.main = main;
exports.snap = snap;