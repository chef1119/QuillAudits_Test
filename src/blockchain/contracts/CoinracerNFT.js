import Contract from './Contract';
import abi from '../abi/coinracerNftMint.json';

class CoinracerNFT extends Contract {
    constructor(options, address) {
        super(options, "CoinracerNFT", abi, address);
    }
}

export default CoinracerNFT;