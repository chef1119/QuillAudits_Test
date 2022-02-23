import './style.scss';
import { Button, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import { Web3WrapperContext } from 'contexts/Web3WrapperProvider';
import { NotificationManager } from 'react-notifications';
import {Oval} from "react-loader-spinner";

const Main = () => {

    const { connect, account } = useContext(Web3ModalContext);
    const [busdPrice, setBusdPrice] = useState(0);
    const [cracePrice, setCracePrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [currentNftAmount, setCurrentAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

    // let amountInput = React.createRef();

    const getPrice = async () => {
        let busd : any = await wrapper?.getBusdPrice();
        let crace : any = await wrapper?.getCracePrice();
        let currentAmount : any = await wrapper?.getCurrentAmount();
        let nftMaxAmount : any = await wrapper?.getMaxAmount();
        setBusdPrice( parseInt(busd) / (10 ** 18) );
        setCracePrice( parseInt(crace) / (10 ** 18) );
        setCurrentAmount(currentAmount);
        setMaxAmount(nftMaxAmount);
    }

    useEffect(() => {
        getPrice();
    }, [wrapper]);

    const mint = async () => {
        
        if (amount == 0) NotificationManager.error(`Please input mint amount`, "Invalid Amount");
        else if(amount < 0) NotificationManager.error(`Amount must be greater than 0`, "Invalid Amount");
        else if(amount > 5) NotificationManager.error(`Amount must be lesser than 5`, "Invalid Amount");
        else {
            let modal:any = document.getElementById("myModal");
            modal.style.display = "block";
            try {
                let result = await wrapper?.mint(amount);
                if(result == 1) NotificationManager.success(`Successfully Minted`, "Confirmed");
                if(result == 2) NotificationManager.error(`Minting has suspended`, "Failed");
                modal.style.display = "none";
            } catch(e) {
                console.log(e);
                modal.style.display = "none";
            }
            
        }
    }

    const amountChange = (event) => {
        setAmount(event.target.value);
    }

    const minusAmount = () => {
        if(amount > 0)
            setAmount(amount-1);
    }

    const plusAmount = () => {
        if(amount<5)
            setAmount(amount+1);
    }

    return (
        <>
            <h3 className='price'>1 NFT CAR = {busdPrice} $BUSD + {cracePrice} $CRACE</h3>
            <div className="d-flex mt-5 justify-content-center">
                <Button className="minus-btn" onClick={minusAmount}>-</Button>
                <Form.Control type="number" onChange={amountChange} className="mint-amount" value={amount} placeholder="Amount" min="0" max="5">
                </Form.Control>
                <Button className="plus-btn" onClick={plusAmount}>+</Button>
            </div>
            <div className="d-flex mt-5 justify-content-center">
                <Button className="btn-mint" onClick={mint}>MINT</Button>
            </div>
            {/* <div className="d-flex mt-3 justify-content-center price">
                <h3>Minted NFT Cars</h3>
            </div>
            <div className="d-flex mt-1 justify-content-center price">
                <h1>{currentNftAmount}/{maxAmount}</h1>
            </div> */}
            <div id="myModal" className="modal-oval">
                <div className="modal-oval-content">
                    <Oval>
                        ariaLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        color="red"
                        secondaryColor="yellow"
                    </Oval>
                <h3>Please wait for a moment</h3>
                </div>
            </div>
        </>
    );
}

export default Main;