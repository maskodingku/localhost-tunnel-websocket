import crypto from "crypto";
export default (buff,key)=>{
	const encryptionKey = Buffer.alloc(32);
	encryptionKey.write(key, 'utf-8');
	const iv = buff.slice(0, 16);
  	const decryptedContent = buff.slice(16);
  	const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  	const decryptedData = Buffer.concat([decipher.update(decryptedContent), decipher.final()]);
	return decryptedData;
};
