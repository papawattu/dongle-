import net from 'net';
import Parser from './parser';
import Handler from './handler';

export default class CarSim {
    constructor() {
        this.handler = new Handler().handle;
        this.parser = new Parser(this.handler);
        this.server = null;
        this.buffer = Buffer.alloc(0);
    }
    start(cb) {
        this.server = net.createServer((socket)=> {
            console.log('new connection');
            socket.on('data',(data) => {
                const response = Buffer.from(this.parser.process(data));
                
                if(response.byteLength > 0) {
                    socket.write(response);
                }
            });
            socket.on('error',(data) => {
                console.log(data);
            });
            socket.on('close',(data) => {
                console.log(data);
            });

        })
        this.server.on('error', (err) => {
            throw err;
        });

        this.server.listen(8080, (err) => {
            console.log('server bound');
            cb(err);
        });
    }
    stop(cb) {
        this.server.close(cb);
    }
}