import tcpId from "./tcp-id.js";
import encrypt from "./encrypt.js";
import decrypt from "./decrypt.js";
export default (tcp,tunnel,config)=>{
	let client_socket = null;
	tcp.on('connection', (clientTcp) => {
		console.log('New TCP Connected...');
		const id = tcpId.register(clientTcp);
		if(client_socket!=null){
			// client_socket.emit("register-channel-tcp",id);
		}else{
			tcpId.remove(id);
			clientTcp.end();
			clientTcp.destroy();
		};
	  	clientTcp.on('data', (data) => {
	    		if(client_socket!=null){
	    			// Enkripsi data sebelum mengirimkannya.
			  	const dataEncrypt = encrypt(data,config["tcp-traffic-encryption"].key);
			  	client_socket.emit("tcp-server-data",{
			  		"id":id,
			  		"buff":dataEncrypt
			  	});
			};
	  	}).on('end', () => {
	    		console.log('Koneksi Tcp klien ditutup');
	    		if(client_socket!=null){
				client_socket.emit("tcp-server-end",id);
				tcpId.remove(id);
				// clientTcp.end();
				clientTcp.destroy();
			}else{
				// clientTcp.end();
				clientTcp.destroy();
			};
	  	}).on('close', () => {
			console.log('Koneksi Tcp client telah ditutup sepenuhnya.');
			if(client_socket!=null){
				client_socket.emit("tcp-server-close",id);
				tcpId.remove(id);
				// clientTcp.end();
				clientTcp.destroy();
			}else{
				// clientTcp.end();
				clientTcp.destroy();
			};
		}).on('error', (err) => {
	    		console.error('Kesalahan pada koneksi client:', err);
	    		if(client_socket!=null){
				client_socket.emit("tcp-server-error",id,err);
				// clientTcp.end();
				clientTcp.destroy();
			}else{
				// clientTcp.end();
				clientTcp.destroy();
			};
	  	});	
	});
	tunnel.on('connection', (socket) => {
	  	console.log('a user connected');
	  	client_socket = socket;
	  	socket.on("tcp-client-data",(id,data)=>{
	  		// Mendekripsi data yang diterima.
	  		const dataDecrypt = decrypt(data,config["tcp-traffic-encryption"].key);
			tcpId.sendData(id,dataDecrypt);
		});
		socket.on("tcp-client-end",(id)=>{
			console.log("tcp-client-end",id);
			tcpId.sendEnd(id);
		});
	  	socket.on("tcp-client-error",(id,err)=>{
			console.log("tcp-client-error",id,err);
			tcpId.sendError(id);
		});
	  	socket.on('disconnect', () => {
	    		console.log('user disconnected');
	    		client_socket = null;
	  	});
	});
};
