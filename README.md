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
- Galaxy watch active 2

## 🚀 Getting Started
- **Prerequisites:** You should have `Node.js` installed.
- Install [HeartRateToWeb](https://galaxystore.samsung.com/detail/tUhSWQRbmv) on your watch.
- Open the app on your watch and insert your `local IP` and `desired port`. The default port is `6547`.
- Set the delay to a minimum of `2000 ms` to avoid being rate-limited.
- Open your terminal and run the following commands:
  
> [!TIP]
> If you don't have Git installed (**git clone command**), you can manually download the repository [here](https://github.com/N0rule/vrc-osc-tizenos-hrm/archive/refs/heads/main.zip).
```
git clone https://github.com/N0rule/vrc-osc-tizenos-hrm.git
cd vrc-osc-tizenos-hrm
npm install
```
- Wait for all the dependencies to be installed.
- Open `config.js` and change the `hostname` and `port` to match those on your watch.
- Optionally, modify `offset` and `hrMessage` according to your preferences.
- Type `npm run start` to initiate the server.
- ❗ Remember to check your firewall settings to ensure there are no connection blocks.
  <br>
<h1 align="center"> 🤝 Contributing 🤝 </h1>

- Feel free to [Fork](https://github.com/N0rule/vrc-osc-tizenos-hrm/fork) this repository, create a feature branch and submit a pull request.