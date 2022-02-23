import Contract from './Contract';
import abi from '../abi/busdToken.json';

class BusdToken extends Contract {
    constructor(options, address) {
        super(options, "BusdToken", abi, address);
    }
}

export default BusdToken;