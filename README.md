# Sentimental Analysis Full Stack Application 
Full stack application for Sentimental Analysis using a custom model, utilizing ReactJS for Frontend, Flask for Backend, MySQL for the database, and tensorflow for the model. Hosted on a local server that is exposed to the internet via a cloud flared tunnel.

## How to run the application 
1. First we run the flask backend using the following commands. Might look different varying from what type of OS or if you're using a python environment. The flask backend handles things such as distributing tokens, user authentication, interacting with the MySQL and getting information, as well as querying the Custom made AI API that we have made. The `--host=0.0.0.0` option makes the flask server exposed to the local network, so people can access it within the network. This is important because, later we need to expose the local server so it is accessible over the internet, and in order to do that it needs an IP address on the local network.
```
$ cd <path of the Sentimental Analysis Folder>/backend
$ export FLASK_APP=base.py
$ python3 -m flask run --host=0.0.0.0
```
2. Run the ReactJS frontend in order to actually see the website. By default, this is available to the internet.
```
$ cd <path of the Sentimental Analysis Folder> 
$ npm install 
$ npm start 
```
3. Website should look like the following: 
![Picture of website working](https://media.discordapp.net/attachments/1153457454772928594/1178530929745068052/image.png?ex=65767b75&is=65640675&hm=2d6909c1883c0e5e6913e797c6e717644b8c40c1ad87e597d999cb59edf4a4a3&=&width=2356&height=1313)
![Picture of Sentimental Analysis page](https://media.discordapp.net/attachments/1153457454772928594/1178531234276712458/image.png?ex=65767bbe&is=656406be&hm=6586cf86d075afb04c6074bac49a2c5df2917f36b012a529b09efd202bfd1362&=&width=2356&height=1313)

## Hosting on a local server:
Make sure the following configurations are made if you want to host on a local server.

1. First install the cloudflared tunnel onto your local server [here](http://github.com/cloudflare/cloudflared/releases/latest/)
2. Then create the tunnel: `cloudflared tunnel create <YourTunnelName>`
3. Create the configuration file: `sudo nano ~/.cloudflared/config.yml`
4. Enter the necessary information: 
- **TunnelUUID** is the ID that was created in step 2
- **Hostname** should be what you want the IP to resolve to, this includes the subdomain if you wanted to configure it
```
tunnel: <TunnelUUID>
credentials-file: /root/.cloudflared/<TuinnelUUID>.json
ingress:
  - hostname: <HostName>
    service: <LocalServerIP>
  - service: http_status:404
```
- ** Example Config File: 
```
tunnel: 586a67bd-f491-4214-968e-f27d7011dc07                                                                             │
credentials-file: /Users/jaymerjacob/.cloudflared/586a67bd-f491-4214-968e-f27d7011dc07.json                              │
ingress:                                                                                                                 │
  - hostname: sentiment.jacobjayme.xyz                                                                                   │
    service: http://10.110.170.80:3000                                                                                   │
  - service: http_status:404 
```
- ** Example Config File with multiple domains:
```
tunnel: 586a67bd-f491-4214-968e-f27d7011dc07                                                                             │
credentials-file: /Users/jaymerjacob/.cloudflared/586a67bd-f491-4214-968e-f27d7011dc07.json                              │
ingress:                                                                                                                 │
  - hostname: sentiment.jacobjayme.xyz                                                                                   │
    service: http://10.110.170.80:5000                                                                                   │
  - service: http_status:404 
```