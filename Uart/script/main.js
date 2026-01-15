function main() {
    var uart=sys.createUart();
    uart.open("/dev/ttyAMA1",115200);
    uart.setCallBack(function(msg){
        console.log("uart got msg:",msg);
    });
    uart.write("hello");
}
exports.main = main;