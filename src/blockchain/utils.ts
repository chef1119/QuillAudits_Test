import Web3 from 'web3';
import BigNumber from "bignumber.js";
import chainlinkABI from "blockchain/abi/chainlink.json";
import { decimal } from "blockchain/constants";

export const createWeb3 = (provider) => {

  var realProvider;

  if (typeof provider === 'string') {
    if (provider.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(
        provider
      );
    } else {
      realProvider = new Web3.providers.HttpProvider(
        provider
      );
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
}

export const NumToBN = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(decimal);
}
