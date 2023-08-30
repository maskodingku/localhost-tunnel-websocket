import { Server } from 'socket.io';
import authentication from "./authentication.js";
export default {
	"init" : async (server_app,config) => {
		return new Promise((resolve)=>{
			const port = config["port-tunnel"];
			const tunnel = new Server(server_app,{
				'maxHttpBufferSize': 1000000
			}).use((socket, next)=>{
				authentication(socket, next, config);
			});
			server_app.listen(port, () => {
			  	console.log('Tunnel listening on port :',port);
			  	resolve(tunnel);
			});
		});
	}
};
