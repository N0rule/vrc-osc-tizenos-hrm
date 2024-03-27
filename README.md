<h1 align="center">
  <p align="center"> <img width:="auto" height ="350" src="https://i.imgur.com/lAcn6iG.png"> </p>
  
  TizenOS OSC heart rate monitor for VRChat
  <br>
</h1>

<p align="center">
This app allows you to send OSC messages of your heart rate using your TizenOS Watch.
</p>
<br>

## ⌚Supported devices
Theoretically should work on all Tizen OS Watches

### Confirmed devices:
- Galaxy Watch (SM-R800)

## 🚀 Getting Started
- Install [HeartRateToWeb](https://galaxystore.samsung.com/detail/tUhSWQRbmv) on your watch.
- Open app on your watch and insert your `local ip` and `desired port`, default is: `6547`
- Open your terminal and run the following commands:
```
git clone 
cd 
npm install
```
- Wait for all the dependencies to be installed.
- Open `config.js` and change the `hostname` and `port` to the same as on a watch.
- Type `npm run start` to start the server.
- ❗Remember to check your `firewall` for blocking conection.
  <br>
<h1 align="center"> 🤝 Contributing 🤝 </h1>

- Feel free to [Fork]() this repository, create a feature branch and submit a pull request.