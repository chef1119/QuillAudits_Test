import "./style.scss";

import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useCallback } from "react";
import { ellipseAddress } from "utils/blockchain";
import { Web3ModalContext } from "contexts/Web3ModalProvider";

import Logo from "assets/logo.png";
// import Search from "assets/search.png";

const Header = () => {

  const { connect, disconnect, account } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="coinracer-header d-flex justify-content-between">
      <div>
        <div>
          <img src={Logo} className="coinracer-header__logo" alt="Logo" />
        </div>
      </div>
      <div className="d-flex pe-4">
          {!account ? (
            <Button className="coinracer-header__connect-wallet-btn mx-3 my-3" onClick={handleConnectWallet}>
              CONNECT WALLECT
            </Button>
          ) : (
            <Dropdown className="align-self-center">
              <Dropdown.Toggle className="coinracer-header__connect-wallet-btn">
                {ellipseAddress(account)}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDisconnectWallet}>Disconnect</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
    </div>
  )
}

export default Header;
