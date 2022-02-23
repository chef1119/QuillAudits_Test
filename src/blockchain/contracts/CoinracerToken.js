import Contract from './Contract';
import abi from '../abi/coinracerToken.json';

class CoinracerToken extends Contract {
    constructor(options, address) {
        super(options, "CoinracerToken", abi, address);
    }
}

export default CoinracerToken;