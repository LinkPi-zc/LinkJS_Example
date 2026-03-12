function main() {
    var udpS=sys.createUDP();
    udpS.bind(5678);
    udpS.setCallBack(function(msg,ip,port) {
        console.log("udp got msg:",msg," from ",ip,":",port);
    });
    
    var udpC=sys.createUDP();
    udpC.bind();
    udpC.write("hello","127.0.0.1",5678);


    var tcpS=sys.createTCPServer();
    tcpS.listen(5678);
    tcpS.setCallBack(onNewConnection);

    var tcpC=sys.createTCP();
    tcpC.setCallBack(function(msg){
        console.log("tcp client got msg:",msg);
    });
    if(tcpC.connectToHost("127.0.0.1",5678))
        tcpC.write("hello");

}

function onNewConnection(socket)
{
    var tcp=socket;
    tcp.setCallBack(function(msg){
        console.log("tcp server got msg:",msg);
        tcp.write("Are you OK");
    });
}

export {main}