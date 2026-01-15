import {LCD} from "/script/core/lcd.js"

exports.onLoad = function(){
    var conf=sys.loadOsJson("/link/config/netManager.json");
    var name=Object.keys(conf.interface)[0];
    if(conf.gw!="")
        name=conf.gw;
    var net=conf.interface[name];
    var data={};
    data.name=name;
    data.dhcp={type:"select",options:[
        {txt:"ON",val:true},
        {txt:"OFF",val:false}],val:net.dhcp};
    var ip=net.ip.split('.');
    data.ip0={type:"int",step:1,min:0,max:255,val:Number(ip[0])};
    data.ip1={type:"int",step:1,min:0,max:255,val:Number(ip[1])};
    data.ip2={type:"int",step:1,min:0,max:255,val:Number(ip[2])};
    data.ip3={type:"int",step:1,min:0,max:255,val:Number(ip[3])};

    var mask=net.mask.split('.');
    data.mask0={type:"int",step:1,min:0,max:255,val:Number(mask[0])};
    data.mask1={type:"int",step:1,min:0,max:255,val:Number(mask[1])};
    data.mask2={type:"int",step:1,min:0,max:255,val:Number(mask[2])};
    data.mask3={type:"int",step:1,min:0,max:255,val:Number(mask[3])};

    var gw=net.gw.split('.');
    data.gw0={type:"int",step:1,min:0,max:255,val:Number(gw[0])};
    data.gw1={type:"int",step:1,min:0,max:255,val:Number(gw[1])};
    data.gw2={type:"int",step:1,min:0,max:255,val:Number(gw[2])};
    data.gw3={type:"int",step:1,min:0,max:255,val:Number(gw[3])};

    var dns=net.dns.split('.');
    data.dns0={type:"int",step:1,min:0,max:255,val:Number(dns[0])};
    data.dns1={type:"int",step:1,min:0,max:255,val:Number(dns[1])};
    data.dns2={type:"int",step:1,min:0,max:255,val:Number(dns[2])};
    data.dns3={type:"int",step:1,min:0,max:255,val:Number(dns[3])};
    LCD.setData(data);
}

exports.onChange =function(data){
    var conf=sys.loadOsJson("/link/config/netManager.json");
    var net=conf.interface[data.name];
    net.dhcp=data.dhcp.val;
    net.ip=data.ip0.val+"."+data.ip1.val+"."+data.ip2.val+"."+data.ip3.val;
    net.mask=data.mask0.val+"."+data.mask1.val+"."+data.mask2.val+"."+data.mask3.val;
    net.gw=data.gw0.val+"."+data.gw1.val+"."+data.gw2.val+"."+data.gw3.val;
    net.dns=data.dns0.val+"."+data.dns1.val+"."+data.dns2.val+"."+data.dns3.val;

    sys.rpcCall("http://127.0.0.1/RPC2","net.update",[JSON.stringify(conf,null,2)]);
}

exports.interval = 2000;