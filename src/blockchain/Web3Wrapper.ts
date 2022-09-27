import Web3 from 'web3';
import BN from 'bn.js';
import { addresses } from './constants';
import Contract from './contracts/Contract';
import CoinracerNFT from "./contracts/CoinracerNFT";
import CoinracerToken from "./contracts/CoinracerToken";
import BusdToken from "./contracts/BusdToken";
import { NumToBN } from './utils';

export default class Web3Wrapper {

  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;

  // Contracts
  coinracerNFT: CoinracerNFT;
  coinracerToken: CoinracerToken;
  busdToken: BusdToken;

  constructor(web3, chainId, account, options = {}) {
    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3, chainId, account,
      ...options
    }
    this.coinracerNFT = new CoinracerNFT(this.wrapperOptions, addresses.coinracerNFT[this.chainId]);
    this.coinracerToken = new CoinracerToken(this.wrapperOptions, addresses.coinracerToken[this.chainId]);
    this.busdToken = new BusdToken(this.wrapperOptions, addresses.busdToken[this.chainId]);
  }

  async getBusdPrice() {
    try {
      const tx = await this.coinracerNFT.call("minBUSD");
      return tx;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async getCracePrice() {
    try {
      const tx = await this.coinracerNFT.call("minCRACE");
      return tx;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getCurrentAmount() {
    const currentAmount = await this.coinracerNFT.call("mintSupply");
    return currentAmount;
  }

  async getMaxAmount() {
    const maxMintSupply = await this.coinracerNFT.call("maxMintSupply");
    return maxMintSupply;
  }

  async mint(amount) {
    //const busdString : any = await this.coinracerNFT.call("minBUSD");
    const craceString : any = await this.coinracerNFT.call("minCRACE");
    //let busd : BN = Web3.utils.toBN(busdString);
    let crace : BN = Web3.utils.toBN(craceString);
    let amount1 : BN = Web3.utils.toBN(amount);
    await this.coinracerToken.send("approve", {}, addresses.coinracerNFT[this.chainId], crace.mul(amount1));
    //await this.busdToken.send("approve", {}, addresses.coinracerNFT[this.chainId], busd.mul(amount1));
    try {
      await this.coinracerNFT.send("mint", {}, amount);
      return 1;
    } catch (e) {
      console.log(e);
      return 2;
    }
  }
}
