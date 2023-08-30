import net from "net";
export default {
	"init" : async (port,server_tunnel)=>{
		return new Promise((resolve)=>{
			const server = net.createServer().listen(port, () => {
			  	console.log('Server TCP listening on port :',port);
			  	resolve(server);
			});
		});
	}
};
