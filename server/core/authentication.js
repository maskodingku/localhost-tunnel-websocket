export default (socket, next, config)=>{
	if(socket.handshake.auth && socket.handshake.auth.token){
		if(socket.handshake.auth.token==config["tunnel-authentication"].token){
			return next();
		}else{
			return next(new Error('Authentication error, Invalid Token !'));
		};
	}else{
		return next(new Error('Authentication error, Token Not Found!'));
	};
};
