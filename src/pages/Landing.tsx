import { useContext, useCallback, useEffect} from 'react';
import { Container, Row} from "react-bootstrap";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import { NotificationManager } from 'react-notifications';
import { defaultChainId, networkNames } from "blockchain/constants";
import Main from "../components/Main";
import Logo from "assets/logo.png";

const Landing = () => {

  const { connect, account } = useContext(Web3ModalContext);
  const { chainId } = useContext(Web3ModalContext);

  // const handleConnectWallet = useCallback(() => {
  //   connect();
  // }, [connect]);


  useEffect(() => {
    if (chainId !== null && Number(chainId) !== Number(defaultChainId)) {
      NotificationManager.error(`Try on ${networkNames[defaultChainId]}`, "Wrong Network");
    }
  }, [chainId]);

  return (
        <Container className="landing">
          <Row className="text-center body-bg d-flex justify-content-between">
          <img src={Logo} className="landing-logo" alt="Logo" />
            <h1 className="upper-text">
              2.0&nbsp;
              <span>Collection</span>
              &nbsp;Mint
            </h1>
            <div className="pt-4 px-2">
              <div className="text-white">
                {
                  !account ?
                  (
                    <div>
                        <div className="live-notice mt-3">
                          Please Connect Wallet
                        </div>
                    </div>
                  ):(
                    Number(chainId) !== Number(defaultChainId)?
                      <h1 className="price">Please try on BSC Mainnet</h1>
                    :
                    <Main />
                  )
                }
              </div>
            </div>
          </Row>
        </Container>
  )
}

export default Landing;

