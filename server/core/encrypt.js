import crypto from "crypto";
export default (buff,key)=>{
	const encryptionKey = Buffer.alloc(32);
	encryptionKey.write(key, 'utf-8');
	const dataToEncrypt = Buffer.from(buff);
  	const iv = crypto.randomBytes(16);
  	const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  	const encryptedBuffer = Buffer.concat([iv, cipher.update(dataToEncrypt), cipher.final()]);
	return encryptedBuffer;
};
