import "./style.scss";

import {Link} from "react-router-dom";
import Home from "../../assets/web.svg";
import Telegram from "../../assets/telegram.svg";
import Twitter from "../../assets/twitter.svg";
import Discord from "../../assets/discord.svg";

const Footer = () => {
    return (
        <div className="coinracer-footer pb-2">
            <div className = "d-flex align-items-center justify-content-center">
                <Link to={{ pathname: "https://coinracer.io/index.html" }} target="_blank" ><img src={Home} alt="" className="coinracer-footer__icon" /></Link>
                <Link to={{ pathname: "https://t.me/joinchat/uVEV57tKZ05hODY0" }} target="_blank" ><img src={Telegram} alt="" className="coinracer-footer__icon" /></Link>
                <Link to={{ pathname: "https://discord.gg/AqWHXP3Jk7" }} target="_blank" ><img src={Discord} alt="" className="coinracer-footer__icon" /></Link>
                <Link to={{ pathname: "https://twitter.com/coin_racer" }} target="_blank" ><img src={Twitter} alt="" className="coinracer-footer__icon" /></Link>
            </div>
            <div className="coinracer-footer__text">
                Copyright © 2021. All Rights Reserved By Coinracer.
            </div>
        </div>
    )
}

export default Footer;