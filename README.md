# JavaScript SDK v2 test

Install tshark and inspect network traffic. The interface name may vary. You will need to filter it down further to remove network noise.

```
tshark -i en0 -Y "tcp.port == 443 && ssl.handshake.type == 1 && ssl.record.version == 0x0301"
```

Install dependencies and start app.

```
npm i
npm run start
```

Observe how for each PutItem (10 seconds apart) there is a new SSL handshake.

Uncomment line 6 of app.js to add the environment variable.

Start app again.

```
npm run start
```

Observe how for each PutItem (10 seconds apart) there is **_not_** a new SSL handshake.
