import LCD from "./core/lcd/lcd.js"
import * as home from "../lcd_pages/home.js"
import * as encv from "../lcd_pages/encv.js"
import * as enca from "../lcd_pages/enca.js"
import * as stream from "../lcd_pages/stream.js"
import * as net from "../lcd_pages/net.js"

function initMenu(){
    LCD.addPage("/lcd_pages/home.html",home);
    LCD.addPage("/lcd_pages/encv.html",encv);
    LCD.addPage("/lcd_pages/enca.html",enca);
    LCD.addPage("/lcd_pages/stream.html",stream);
    LCD.addPage("/lcd_pages/net.html",net);

    LCD.gotoPage(0);
}

export { initMenu }