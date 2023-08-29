

const list_ID = {};

export default {
	"register" : (clientTcp)=>{
		const cap = new Date().getTime();
		list_ID[cap]=clientTcp;
		console.log("Total Koneksi :",Object.keys(list_ID).length,Object.keys(list_ID))
		return cap;
	},
	"sendData" : (id,data)=>{
		if(list_ID[id]!=undefined){
			// const bufferData = Buffer.from(data);
			// console.log('Data diterima dari tunnel local lalu diforwarding ke tcp server:\n',data+"");
			list_ID[id].write(data);
		};
		return;
	},
	"sendEnd" : (id)=>{
		if(list_ID[id]!=undefined){
			list_ID[id].destroy();
			delete list_ID[id];
		};
		return;
	},
	"sendError" : (id)=>{
		if(list_ID[id]!=undefined){
			list_ID[id].destroy();
			delete list_ID[id];
		};
		return;
	},
	"remove" : (id)=>{
		if(list_ID[id]!=undefined){
			delete list_ID[id];
		};
		return;
	}
}