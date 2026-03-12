var step=0;
function main() {
    console.log("设置亮度");
    led.setBrightness(0.3);
    test();
}

function test(){

    /*
        led.setLED(mode,R,G,B);
        mode:动画类型, 可选值"cut"-硬切, "breathe"-呼吸, "flick"-闪烁, "slide"-滑入
        R,G,B:红 绿 蓝, [0,255]
    */

    if(step==0){
        console.log("硬切红灯")
        led.setLED("cut",255,0,0);
        setTimeout(test,1000);        
    }
    else if(step==1){
        console.log("硬切绿灯")
        led.setLED("cut",0,255,0);
        setTimeout(test,1000);        
    }
    else if(step==2){
        console.log("硬切蓝灯")
        led.setLED("cut",0,0,255);
        setTimeout(test,1000);        
    }
    else if(step==3){
        console.log("呼吸黄灯")
        led.setLED("breathe",255,255,0);
        setTimeout(test,4000);        
    }
    else if(step==4){
        console.log("闪烁紫灯")
        led.setLED("flick",0,255,255);
        setTimeout(test,4000);        
    }
    else if(step==5){
        console.log("滑入红灯")
        led.setLED("slide",255,0,0);
        setTimeout(test,2000);        
    }
    else if(step==6){
        console.log("滑入绿灯")
        led.setLED("slide",0,255,0);
        setTimeout(test,2000);        
    }

    step=(step+1)%7;
}

export {main}