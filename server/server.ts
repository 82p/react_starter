import * as Express from "express";
import * as http from "http";
import * as Socket from "websocket.io";

class SocketServer {
    constructor(port:number,ip:string){
        let server = http.createServer((req,res) =>{
            res.writeHead(200,{
                "Content-type":"text/html"
            });
            res.end("test server");
        })
    }
}


