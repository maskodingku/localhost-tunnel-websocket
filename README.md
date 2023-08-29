# localhost-tunnel-websocket
Exposing the localhost network to the public network through a WebSocket tunnel. TCP data exchange between the local server and the public server is routed through a WebSocket connection with additional AES 256 encryption.

# How to Use:

## Server Tunnel Installation:

1. Clone the repository.
2. CD into the `server` directory.
3. Perform the installation: `npm install`
4. Open the `config.js` file.
5. Perform the configuration.
   - `port-tunnel`: The port used for the connection between the server tunnel and the client tunnel.
   - `port-tcp`: The port used to receive TCP connections on the server side.
   - `tcp-traffic-encryption`: Do you want to encrypt the flow of TCP data? `"key"` is the encryption key that will be used on the server tunnel and client.
   - `tunnel-authentication`: Used for authentication to the client. The `"token"` value between the server and client must be the same.
6. After that, run: `node tunnel-server.js`

Make sure to follow the above steps correctly to successfully install and run the server tunnel.

Note:
- Ensure that you have installed Node.js and npm before running the `npm install` command.



## Client Tunnel Installation:

1. Please clone the repository.
2. CD into the `client` directory.
3. Perform the installation: `npm install`
4. Open the `config.js` file.
5. Perform the configuration.
   - `host-tunnel`: IP address of the tunnel server.
   - `port-tunnel`: The port used to establish a connection to the tunnel server.
   - `host-tcp`: IP address of the localhost or local server you want to expose to the public.
   - `port-tcp`: The port of the localhost.
   - `tcp-traffic-encryption-key`: The encryption key to be used in the server tunnel.
   - `tunnel-authentication`: Used for authentication to the server tunnel. The `"token"` value between the server and client must be the same.
6. After that, run: `node tunnel-client.js`

Make sure to follow the above steps correctly to successfully install and run the client tunnel.

Note:
- Ensure that you have installed Node.js and npm before running the `npm install` command.
