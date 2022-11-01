const Accounts = require("web3-eth-accounts");
const fs = require("fs-extra");

const end = 50;
let now = 0;
const validate = async (address, privateKey) => {
  try {
    const html = await fetch(`https://blockscan.com/address/${address}`)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        return html;
      })
      .catch((e) => {
        throw e;
      });
    const position = html.search("did not match any address");
    // if (position === "-1") {
    console.log("bingo", position);
    let kumpul = [];
    const list = fs.readFileSync("./bingo.json", { encoding: "utf-8" });
    if (list !== "") kumpul = JSON.parse(list);

    kumpul.push({ address, privateKey });
    console.log("bingo length", kumpul.length);
    fs.writeFileSync("./bingo.json", JSON.stringify(kumpul, null, 2));
    // }
    return 1;
  } catch (e) {
    console.log(e);
    return 1;
  }
};

(async () => {
  try {
    const provider =
      "wss://mainnet.infura.io/ws/v3/ddabd91bdbd84b4d9bd04836861a8235";

    const accounts = new Accounts(provider);
    // console.log(`Private Key: \n${wallet.privateKey}`);
    // console.log(`Address: \n${wallet.address}`);
    let kumpulanSampah = [];
    for (let index = 0; index < end; index++) {
      const wallet = accounts.create();
      kumpulanSampah.push(wallet);
    }
    Promise.all(
      kumpulanSampah.map(async (file) => {
        const kkontol = await validate(file.address, file.privateKey);
        now += kkontol;
        if (end <= now) process.exit();
      })
    );
  } catch (e) {
    console.log(e);
  }
})();
