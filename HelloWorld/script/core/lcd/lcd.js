var single = null;

function initLCD() {

    if (single) return single;    
    
    var pageIndex=-1;
    var pageList=[];
    var tabIndex=-1;
    var tabList=[];
    var timerId=-1;

    var lcdType=lcd.getType();
    
    single = {
        onKeyLeft: function(type){
            if(tabIndex==-1)
                this.gotoPage(pageIndex-1);
            else
                this.changeValue(-1);
        },
        onKeyRight: function(type){
            if(tabIndex==-1)
                this.gotoPage(pageIndex+1);
            else
                this.changeValue(1);
        },
        onKeyOK: function(type){
            if(type=="click" && tabIndex>=0){
                this.gotoTab(tabIndex+1);
            }
            else if(type=="press"){
                if(tabIndex==-1)
                    this.gotoTab(0);
                else{
                    tabIndex=-1; 
                    if(pageList[pageIndex].onChange!=undefined)
                        pageList[pageIndex].onChange(pageList[pageIndex].data);
                }                
            }
            this.setData(pageList[pageIndex].data);
        },
        changeValue: function(k){
            if(tabIndex==-1 || tabList.length==0)
                return;
            var obj=tabList[tabIndex];
            if(obj.type=="int"){
                obj.val+=k*obj.step;
                if(obj.val<obj.min)
                    obj.val=obj.max;
                if(obj.val>obj.max)
                    obj.val=obj.min;
            }
            else if(obj.type=="select"){
                obj.index+=k;
                if(obj.index<0)
                    obj.index=0;
                else if(obj.index>=obj.options.length)
                    obj.index=obj.options.length-1;
                obj.val=obj.options[obj.index].val;
                obj.txt=obj.options[obj.index].txt;
            }
            this.setData(pageList[pageIndex].data);
        },
        addPage:function(){
            //console.log("addPage",pageList.length);
            var arg0=arguments[0];
            var html=arg0;
            if(arg0.indexOf(".html")>0 && arg0.indexOf("<")<0)
            {
                html = sys.readFile(arg0);
            }
            var page={};
            page.html=html;
            page.index=pageList.length;
            pageList.push(page);
            if(arguments.length>1){
                var obj=arguments[1];
                if(obj.onLoad!=undefined){
                    page.onLoad=obj.onLoad;
                    page.onChange=obj.onChange;
                    page.interval=obj.interval;
                    return page;
                }
                else
                    page.onLoad=arguments[1];
            }                
            if(arguments.length>2)
                page.onChange=arguments[2];
            if(arguments.length>3)
                page.interval=arguments[3];
            else
                page.interval = -1;
            return page;
        },
        setData:function(data){
            var page=pageList[pageIndex];
            page.data=data;
            var html=page.html;
            var regex = /\{\{.*?\}\}/g;
            var matches = html.match(regex);
            tabList=[];
            if(matches){
                for(var i=0;i<matches.length;i++){
                    var m=matches[i];
                    var key=m.slice(2,m.length-2).trim();
                    if(data[key]!=undefined)
                    {
                        var val=data[key];
                        if(val.type==undefined)
                            html=html.replace(m, val);
                        else{
                            if(val.type=="int"){
                                if(tabList.length==tabIndex)
                                    html=html.replace(m, '<span class="tab active">'+val.val+'</span>');
                                else
                                    html=html.replace(m, '<span class="tab">'+val.val+'</span>');
                            }
                            else if(val.type=="select"){                                
                                var options=val.options;
                                val.index=0;
                                val.txt=options[0].txt;
                                for(var k=0;k<options.length;k++){
                                    var opt=options[k];
                                    if(opt.val==val.val){
                                        val.index=k;
                                        val.txt=opt.txt;
                                    }
                                }
                                if(tabList.length==tabIndex)
                                    html=html.replace(m, '<span class="tab active">'+val.txt+'</span>');
                                else
                                    html=html.replace(m, '<span class="tab">'+val.txt+'</span>');
                            }
                            tabList.push(val);                  
                        }
                    }                    
                }
            }
            this.setHtml(html);
        },
        gotoPage:function(index){
            if(index<0 && pageList.length>0)
                pageIndex=pageList.length-1;
            else if(index >= pageList.length && pageList.length>0)
                pageIndex=0;
            else if(index >=0 && index<pageList.length)
                pageIndex=index;
            else
                return;
            tabIndex=-1;
            //console.log("goto page",pageIndex);
            var page = pageList[pageIndex];
            if(page.onLoad!=undefined)
                page.onLoad();
            
            if(timerId!=-1){
                clearInterval(timerId);
                timerId=-1;
            }
            if(page.interval>0)
                timerId = setInterval(this.onPageTimer, page.interval);

        },
        gotoTab:function(index){
            if(index<0 && tabList.length>0)
                tabIndex=tabList.length-1;
            else if(index >= tabList.length && tabList.length>0)
                tabIndex=0;
            else if(index>=0 && index<tabList.length)
                tabIndex=index;
            else
                return;
            //console.log("goto tab",tabIndex);
        },
        getPageIndex:function(){
            return pageIndex;
        },
        isChanging:function(){
            return (tabIndex>=0);
        },
        onPageTimer:function(){
            var page = pageList[pageIndex];
            if(tabIndex<0 && page.onLoad!=undefined)
                page.onLoad();
        },
        setHtml:function(html){
            if(lcdType=="LCD240135")
                lcd.setHtml('<html><head><link rel="stylesheet" type="text/css" href="script/core/lcd/lcd.css"></head><body>'+html+'</body></html>');
            else
                lcd.setHtml('<html><head><link rel="stylesheet" type="text/css" href="script/core/lcd/oled.css"></head><body>'+html+'</body></html>');
        }
    };
    
    var hw=sys.loadOsJson("/link/config/hardware.json");
    var btn=hw.button;
    var lastBtn="";
    var btnTimer=0;
    var lastTapTime=0;
    
    function onGpio(type,name){
        if(type == "down")
        {
            if(lastBtn == "")
            {
                lastBtn = name;
                btnTimer=setTimeout(btnTimeout,1200);
            }
        }

        if(type == "up")
        {
            if(lastBtn == name)
            {
                clearTimeout(btnTimer);
                lastBtn="";
            }
        }

        if(type == "click")
            formatGpio(name,type);
    }
    
    function btnTimeout(){
        formatGpio(lastBtn,"press");
        lastBtn="";
    }
    
    function formatGpio(name,type){
        var direct;
        if(name == btn.left)
            direct = "left";
        if(name == btn.right)
            direct = "right";
        if(name == btn.ok)
            direct = "ok";

        var curTime = sys.getTime();
        if(curTime - lastTapTime > 0 && curTime - lastTapTime < 300)
            return;
        lastTapTime = curTime;

        //console.log(direct,type);
        onGpioTap(direct,type);
    }
    
    function onGpioTap(direct,type){
        if(direct == "left" && single.onKeyLeft != null)
            single.onKeyLeft(type);
        else if(direct == "right" && single.onKeyRight != null)
            single.onKeyRight(type);
        else if(direct == "ok" && single.onKeyOK != null)
            single.onKeyOK(type);
    }
    
    
    var gpio=Link.create("GPIO");
    gpio.start();
    gpio.invoke("registEvent",btn.left);
    gpio.invoke("registEvent",btn.right);
    gpio.invoke("registEvent",btn.ok);
    Link.connectEvent(gpio,onGpio);
    return single;
}

export default initLCD();