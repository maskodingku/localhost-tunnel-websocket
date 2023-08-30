import config from "./config.js";
import net from "net";
import { io } from "socket.io-client";
import crypto from "crypto";
const encryptionKeyText = config["tcp-traffic-encryption-key"];
const encryptionKey = Buffer.alloc(32);
encryptionKey.write(encryptionKeyText, 'utf-8');
const socket = io("http://"+config["host-tunnel"]+":"+config["port-tunnel"], {
  reconnectionDelayMax: 10000,
  auth: {
    token: config["tunnel-authentication"].token
  }
});
let channel_tcp = {};
socket.on("tcp-server-data",(obj)=>{
	const id = obj.id;
	const data = obj.buff;
	if(channel_tcp[id]==undefined){
		channel_tcp[id]=net.connect({ 
			host: config["host-tcp"], 
			port: config["port-tcp"]
		}, () => {
	  		console.log('Terhubung ke server!');
	    		const iv = data.slice(0, 16);
	    		const encryptedContent = data.slice(16);
	    		const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
	    		const decryptedData = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
	  		channel_tcp[id].write(decryptedData);
		}).on('data', (dataTcp) => {
			const dataToEncrypt = Buffer.from(dataTcp);
		  	const iv = crypto.randomBytes(16);
		  	const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
		  	const encryptedBuffer = Buffer.concat([iv, cipher.update(dataToEncrypt), cipher.final()]);
		  	socket.emit("tcp-client-data",id,encryptedBuffer);
		}).on('end', () => {
		  	socket.emit("tcp-client-end",id);
		}).on('error', (err) => {
			console.error('Kesalahan pada koneksi client:', err);
			socket.emit("tcp-client-error",id,err);
			channel_tcp[id].end();
			channel_tcp[id].destroy();
		});
	}else{
    		const iv = data.slice(0, 16);
    		const encryptedContent = data.slice(16);
    		const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    		const decryptedData = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
  		channel_tcp[id].write(decryptedData);
	};
});
socket.on("connect", () => {
  console.log("Tunnel Conected...");
});
socket.on("tcp-server-end",(id)=>{
	// console.log("tcp-server-end",id);
});
socket.on("tcp-server-close",(id)=>{
	// console.log("tcp-server-close",id);
});
socket.on("tcp-server-error",(id,err)=>{
	// console.log("tcp-server-error",id,err);
});
socket.on("connect_error", (err) => {
  console.log(err.message);
});
