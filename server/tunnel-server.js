// import module ----------------------------------------------------------------------
import http from 'http';
import express from 'express';
// import module costom ---------------------------------------------------------------
import socket from "./core/socket.js";
import tcp from "./core/tcp.js";
import tunneling from "./core/tunneling.js";
//-- config ---------------------------------------------------------------------------
import config from "./config.js";
//----- main --------------------------------------------------------------------------
const app = express();
(async ()=>{
	const server_app = await http.createServer(app);
	const server_tcp = await tcp.init(config["port-tcp"]);
	const server_tunnel = await socket.init(server_app,config);
	tunneling(server_tcp,server_tunnel,config);
})();

