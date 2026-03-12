import LCD from "../script/core/lcd/lcd.js"
import * as main from "../script/main.js"

var device=null;
var last_total=0;
var last_idel=0;
var last_cpu=0;

function getSysState()
{
    if(device==null)
    {
        device=Link.create("Device");
        device.start();
    }
    
    var total=0, idel=0;
    var str=sys.readOsFile("/proc/stat");
    str=str.split("\n")[0];  
    var lst = str.split(/\s+/);
    
    for(var i=1;i<lst.length;i++){
        total+=Number(lst[i]);
        if(i==4)
            idel=Number(lst[i]);
    }
    var cpu=0;
    if(total-last_total!=0 && last_total!=0)
        cpu=Math.floor(100-(idel-last_idel)*100/(total-last_total));
    
    if(total-last_total>300){
        last_total=total;
        last_idel=idel;
        last_cpu=cpu;
    }
    else
        cpu=last_cpu;

    str=sys.readOsFile("/proc/meminfo");
    var str1=str.split("\n")[0];
    var str2=str.split("\n")[1];

    var m1=Number(str1.match(/\d+/)[0]);
    var m2=Number(str2.match(/\d+/)[0]);
    var mem=100-Math.floor((m2)*100/m1);

    var rt={};
    rt.cpu=cpu;
    rt.temp=device.invoke("getTemperature");
    rt.mem=mem;
    return rt;
}

function onLoad(){
    var data={};

    var conf=sys.loadOsJson("/link/config/netManager.json");
    var name=Object.keys(conf.interface)[0];
    if(conf.gw!="")
        name=conf.gw;
    var net=conf.interface[name];

    data.ip=net.ip;
    data.input="No Signal";
    data.output=main.getPushSpeed();
    var repo=main.getInputState();
    if(repo.avalible)
        data.input=repo.width+"x"+repo.height+(repo.interlace?"I":"P")+repo.framerate;
    var sysState=getSysState();
    data.temp=sysState.temp+"℃";
    data.cpu=sysState.cpu+"%";
    data.mem=sysState.mem+"%";
    LCD.setData(data);
}

var interval = 2000;
export { onLoad,interval }